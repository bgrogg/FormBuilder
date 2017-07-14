import React from 'react';

export default class ExportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  componentWillMount() {
    const prev = JSON.parse(localStorage.getItem('form'));
    if (prev) {
      this.setState({ form: prev });
    }
  }

  render() {
    return (
      <textarea
        className="export-area"
        defaultValue={ JSON.stringify(this.state.form) }>
      </textarea>
    );
  }
}
