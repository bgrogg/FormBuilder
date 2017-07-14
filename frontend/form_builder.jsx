import React from 'react';
import ReactDOM from 'react-dom';

import Tabs from './tabs'

const Panes = [
	{title: 'Create'},
	{title: 'Preview'},
	{title: 'Export'}
];

class Root extends React.Component {
	render() {
		return (
			<main>
				<h1>Form Builder</h1>
				<Tabs panes={Panes} />
			</main>
		);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<Root/>, document.getElementById('main'));
});
