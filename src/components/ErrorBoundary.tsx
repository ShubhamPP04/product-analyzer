'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl shadow-xl p-8 md:p-12 border-2 border-rose-200 max-w-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-rose-100 p-4 rounded-full">
                <AlertCircle className="w-12 h-12 text-rose-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-rose-800 text-center mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-600 text-center mb-6">
              We encountered an unexpected error. Please refresh the page and try again.
            </p>
            {this.state.error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-rose-700 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
