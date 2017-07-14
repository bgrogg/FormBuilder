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

  //updates state and localStorage using event handlers from onChange attribute
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
    this.setState( form[inputIdx] );
  }

  //adds sub-input into localStorage and state
  addSubInput() {
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

    const form = JSON.parse(localStorage.getItem('form'));
    form[this.props.inputIdx].subInputs[subInputIdx] = subInputs[subInputIdx];
    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ subInputs });

  }

  //deletes input and resets state
  deleteSubInput() {
    const form = JSON.parse(localStorage.getItem('form'));
    delete form[this.props.inputIdx];

    localStorage.setItem('form', JSON.stringify(form));
    this.props.deleteInput(form);
  }

  //deletes children in ancestry path and sets state
  deleteChild(subInputIdx) {
    const subInputs = this.state.subInputs;
    delete subInputs[subInputIdx];

    this.setState({ subInputs });
  }

  //renders each sub-input component using 'subinput' keys as unique identifier, keeps track of ancestry via props
  renderSubInputs() {
    const subInputs = this.state.subInputs;
    return Object.keys(subInputs).map(key => (
      <SubInput
        key={ key }
        ancestor={ [this.props.inputIdx, key] }
        condition={ subInputs[key].condition }
        question={ subInputs[key].question }
        type={ subInputs[key].type }
        subInputs={ subInputs[key].subInputs }
        deleteSubInput={ this.deleteChild.bind(this) }
      />
    ));
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
          <div className="input-btns">
            <li
              onClick={ this.addSubInput.bind(this) }
              className="btn">
              Add Sub-Input
            </li>
            <li
              onClick={ this.deleteSubInput.bind(this) }
              className="btn">
              Delete
            </li>
          </div>
        </div>
        { this.renderSubInputs.bind(this)() }
      </section>
    );
  }
}
