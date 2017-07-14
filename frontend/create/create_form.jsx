import React from 'react';

import Input from './input';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };
    this.renderInputs = this.renderInputs.bind(this);
  }

//componentWillMount(before initial render) vs. componentDidMount(after)?
  componentWillMount() {
    const oldForm = JSON.parse(localStorage.getItem('form'));
    if (oldForm) {
      this.setState({ form: oldForm });
    }
  }

  //
  addInput() {
    const form = JSON.parse(localStorage.getItem('form'));
    const inputs = Object.keys(form);
    const prevIdx = inputs[inputs.length - 1];
    const currentIdx = parseInt(prevIdx) + 1 || 0;
    form[currentIdx] = { question: "", type: "Text", subInputs: {} };
    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ form });
    // console.log(inputs);
    // console.log(this.state.form);
  }

  deleteChild(form) {
    this.setState({ form });
  }

  renderInputs() {
    const form = this.state.form;
    return Object.keys(form).map(k =>
      <Input
        key={ k }
        inputIdx={ k }
        question={ form[k].question }
        type={ form[k].type }
        subInputs={ form[k].subInputs }
        deleteInput={ this.deleteChild.bind(this) }
      />);
  }

  render() {
    return (
      <div>
        { this.renderInputs() }
        <button
          id="add-input"
          className="button"
          onClick={ this.addInput.bind(this) }>
          Add Input
        </button>
      </div>
    );
  }
}
