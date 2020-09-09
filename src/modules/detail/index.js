import React, { Component } from 'react'
import { Row, Col, Button, Icon, Spin } from 'fish'
import { getDetail } from '../actions'
import { connect } from 'react-redux'
import QuestionItem from '../home/QuestionItem'
import AnswerItem from './AnswerItem'
import './detail.scss'
import InfiniteScroll from 'react-infinite-scroller'
const pageSize = 10
@connect(
  state => ({ questions: state.questions }),
  { getDetail }
)
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      questions_answer: []
    }
    this.questions = {}
  }
  loadMore = (pageIndex) => {
    clearTimeout(this.timer)
    const _this = this
    this.timer = setTimeout(() => {
      _this.renderAnswer(_this.questions, pageIndex)
    }, 1000)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.questions.detail !== nextProps.questions.detail) {
      this.renderAnswer(nextProps.questions.detail.answer)
    }
  }
  componentWillMount() {
    this.props.getDetail(this.props.params.id)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  renderAnswer = (answer, pageIndex = 1) => {
    // const answer = this.questions
    const items = answer.slice(
      0,
      pageIndex * pageSize > answer.length
        ? answer.length
        : pageIndex * pageSize
    )
    if (pageIndex * pageSize > answer.length) {
      this.setState({hasMore: false})
    }
    this.setState({questions_answer: items})
  };
  render() {
    const { questions } = this.props
    const {questions_answer} = this.state
    this.questions = questions.detail && questions.detail.answer.length > 0 ? questions.detail.answer : []
    return (
      <div className="detail">
        <header style={{ height: '44px', background: '#0066FF' }}>
          <Row
            style={{ height: '100%', padding: '0 10px', textAlign: 'center' }}
            type="flex"
            justify="space-between"
            align="middle"
          >
            <Col
              onClick={() => this.props.router.push('/')}
              style={{ fontSize: '24px', color: '#fff', fontWeight: 400 }}
            >
              <Icon type="left" />
            </Col>
            <Col
              style={{
                marginLeft: '.4rem',
                fontSize: '24px',
                color: '#fff',
                fontWeight: 400
              }}
            >
              问题详情
            </Col>
            <Col>
              <Button type="primary">我来回答</Button>
            </Col>
          </Row>
        </header>
        <div className="detail_content">
          {questions.detail && (
            <QuestionItem data={questions.detail} isShowAll />
          )}
          {
            questions.detail && questions.detail.answer.length > 0 &&
            <InfiniteScroll
              useWindow={false}
              pageStart={1}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
              loader={
                <div>
                  <Spin
                    style={{ left: '50%', transform: ' translateX(-50%)' }}
                  />
                  <div style={{ color: '#1890ff', textAlign: 'center' }}>
                    加载更多...
                  </div>
                </div>
              }
            >
              <div>
                { questions_answer.map(
                  (answerItem, index) => (
                    <AnswerItem answerItem={answerItem} key={index} />
                  )
                )}
              </div>
            </InfiniteScroll>
          }

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

export default Detail
