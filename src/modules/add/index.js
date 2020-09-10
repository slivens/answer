import React, { Component } from 'react'
import {Button, Row, Col, Spin, Icon, Form, Input} from 'fish'
import './add.scss'
const { TextArea } = Input
class AddQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { title, description, isShowModal } = this.state
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
      <div className="add-question-container">
        <header style={{ height: '44px', background: '#0066FF' }}>
          <Row
            style={{ height: '100%', padding: '0 10px' }}
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
            <Col style={{ fontSize: '24px', color: '#fff', fontWeight: 400 }}>
              发布问题
            </Col>
            <Col>
              <Button type="primary">提交</Button>
            </Col>
          </Row>
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
                  message: '请输入标题'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述：（200字以内）" >
            {getFieldDecorator('describe', {
              rules: [
                {
                  required: true,
                  message: '请输入描述内容'
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
        </Form>
      </div>
    )
  }
}

export default Form.create()(AddQuestion)
