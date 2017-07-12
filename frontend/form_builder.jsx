import React from 'react';
import ReactDOM from 'react-dom';

import Tab from './tab'

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
				<Tab panes={Panes} />
			</main>
		);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<Root/>, document.getElementById('main'));
});
