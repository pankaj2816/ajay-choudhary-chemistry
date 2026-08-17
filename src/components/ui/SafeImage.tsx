'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = '/images/ajay-classroom.jpg',
  alt,
  className,
  ...props
}: SafeImageProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Format the image source path
  const formatSrc = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const clean = url.startsWith('/') ? url : `/${url}`;
    if (basePath && !clean.startsWith(basePath)) {
      return `${basePath}${clean}`;
    }
    return clean;
  };

  const [imgSrc, setImgSrc] = useState(formatSrc(src));
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={imgSrc || formatSrc(src)}
      alt={alt || 'Ajay Choudhary Chemistry'}
      className={className}
      unoptimized
      onError={() => {
        if (!hasError && fallbackSrc) {
          setHasError(true);
          setImgSrc(formatSrc(fallbackSrc));
        }
      }}
    />
  );
}
