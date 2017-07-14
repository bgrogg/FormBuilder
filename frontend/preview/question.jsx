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
      return <div>
        <label className="preview-label">
          <input
            className="preview-radio"
            type="radio"
            name={ time }
            defaultValue="Yes"
            onClick={ this.handleChange }
          ></input>
          Yes
        </label>
        <label className="preview-label">
          <input
            className="preview-radio"
            type="radio"
            name={ time }
            defaultValue="No"
            onClick={ this.handleChange }
          ></input>
          No
        </label>
      </div>;

    } else {
      return <div>
        <input
          className="preview-response"
          type="text"
          onChange={ this.handleChange }
          ></input>
      </div>;
    }
  }

  renderSubQuestion() {
    const subInputs = this.props.subInputs;
    const conditionFulfilledIds = Object.keys(subInputs)
      .filter(id => {
        const condition = subInputs[id].condition;
        let conditionFulfilled = false;

        if (condition[0] === "Less Than") {
          conditionFulfilled =  parseInt(this.state.answer) <
            parseInt(condition[1]);
        } else if (condition[0] === "Greater Than") {
          conditionFulfilled =  parseInt(this.state.answer) >
            parseInt(condition[1]);
        } else {
          conditionFulfilled =  this.state.answer === condition[1];
        }

        return conditionFulfilled;
      }
    );

    return conditionFulfilledIds.map(id => (
      <Question
        key={ id }
        question={ subInputs[id].question }
        type={ subInputs[id].type }
        subInputs={ subInputs[id].subInputs }
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
