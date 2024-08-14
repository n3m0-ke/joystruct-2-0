'use client'

import React from "react";

export function FeaturedImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = React.useState(images[0]);

  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-full w-auto max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt="Featured"
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((imgelink, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt={`gallery-image-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
