import React from 'react';

import CreateForm from './create/create_form';
// import PreviewForm from './preview/preview_form';
// import ExportForm from './export/export_form';

class Headers extends React.Component {
  render() {
    let selected = this.props.selectedPane;
    let headers = this.props.panes.map((pane, index) => {
        let title = pane.title;
        let klass = '';
        if (index === selected) {
          klass = 'active';
        }

        return (
          <li
            key={index}
            className={klass}
            onClick={this.props.onTabChosen.bind(null, index)}>
            {title}{' '}
          </li>
        );
    });
    return (
      <nav className='nav-bar'>
        {headers}
      </nav>
    );
  }
}


export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedPane: 0 }
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(num) {
    this.setState({selectedPane: num});
  }

  renderTabs() {
    if (this.state.selectedPane === 0) {
      return <CreateForm />;
    } else if (this.state.selectedPane === 1) {
      return "PreviewForm";
    } else {
      return "ExportForm";
    }
  }

  render() {
    let pane = this.props.panes[this.state.selectedPane];

    return (
      <div>
        <Headers
          selectedPane={this.state.selectedPane}
          onTabChosen={this.selectTab}
          panes={this.props.panes}>
        </Headers>
        { this.renderTabs() }
      </div>
    );
  }
}
