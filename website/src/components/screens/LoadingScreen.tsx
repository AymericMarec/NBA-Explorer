interface LoadingScreenProps {
  name: string;
}

export default function LoadingScreen({ name }: LoadingScreenProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-400"></div>
          <span className="ml-4 text-xl text-white">Loading {name}...</span>
        </div>
      </div>
    </div>
  );
}


