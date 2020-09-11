import React, { Component } from 'react'
import {Row, Col, Button, Icon, Spin, Drawer, Form, Input} from 'fish'
import {getDetail, answerQuestions} from '../actions'
import { connect } from 'react-redux'
import QuestionItem from '../home/QuestionItem'
import AnswerItem from './AnswerItem'
import './detail.scss'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
const pageSize = 10
const {TextArea} = Input
@connect(
  state => ({ questions: state.questions }),
  {getDetail, answerQuestions}
)
@Form.create()
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      questions_answer: [],
      visible: false,
      all_questions: {}
    }
    this.questions = {}
  }
  loadMore = (pageIndex) => {
    clearTimeout(this.timer)
    const _this = this
    this.timer = setTimeout(() => {
      _this.renderAnswer(this.questions, pageIndex)
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
  renderItems = items => {
    const sortAgree = function (o) {
      return o.agree - o.disagree
    }
    const newitems = _.orderBy(items, [sortAgree, 'timestamp'], ['desc', 'asc'])
    return newitems
  };
  renderAnswer = (answer, pageIndex = 1) => {
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
    // 描述校验及XSS, SQL Inject无公害处理
    checkAnswer = (rule, value, callback) => {
      // 只允许输入中文，英文或者数字
      const reg = /^[\u4e00-\u9fa5a-z0-9:：(){}.,，;；。_!！？\s]+$/gi
      if (value && !reg.test(value)) {
        const msg = '只能输入中文，英文或数字以及:：(){}.,，;；。_!！？特殊字符'
        callback(msg)
      }
      callback()
    };
    handleSubmit = (e) => {
      const _this = this
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const {questions: {detail}} = this.props
          const {answer} = detail
          const newAnswerObj = {
            'description': values.answer,
            'timestamp': new Date().getTime(),
            'author': 'Me',
            'agree': 0,
            'disagree': 0
          }
          const newAnswer = {
            answer: [...answer, newAnswerObj]
          }
          this.props.answerQuestions(this.props.params.id, newAnswer).then(() => {
            _this.props.getDetail(this.props.params.id)
            _this.setState({visible: false, hasMore: true})
          }).catch(err => {
            console.log(err)
          })
        }
      })
    };
    render() {
      const { questions } = this.props
      const { getFieldDecorator } = this.props.form
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 24 }
        }
      }
      const {questions_answer} = this.state
      this.questions = questions.detail && questions.detail.answer.length > 0 ? questions.detail.answer : []
      return (
        <div className="detail">
          <header style={{ height: '44px', background: '#0066FF' }}>
            <div className="header_left" onClick={() => this.props.router.push('/')} ><Icon type="left" /></div>
            <div className="header_title" >问题详情</div>
            <div className="header_right" style={{display: this.state.visible ? 'none' : 'block'}}><Button onClick={() => this.setState({visible: true})} type="primary">我来回答</Button></div>
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
                  { this.renderItems(questions_answer).map(
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
          <Drawer
            height={350}
            title="回答问题"
            placement="bottom"
            destroyOnClose
            onClose={() => this.setState({visible: false})}
            visible={this.state.visible}
          >
            <Form
              layout={'vertical'}
              {...formItemLayout}
              onSubmit={this.handleSubmit}
            >
              <Form.Item label="我的回答（200字以内）" >
                {getFieldDecorator('answer', {
                  rules: [
                    {
                      required: true,
                      message: '回答问题不能为空'
                    }, {
                      max: 200, message: '回答内容的字数为200字'
                    }, {
                      validator: this.checkAnswer
                    }
                  ]
                })(<TextArea
                  style={{ height: '150px' }}
                  placeholder="请输入问题描述"
                  maxLength={200}
                  showCounter={(curNum, total) => {
                    return (
                      <div className="fish-input-maxnum-wrapper">
                    已输入{curNum}字,总共{total}字
                      </div>
                    )
                  }}
                />)}
              </Form.Item>
              <Button htmlType="submit" type="primary">提交回答</Button>
            </Form>
          </Drawer>
        </div>
      )
    }
}

export default Detail
