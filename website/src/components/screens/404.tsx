export default function NotFoundScreen() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-4xl font-bold text-white mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="space-y-4">
            <a 
              href="/players" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Go to Players
            </a>
            <div className="block">
              <a 
                href="/" 
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/20 transition-all duration-300 hover:scale-105"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}