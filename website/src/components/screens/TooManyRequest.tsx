export default function TooManyRequestScreen() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Too Many Requests
            </h1>
            <h2 className="text-2xl font-bold text-orange-400 mb-6">
              Rate Limit Exceeded
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              You've made too many requests to our API. Please wait a few seconds before trying again.
            </p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            <div className="block">
              <a 
                href="/players" 
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/20 transition-all duration-300 hover:scale-105"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}