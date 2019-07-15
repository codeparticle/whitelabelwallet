import { PureComponent } from 'react';

class ErrorBoundary extends PureComponent {
  state = {};

  static getDerivedStateFromError (error) {
    if (error) {
      return { error: true };
    }

    return {};
  }

  componentDidCatch () {}

  render () {
    if (this.state.error) {
      return 'Plugin Error';
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
