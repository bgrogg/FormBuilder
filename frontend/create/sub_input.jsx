import React from 'react';

export default class SubInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ancestor: this.props.ancestor,
      question: this.props.question,
      condition: this.props.condition,
      type: this.props.type,
      subInputs: this.props.subInputs,
      form: JSON.parse(localStorage.getItem('form'))
    };

    this.addSubInput = this.addSubInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteSubInput = this.deleteSubInput.bind(this);
  }

  handleChange(e, fnc, ancestor = this.state.ancestor, form = JSON.parse(localStorage.getItem('form'))) {
    const value = e.currentTarget.value;

    if (ancestor.length === 1) {
      let condition = this.state.condition;

      switch (e.currentTarget.className) {
        case "question":
          form[ancestor[0]].question = value;
          break;
        case "condition":
          condition[0] = value;
          form[ancestor[0]].condition = condition;
          break;
        case "condition-value":
          condition[1] = value;
          form[ancestor[0]].condition = condition;
          break;
        default:
          form[ancestor[0]].type = value;
      }

      return form;
    } else {
      form[ancestor[0]].subInputs = this.handleChange(e, fnc, ancestor.slice(1), form[ancestor[0]].subInputs);
    }

    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ form });

    return form;
  }

  addSubInput(e, fnc, ancestor = this.state.ancestor, form = JSON.parse(localStorage.getItem('form'))) {
    if (ancestor.length === 1) {
      const subInputsKeys = Object.keys(this.state.subInputs);
      const prevSubInputIdx = subInputsKeys[subInputsKeys.length - 1];
      const subInputIdx = parseInt(prevSubInputIdx) + 1 || 0;
      const subInputs = this.state.subInputs;

      subInputs[subInputIdx] = {
        condition: ["Equals", ""],
        question: "",
        type: "Text",
        subInputs: {}
      };

      form[ancestor[0]].subInputs[subInputIdx] = subInputs[subInputIdx];
      this.setState({ subInputs });

      return form;
    } else {
      form[ancestor[0]].subInputs = this.addSubInput(e, fnc, ancestor.slice(1), form[ancestor[0]].subInputs);
    }

    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ form });

    return form;
  }


  deleteSubInput(e, fnc, ancestor = this.state.ancestor, form = JSON.parse(localStorage.getItem('form'))) {
    if (ancestor.length === 1) {
      delete form[ancestor[0]];
      this.props.deleteSubInput(parseInt(ancestor[0]));

      return form;
    } else {
      form[ancestor[0]].subInputs = this.deleteSubInput(e, fnc, ancestor.slice(1), form[ancestor[0]].subInputs);
    }

    localStorage.setItem('form', JSON.stringify(form));
    this.setState({ form });

    return form;
  }

  deleteChild(subInputIdx) {
    const subInputs = this.state.subInputs;
    delete subInputs[subInputIdx];

    this.setState({ subInputs });
  }

  renderSubInputs() {
    return Object.keys(this.state.subInputs).map(key => (
      <SubInput
        key={ key }
        question={ this.state.subInputs[key].question }
        condition={ this.state.subInputs[key].condition }
        type={ this.state.subInputs[key].type }
        subInputs={ this.state.subInputs[key].subInputs }
        ancestor={ this.state.ancestor.concat([key]) }
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
          <div className="input-btns">
            <li
              onClick={ this.addSubInput }
              className="btn">
              Add Sub-Input
            </li>
            <li
              onClick={ this.deleteSubInput }
              className="btn">
              Delete
            </li>
          </div>
        </div>
        { this.renderSubInputs() }
      </div>
    );
  }
}
