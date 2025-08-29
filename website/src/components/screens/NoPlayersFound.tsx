export default function NoPlayersFoundScreen() {
  return (
    <div className="text-center py-20">
      <div className="w-32 h-32 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">
        No Players Found
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
        We couldn't find any players matching your search criteria.
      </p>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        You can search for players by their <span className="text-orange-400 font-semibold">first name</span> OR their <span className="text-orange-400 font-semibold">last name</span>.
      </p>
    </div>
  );
}
