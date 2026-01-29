// Netflix Clone UI, Production-Grade, Not a Toy
// Skeleton Card Component

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] animate-pulse">
      <div className="relative w-full aspect-[2/3] bg-gray-800 rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-shimmer" />
      </div>
    </div>
  );
};

export default SkeletonCard;
