import React from 'react';
import ReactDOM from 'react-dom';

const Root = () => {
	return (
		<main>
			<h1>Form Builder</h1>

		</main>
	);
};

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
});
