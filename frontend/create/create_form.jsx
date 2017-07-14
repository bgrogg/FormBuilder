import React from 'react';

import Input from './input';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };
    this.renderInputs = this.renderInputs.bind(this);
  }

  //fetches data before initial render
  componentWillMount() {
    const prev = JSON.parse(localStorage.getItem('form'));
    if (prev) {
      this.setState({ form: prev });
    }
  }

  //creates new input object in localStorage 'form' then updates state
  createInput() {
    const form = JSON.parse(localStorage.getItem('form')) || this.state.form;

    const inputs = Object.keys(form);
    const prevIdx = inputs[inputs.length - 1];
    const currentIdx = parseInt(prevIdx) + 1 || 0; //'0' in the event there are no prevIdx (i.e. prevIdx == undefined)

    form[currentIdx] = {
      question: "",
      type: "Text",
      subInputs: {}
    };

    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ form });
  }

  //passes state data to input component via props, to reset state post-delete
  deleteChild(form) {
    this.setState({ form });
  }

  //renders each input component using 'form' keys as unique identifier
  renderInputs() {
    const form = this.state.form;

    return Object.keys(form).map(key =>
      <Input
        key={ key }
        inputIdx={ key }
        question={ form[key].question }
        type={ form[key].type }
        subInputs={ form[key].subInputs }
        deleteInput={ this.deleteChild.bind(this) }
      />);
  }

  render() {
    return (
      <div>
        { this.renderInputs() }
        <button
          id="create-input"
          className="btn"
          onClick={ this.createInput.bind(this) }>
          Add Input
        </button>
      </div>
    );
  }
}
