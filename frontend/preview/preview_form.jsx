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
    return Object.keys(this.state.form).map(k => (
      <Question
        key={ k }
        question={ this.state.form[k].question }
        type={ this.state.form[k].type }
        subInputs={ this.state.form[k].subInputs }
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
