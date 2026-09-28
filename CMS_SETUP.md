# Lunar Studio Journal CMS setup

The code is ready for Sanity, but intentionally contains no account, project, token, deployment, or uploaded content.

## Connect the project

1. Sign in at `sanity.io/manage` with the account that should own Lunar Studio content.
2. Create a Free-plan project and a public dataset named `production`.
3. Keep only the owner's account in the project's Members list.
4. Copy `.env.example` to `.env.local` and fill in the project ID and dataset. Never put private tokens in a `NEXT_PUBLIC_` variable.

## Open the editor

Run `npm run studio`. Studio provides the Journal form, image uploads, native draft/publish controls, and Korean/English translation linking. It is protected by the Sanity account login.

After reviewing locally, the owner may run `npm run studio:deploy` to host the editor. Deployment is intentionally not performed automatically.

## Enable authenticated preview

1. In Sanity Manage > API > Tokens, create a Viewer token.
2. Store it as `SANITY_API_READ_TOKEN` in local and hosting server environment variables.
3. Add the local and production site origins to Sanity CORS with credentials enabled.
4. Set `NEXT_PUBLIC_SITE_URL` to the public site origin.

Presentation uses `/api/draft-mode/enable`, which validates Sanity's signed preview URL before enabling Draft Mode. Public queries always use the published perspective; the Viewer token is used only in Draft Mode.

## Refresh after publishing

1. Generate a random secret of at least 32 characters and store it as `SANITY_REVALIDATE_SECRET`.
2. Create a Sanity webhook for create, update, and delete events with filter `_type == "journal"`.
3. Point it to `https://YOUR_SITE/api/revalidate`, enable its secret, and use the same value.

The signed webhook refreshes Journal list and detail cache tags. Draft documents remain unavailable to unauthenticated API requests.

## Authoring workflow

1. Create a Korean or English Journal document in Studio.
2. Complete required fields, upload a cover image with alt text, and add body content.
3. For affiliate content, enable the toggle, write the disclosure, and mark applicable body links as affiliate links.
4. Use Presentation to preview while signed in, then Publish.
5. Create the other language through the translation control and write it manually. No automatic translation is configured.
