import React, { Component } from 'react'
import {Button, Row, Col, Spin, Icon, Form, Input, Modal, message} from 'fish'
import './add.scss'
import { connect } from 'react-redux'
import {addList} from '../actions'
const { TextArea } = Input
@connect(null, {addList})
@Form.create()
class AddQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  goHome = () => {
    this.props.router.push('/')
  };
    // 标题校验及XSS, SQL Inject无公害处理
    checkTitle = (rule, value, callback) => {
      // 只允许输入中文，英文或者数字
      const reg = /^[\u4e00-\u9fa5a-z0-9]+$/gi
      if (value && !reg.test(value)) {
        const msg = '只能输入中文，英文或数字！'
        callback(msg)
      }
      callback()
    };
    // 描述校验及XSS, SQL Inject无公害处理
    checkDescription = (rule, value, callback) => {
      // 只允许输入中文，英文或者数字
      const reg = /^[\u4e00-\u9fa5a-z0-9:：(){}.,，;；。_!！？\s]+$/gi
      if (value && !reg.test(value)) {
        const msg = '只能输入中文，英文或数字以及:：(){}.,，;；。_!！？特殊字符'
        callback(msg)
      }
      callback()
    };
    countDown=() => {
      let secondsToGo = 3
      const _this = this
      const modal = Modal.success({
        title: '发布成功',
        content: `即将在${secondsToGo}秒后返回首页`,
        onOk() {
          _this.goHome()
        }
      })
      setInterval(() => {
        secondsToGo -= 1
        modal.update({
          content: `即将在${secondsToGo}秒后返回首页`
        })
      }, 1000)
      setTimeout(() => {
        _this.goHome()
        modal.destroy()
      }, secondsToGo * 1000)
    }
    handleSubmit = (e) => {
      const _this = this
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const questionMessage = {
            title: values.title,
            description: values.description,
            timestamp: new Date().getTime(),
            author: 'Me',
            answer: []
          }
          Modal.confirm({
            content: '确认发布？',
            zIndex: 9999,
            onOk() {
              _this.props.addList(questionMessage).then(() => {
                _this.countDown()
              }).catch(function (error) {
                console.log(error)
              })
            }
          })
        }
      })
    };
    render() {
      const { getFieldDecorator } = this.props.form
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 24 }
        }
      }
      return (
        <div className="add">
          <header style={{ height: '44px', background: '#0066FF' }}>
            <div
              className="header_left"
              onClick={() => this.props.router.push('/')}
            >
              <Icon type="left" />
            </div>
            <div className="header_title">发布问题</div>
            <div className="header_right">
              <Button onClick={this.handleSubmit} type="primary">
                提交
              </Button>
            </div>
          </header>

          <Form
            className="add_form"
            layout={'vertical'}
            {...formItemLayout}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="标题：（50字以内的中文、英文或数字）">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '标题不能为空'
                  },
                  {
                    max: 50,
                    message: '标题为50字以内的中文、英文或数字'
                  },
                  {
                    validator: this.checkTitle
                  }
                ]
              })(<Input placeholder="请输入标题" />)}
            </Form.Item>
            <Form.Item label="描述：（200字以内）">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '问题描述不能为空'
                  },
                  {
                    max: 200,
                    message: '描述内容的字数为200字'
                  },
                  {
                    validator: this.checkDescription
                  }
                ]
              })(
                <TextArea
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
                />
              )}
            </Form.Item>
            <Form.Item >
              <div className="add_btn-grounp">
                <Button onClick={this.handleSubmit} type="primary">
                提交
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => this.props.router.push('/')}
                >
                取消
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )
    }
}

export default AddQuestion
