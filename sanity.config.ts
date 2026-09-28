import {documentInternationalization} from "@sanity/document-internationalization";
import {defineConfig} from "sanity";
import {presentationTool} from "sanity/presentation";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./sanity/schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "missing";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default defineConfig({
  name: "lunarStudioJournal",
  title: "Lunar Studio Journal",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    documentInternationalization({
      supportedLanguages: [
        {id: "ko", title: "한국어"},
        {id: "en", title: "English"},
      ],
      schemaTypes: ["journal"],
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
});
