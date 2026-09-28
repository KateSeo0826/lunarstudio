import {defineEnableDraftMode} from "next-sanity/draft-mode";
import {sanityClient} from "@/sanity/lib/client";

export async function GET(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!sanityClient || !token) return Response.json({message: "Sanity preview is not configured."}, {status: 503});
  const {GET: enableDraftMode} = defineEnableDraftMode({client: sanityClient.withConfig({token})});
  return enableDraftMode(request);
}
