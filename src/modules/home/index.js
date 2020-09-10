import React, { Component } from 'react'
import {Button, Row, Col, Spin} from 'fish'
import QuestionItem from './QuestionItem'
import './home.scss'
import { getList, fresh } from '../actions'
import { connect } from 'react-redux'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroller'
const MYTAB = 'Me' // 标识我的提问tab
 @connect(
   state => ({ questions: state.questions }),
   { getList, fresh }
 )
class Home extends Component {
   constructor(props) {
     super(props)
     this.state = {
       hasMore: true,
       tab: 'tab1',
       loading: true
     }
   }
   componentDidMount() {
     this.props.getList()
   }
  renderItems = items => {
    const newitems = _.orderBy(items, 'timestamp', 'desc')
    return newitems
  };
  loadMore = page => {
    const {tab} = this.state
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.getList(page, tab === 'tab2' ? MYTAB : undefined).then(res => {
        if (res.payload.data.length === 0) {
          this.setState({ hasMore: false })
        }
      })
    }, 500)
  };
  componentWillUnmount() {
    clearTimeout(this.timer)
    this.props.questions.items = []
  }
  goHome=() => {
    this.setState({hasMore: true, tab: 'tab1'})
    this.props.fresh()
    this.props.getList()
  }
  myQuestions=() => {
    this.setState({hasMore: true, tab: 'tab2'})
    this.props.fresh()
    this.props.getList(1, MYTAB)
  }
  render() {
    const { questions } = this.props
    return (
      <div className="home">
        <header style={{ height: '44px', background: '#0066FF' }}>
          <Row
            style={{ height: '100%', padding: '0 10px' }}
            type="flex"
            justify="space-between"
            align="middle"
          >
            <Col style={{ fontSize: '24px', color: '#fff', fontWeight: 400 }}>
              答!
            </Col>
            <Col>
              <Button onClick={() => this.props.router.push('/add')} type="primary">提问</Button>
            </Col>
          </Row>
        </header>
        <div className="home_bar">
          <div key="tab1" onClick={this.goHome} className="home_bar-left">首页</div>
          <div key="tab2" onClick={this.myQuestions} className="home_bar-right">我的提问</div>
        </div>
        <div
          style={{
            padding: '0 10px',
            height: 'calc(100% - 78px)',
            overflow: 'auto'
          }}
        >
          <Spin
            spinning={questions.loading}
            style={{ left: '50%', transform: ' translateX(-50%)' }}
          />
          {questions.items && questions.items.length ? (
            <InfiniteScroll
              useWindow={false}
              pageStart={1}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
              loader={
                <div key={new Date().getTime()}>
                  <Spin
                    style={{ left: '50%', transform: ' translateX(-50%)' }}
                  />
                  <div style={{ color: '#1890ff', textAlign: 'center' }}>
                    加载更多...
                  </div>
                </div>
              }
            >
              {this.renderItems(questions.items).map((item, index) => (
                <QuestionItem data={item} key={index} />
              ))}
            </InfiniteScroll>
          ) : null}
          {!this.state.hasMore && (
            <div
              style={{
                height: '40px',
                lineHeight: '40px',
                textAlign: 'center'
              }}
            >
              没有更多问题了！
            </div>
          )}
        </div>
      </div>
    )
  }
 }

export default Home
