import React, { ErrorInfo, ReactNode } from 'react';

// @ts-ignore
function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.log({ error });
    return { hasError: true, error };
  }
  // componentDidCatch(error, errorInfo) {
  // You can also log the error to an error reporting service
  // logErrorToMyService(error, errorInfo);
  // }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
