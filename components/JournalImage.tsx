import Image from "next/image";
import type {SanityImage} from "@/sanity/lib/types";
import {urlForImage} from "@/sanity/lib/image";

type Props = {image: SanityImage; className?: string; priority?: boolean; sizes: string};

export default function JournalImage({image, className, priority, sizes}: Props) {
  if (!image?.asset?._ref) return null;

  const src = urlForImage(image)?.width(1600).url();
  if (!src) return null;
  return <Image src={src} alt={image.alt || ""} width={1600} height={1000} className={className} priority={priority} sizes={sizes} />;
}
