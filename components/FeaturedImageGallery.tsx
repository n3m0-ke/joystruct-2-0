'use client'

import React from "react";

export function FeaturedImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = React.useState(images[0]);

  return (
    <div className="grid gap-4">
      {/* Featured image with fixed height */}
      <div className="flex justify-center items-center bg-black rounded-lg h-[220px] sm:h-[300px] md:h-[480px] overflow-hidden">
        <img
          src={active}
          alt="Featured"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((imgelink, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-20 w-full cursor-pointer rounded-lg object-cover object-center"
              alt={`gallery-image-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
