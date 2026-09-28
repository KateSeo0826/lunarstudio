import {createImageUrlBuilder, type SanityImageSource} from "@sanity/image-url";
import {sanityClient} from "./client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource) {
  return builder?.image(source).auto("format").fit("max");
}
