import React from 'react';

export default class SubInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      condition: this.props.condition,
      type: this.props.type,
      subInputs: this.props.subInputs,
      lineage: this.props.lineage,
      form: JSON.parse(localStorage.getItem('form'))
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSubInput = this.addSubInput.bind(this);
    this.deleteSubInput = this.deleteSubInput.bind(this);
  }

  handleChange(e, f, lineage = this.state.lineage, form = JSON.parse(localStorage.getItem('form'))) {
    const field = e.currentTarget.className;
    const value = e.currentTarget.value;

    if (lineage.length === 1) {
      let condition = this.state.condition;

      if (field === "question") {
        form[lineage[0]].question = value;

      } else if (field === "condition") {
        condition[0] = value;
        form[lineage[0]].condition = condition;

      } else if (field === "condition-value") {
        condition[1] = value;
        form[lineage[0]].condition = condition;

      } else {
        form[lineage[0]].type = value;
      }

      return form;

    } else {
      form[lineage[0]].subInputs = this.handleChange(e, f, lineage.slice(1), form[lineage[0]].subInputs);
    }

    this.setState({ form });
    localStorage.setItem('form', JSON.stringify(form));
    return form;
  }

  addSubInput(e, f, lineage = this.state.lineage, form = JSON.parse(localStorage.getItem('form'))) {
    if (lineage.length === 1) {
      let subInputsIds = Object.keys(this.state.subInputs);
      const subInputId = (subInputsIds[subInputsIds.length - 1] === undefined) ? 0 : parseInt(subInputsIds[subInputsIds.length - 1]) + 1;

      let subInputs = this.state.subInputs;
      subInputs[subInputId] = { condition: ["Equals", ""], question: "", type: "Text", subInputs: {} };
      this.setState({ subInputs });
      form[lineage[0]].subInputs[subInputId] = subInputs[subInputId];
      return form;
    } else {
      form[lineage[0]].subInputs = this.addSubInput(e, f, lineage.slice(1), form[lineage[0]].subInputs);
    }

    this.setState({ form });
    localStorage.setItem('form', JSON.stringify(form));
    return form;
  }

  deleteChild(subInputId) {
    let subInputs = this.state.subInputs;
    delete subInputs[subInputId];
    this.setState({ subInputs });
  }

  deleteSubInput(e, f, lineage = this.state.lineage, form = JSON.parse(localStorage.getItem('form'))) {
    if (lineage.length === 1) {
      delete form[lineage[0]];
      this.props.deleteSubInput(parseInt(lineage[0]));
      return form;

    } else {
      form[lineage[0]].subInputs = this.deleteSubInput(e, f, lineage.slice(1), form[lineage[0]].subInputs);
    }

    this.setState({ form });
    localStorage.setItem('form', JSON.stringify(form));
    return form;
  }

  renderSubInputs() {
    return Object.keys(this.state.subInputs).map(id => (
      <SubInput
        key={ id }
        question={ this.state.subInputs[id].question }
        condition={ this.state.subInputs[id].condition }
        type={ this.state.subInputs[id].type }
        subInputs={ this.state.subInputs[id].subInputs }
        lineage={ this.state.lineage.concat([id]) }
        deleteSubInput={ this.deleteChild.bind(this) }
      />
    ));
  }

  render() {
    return (
      <div className="sub-input">
        <div className="input">
          <div className="input-element">
            <label>Condition</label>
            <select
              className="condition"
              onChange={ this.handleChange }
              defaultValue={ this.state.condition[0] }>
              <option>Equals</option>
              <option>Less Than</option>
              <option>Greater Than</option>
            </select>
            <input
              className="condition-value"
              type="text"
              onChange={ this.handleChange }
              defaultValue={ this.state.condition[1] }>
            </input>
          </div>
          <div className="input-element">
            <label>Question</label>
            <input
              className="question"
              type="text"
              onChange={ this.handleChange }
              defaultValue={ this.state.question }>
            </input>
          </div>
          <div className="input-element">
            <label>Type</label>
            <select
              className="type"
              defaultValue={ this.state.type }
              onChange={ this.handleChange }>
              <option>Text</option>
              <option>Number</option>
              <option>Yes / No</option>
            </select>
          </div>
          <div className="input-buttons">
            <li
              onClick={ this.addSubInput }
              className="button">
              Add Sub-Input
            </li>
            <li
              onClick={ this.deleteSubInput }
              className="button">
              Delete
            </li>
          </div>
        </div>
        { this.renderSubInputs() }
      </div>
    );
  }
}
