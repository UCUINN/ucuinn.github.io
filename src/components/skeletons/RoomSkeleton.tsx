import React from 'react';
import ImageSkeleton from './ImageSkeleton';

const RoomSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="h-12 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              style={{ backgroundColor: '#f8fafc' }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <ImageSkeleton height="h-64" />

              <div className="p-6">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>

                <div className="flex items-center gap-4 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomSkeleton;