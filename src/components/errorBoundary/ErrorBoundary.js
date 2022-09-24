import React from 'react'
import ErrorMessage from '../errorMessage/Error.Message';

class ErrorBoundary extends React.Component {
	state = {
		error: false
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage/>
		}
		
		return this.props.children;
	}
}

export default ErrorBoundary;