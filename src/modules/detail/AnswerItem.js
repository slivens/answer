import React, { Component } from 'react'
import { Icon } from 'fish'
import _ from 'lodash'
class AnswerItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  renderTimestamp = items => {
    const newitems = _.orderBy(items, 'timestamp', 'desc')
    return newitems
  };
  renderCount = count => {
    return count > 999 ? '999+' : count
  };
  render() {
    const { answerItem } = this.props
    return (
      <div className="answer-item-container">
        <div className="answer-item-header">
          <div className="answer-item-header-left">
            <div className="answer-item-author">{answerItem.author}</div>
            <div className="answer-item-timestamp">
              {this.renderTimestamp(answerItem.timestamp)}
            </div>
          </div>
          <div className="answer-item-answer-right">
            <div className="answer-item-count">
              <Icon type="like" theme="filled" />
              <div className="answer-item-count-text">
                {this.renderCount(answerItem.agree)}
              </div>
            </div>

            <div className="answer-item-count">
              <Icon type="dislike" theme="filled" />
              <div className="answer-item-count-text">
                {this.renderCount(answerItem.disagree)}
              </div>
            </div>
          </div>
        </div>

        <div className="answer-item-description">{answerItem.description}</div>
      </div>
    )
  }
}

export default AnswerItem
