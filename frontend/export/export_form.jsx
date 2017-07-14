import React from 'react';

class ExportIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  componentWillMount() {
    const prevForm = JSON.parse(localStorage.getItem('form'));
    if (prevForm) {
      this.setState({ form: prevForm });
    }
  }

  render() {
    return (
      <textarea className="export-json" defaultValue={ JSON.stringify(this.state.form) } ></textarea>
    );
  }
}

export default ExportIndex;
