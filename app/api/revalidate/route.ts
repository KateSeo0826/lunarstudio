import {revalidateTag} from "next/cache";
import type {NextRequest} from "next/server";
import {parseBody} from "next-sanity/webhook";

type WebhookBody = {_type?: string; language?: string; slug?: {current?: string}};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({message: "Revalidation is not configured."}, {status: 503});
  const {isValidSignature, body} = await parseBody<WebhookBody>(request, secret);
  if (!isValidSignature) return Response.json({message: "Invalid signature."}, {status: 401});
  if (body?._type !== "journal") return Response.json({revalidated: false});

  revalidateTag("journal", "max");
  if (body.language) revalidateTag(`journal-${body.language}`, "max");
  if (body.language && body.slug?.current) revalidateTag(`journal-${body.language}-${body.slug.current}`, "max");
  return Response.json({revalidated: true});
}
