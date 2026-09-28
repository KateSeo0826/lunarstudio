import "server-only";
import {createClient} from "next-sanity";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const isSanityConfigured = Boolean(sanityProjectId);

export const sanityClient = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: "2026-09-01",
      useCdn: true,
      stega: false,
    })
  : null;
