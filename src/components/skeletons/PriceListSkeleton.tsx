import React from 'react';

const PriceListSkeleton: React.FC = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>

        <div className="bg-[#fafaf2] rounded-lg shadow-md">
          {/* Mobile version skeleton */}
          <div className="block md:hidden">
            {[...Array(2)].map((_, roomIndex) => (
              <div key={roomIndex} className="p-4 border-b">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-3"></div>
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-3"></div>
                <div className="space-y-2">
                  {[...Array(2)].map((_, priceIndex) => (
                    <div
                      key={priceIndex}
                      className="flex justify-between items-center"
                    >
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version skeleton */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gray-200 p-4 border w-1/2">
                    <div className="h-4 w-24 bg-gray-300 animate-pulse rounded mx-auto"></div>
                  </th>
                  <th className="bg-gray-200 p-4 border w-1/4">
                    <div className="h-4 w-20 bg-gray-300 animate-pulse rounded mx-auto"></div>
                  </th>
                  <th className="bg-gray-200 p-4 border w-1/4">
                    <div className="h-4 w-20 bg-gray-300 animate-pulse rounded mx-auto"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    {index % 2 === 0 && (
                      <td
                        rowSpan={2}
                        className="p-4 border align-middle text-center"
                      >
                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded mx-auto mb-2"></div>
                        <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mx-auto"></div>
                      </td>
                    )}
                    <td className="p-4 text-center border">
                      <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mx-auto"></div>
                    </td>
                    <td className="p-4 text-center border">
                      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded mx-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 sm:px-6 py-4">
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 bg-gray-200 animate-pulse rounded flex-shrink-0 mt-1"></div>
              <div className="space-y-2 flex-1">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-4 flex-1 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-lg mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default PriceListSkeleton;