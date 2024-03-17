'use client';

import type { ImageLoaderProps } from "next/image";

export default function ImageLoader({ src }: ImageLoaderProps) {
  return `https://itchi.2024.13373333.one${src}`;
};