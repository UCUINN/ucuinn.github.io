import React from 'react';

interface ImageSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-64'
}) => {
  return (
    <div
      className={`${width} ${height} bg-gray-200 animate-pulse rounded-lg ${className}`}
      role="img"
      aria-label="Loading image"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ImageSkeleton;