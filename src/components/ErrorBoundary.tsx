'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-sm text-slate-400 max-w-md mb-6">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {this.state.error && (
            <details className="mb-6 w-full max-w-lg">
              <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400 transition-colors">
                Error details
              </summary>
              <pre className="mt-2 text-xs text-red-400/80 bg-slate-900 rounded-xl p-4 overflow-auto text-left border border-slate-800">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <Button onClick={this.handleReset} variant="secondary" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-8 text-center">
      <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Application Error</h1>
      <p className="text-sm text-slate-400 max-w-md mb-4">
        A critical error has occurred. Please try reloading the page.
      </p>
      {error.digest && (
        <p className="text-xs text-slate-600 mb-6 font-mono">Error ID: {error.digest}</p>
      )}
      <Button onClick={reset} variant="secondary">
        <RefreshCw className="h-4 w-4 mr-2" />
        Reload Page
      </Button>
    </div>
  );
}
