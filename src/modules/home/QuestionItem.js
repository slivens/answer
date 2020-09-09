import React, { Component } from 'react'
// import Contants from '../../constants'
// import moment from 'moment'
import {timesFormat} from '../../utils'
import './item.scss'
class QuestionItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowAllDesc: false
    }
  }
  static contextTypes={
    router: React.PropTypes.object
  }
  renderDescription = (description, isShowAllDesc, isShowAll) => {
    if (description.length <= 30 || isShowAllDesc || isShowAll) {
      return description
    } else {
      const simpleDesc = description.slice(0, 30) + '......'
      return (<div>
        {simpleDesc}
        <div className="show-all-desc" onClick={this.handleShowAllClick}>显示全部</div>
      </div>)
    }
  }
  renderTimestamp=(timestamp) => {
    return timesFormat(timestamp / 1000)
  }
  goDetail=(id) => {
    this.context.router.push(`detail/${id}`)
  }
  render() {
    const {data, isShowAll} = this.props
    const { isShowAllDesc } = this.state
    return (
      <div className="question-item-container" onClick={() => this.goDetail(data.id)}>
        <div className="question-item-header">
          {data.title}
        </div>
        <div className="question-item-description">
          {this.renderDescription(data.description, isShowAllDesc, isShowAll)}
        </div>
        <div className="question-item-footer">
          <div className="question-item-footer-left">
            <div className="question-item-author">
              {data.author}
            </div>
            <div className="question-item-timestamp">
              {this.renderTimestamp(data.timestamp)}
            </div>
          </div>
          <div className="question-item-footer-right">
            <div className="question-item-answer-count">
              {`${data.answer.length}个回答`}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default QuestionItem
