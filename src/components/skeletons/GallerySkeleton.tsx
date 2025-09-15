import React from 'react';
import ImageSkeleton from './ImageSkeleton';

const GallerySkeleton: React.FC = () => {
  return (
    <section className="text-primary-600">
      <div className="max-w-7xl mx-auto">
        <div className="mt-4 mb-8 ml-4">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="gallery-container rounded-lg mt-4 relative">
          <div className="aspect-[16/11] md:aspect-video rounded-lg overflow-hidden">
            <ImageSkeleton
              width="w-full"
              height="h-full"
              className="rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4 px-4">
              <div className="h-4 w-32 bg-gray-300 animate-pulse rounded mx-auto"></div>
            </div>
          </div>

          <div className="py-4 bg-white">
            <div className="flex justify-center space-x-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-300 animate-pulse rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-2 ml-2"></div>
          <div className="h-5 w-32 bg-gray-200 animate-pulse rounded ml-2"></div>
        </div>
      </div>
    </section>
  );
};

export default GallerySkeleton;