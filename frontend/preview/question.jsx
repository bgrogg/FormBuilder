import React from 'react';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answer: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ answer: e.currentTarget.value });
  }

  renderResponse() {
    const time = new Date().getTime();
    if (this.props.type === "Yes / No") {
      return (
        <div>
          <label className="preview-label">
            <input
              className="preview-radio"
              type="radio"
              name={ time }
              value="Yes"
              onClick={ this.handleChange }>
            </input>
            Yes
          </label>
          <label className="preview-label">
            <input
              className="preview-radio"
              type="radio"
              name={ time }
              value="No"
              onClick={ this.handleChange }>
            </input>
            No
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <input
            className="preview-response"
            type="text"
            onChange={ this.handleChange }>
          </input>
        </div>
      );
    }
  }

  renderSubQuestion() {
    const subInputs = this.props.subInputs;
    const subInputKeys = Object.keys(subInputs);

    const unlockedQuestions = subInputKeys.filter(key => {
        const condition = subInputs[key].condition[0];
        const validResponse = subInputs[key].condition[1];
        const answer = this.state.answer;
        let unlocked = false;

        if (condition === "Less Than") {
          unlocked =  parseInt(answer) < parseInt(validResponse);
        } else if (condition === "Greater Than") {
          unlocked =  parseInt(answer) > parseInt(validResponse);
        } else {
          unlocked = ( answer === validResponse );
        }

        return unlocked;
      }
    );

    return unlockedQuestions.map(idx => (
      <Question
        key={ idx }
        question={ subInputs[idx].question }
        type={ subInputs[idx].type }
        subInputs={ subInputs[idx].subInputs }
      />
    ));
  }

  render() {
    return (
      <section className="preview-question">
        <div>
          { this.props.question }
        </div>
          { this.renderResponse.bind(this)() }
          { this.renderSubQuestion.bind(this)() }
      </section>
    );
  }
}
