import React from 'react';

import SubInput from './sub_input.jsx';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      type: this.props.type,
      subInputs: this.props.subInputs
    };
    this.handleChange = this.handleChange.bind(this);
  }

  deleteChild(subInputIdx) {
    const subInputs = this.state.subInputs;
    delete subInputs[subInputIdx];
    this.setState({ subInputs });
  }

  handleChange(e) {
    const value = e.currentTarget.value;
    const form = JSON.parse(localStorage.getItem('form'));
    const inputIdx = this.props.inputIdx;

    if (e.currentTarget.className === "input-question") {
      form[inputIdx] = {
        question: value,
        type: this.state.type,
        subInputs: this.state.subInputs
      };
      this.state.question = value;
    } else {
      form[inputIdx] = {
        question: this.state.question,
        type: value,
        subInputs: this.state.subInputs
      };
      this.state.type = value;
    }

    localStorage.setItem('form', JSON.stringify(form));
    let { type, question, subInputs } = form[inputIdx];
    this.setState({ type, question, subInputs });
  }

  addSubInput() {
    const form = JSON.parse(localStorage.getItem('form'));
    const subInputsKeys = Object.keys(this.state.subInputs);
    const prevSubInputIdx = subInputsKeys[subInputsKeys.length - 1]
    const subInputIdx = parseInt(prevSubInputIdx) + 1 || 0;
    const subInputs = this.state.subInputs;

    subInputs[subInputIdx] = {
      condition: ["Equals", ""],
      question: "",
      type: "Text",
      subInputs: {}
    };

    form[this.props.inputIdx].subInputs[subInputIdx] = subInputs[subInputIdx];
    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ subInputs });

  }

  renderSubInputs() {
    const subInputs = this.state.subInputs;
    return Object.keys(subInputs).map(k => (
      <SubInput
        key={ k }
        ancestor={ [this.props.inputIdx, k] }
        condition={ subInputs[k].condition }
        question={ subInputs[k].question }
        type={ subInputs[k].type }
        subInputs={ subInputs[k].subInputs }
        deleteSubInput={ this.deleteChild.bind(this) }
      />
    ));
  }

  deleteSubInput() {
    const form = JSON.parse(localStorage.getItem('form'));
    delete form[this.props.inputIdx];
    localStorage.setItem('form', JSON.stringify(form));

    this.props.deleteInput(form);
  }

  render() {
    return (
      <section>
        <div className="input">
          <div className="input-element">
            <label>Question</label>
            <input
              className="input-question"
              type="text"
              onChange={ this.handleChange }
              defaultValue={ this.state.question }>
            </input>
          </div>
          <div className="input-element">
            <label>Type</label>
            <select
              onChange={ this.handleChange }
              defaultValue={ this.state.type }>
              <option>Text</option>
              <option>Number</option>
              <option>Yes / No</option>
            </select>
          </div>
          <div className="input-buttons">
            <li
              onClick={ this.addSubInput.bind(this) }
              className="button">
              Add Sub-Input
            </li>
            <li
              onClick={ this.deleteSubInput.bind(this) }
              className="button">
              Delete
            </li>
          </div>
        </div>
        { this.renderSubInputs.bind(this)() }
      </section>
    );
  }
}
