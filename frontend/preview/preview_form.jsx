import React from 'react';

import Question from './question';

export default class PreviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: JSON.parse(localStorage.getItem('form'))
    };
  }

  renderQuestions() {
    const formKeys = Object.keys(this.state.form);
    return formKeys.map(key => (
      <Question
        key={ key }
        question={ this.state.form[key].question }
        type={ this.state.form[key].type }
        subInputs={ this.state.form[key].subInputs }
      />
    ));
  }

  render() {
    return (
      <div>
        { this.renderQuestions.bind(this)() }
      </div>
    );
  }
}
