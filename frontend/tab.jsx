import React from 'react';

// import CreateTab from './create/create_tab';
// import PreviewTab from './preview/preview_tab';
// import ExportTab from './export/export_tab';

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

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedPane: 0 }
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(num) {
    this.setState({selectedPane: num});
  }

  renderTab() {
    if (this.state.selectedPane === 0) {
      return "CreateContent";
    } else if (this.state.selectedPane === 1) {
      return "PreviewContent";
    } else {
      return "ExportContent";
    }
  }

  render() {
    let pane = this.props.panes[this.state.selectedPane];

    return (
      <main>
        <Headers
          selectedPane={this.state.selectedPane}
          onTabChosen={this.selectTab}
          panes={this.props.panes}>
        </Headers>
        { this.renderTab() }
      </main>
    );
  }
}
