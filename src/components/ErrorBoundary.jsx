import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Famous Stay Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    localStorage.removeItem('famous_stay_auth_user_pk');
    localStorage.removeItem('famous_stay_agent_bookings_pkr_v2');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050B18] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-blue-panel p-8 rounded-3xl border border-[#E5C07B]/40 text-center shadow-2xl">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-[#E5C07B]/20 text-[#F7E5A9] flex items-center justify-center font-serif text-2xl font-bold">
              FS
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#F7E5A9]">
              Portal Refresh Needed
            </h1>
            <p className="mt-2 text-xs text-blue-200/80 leading-relaxed">
              A temporary interface issue was encountered. Click below to reload the workspace with fresh agency credentials.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-black/40 text-left font-mono text-[11px] text-red-300 overflow-x-auto max-h-28 border border-red-500/20">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => window.location.reload()}
                className="gold-btn w-full py-2.5 rounded-xl text-xs font-bold"
              >
                Reload Portal
              </button>
              <button
                onClick={this.handleReload}
                className="w-full py-2 rounded-xl text-xs font-medium text-blue-200/60 hover:text-white"
              >
                Reset Local Storage & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

