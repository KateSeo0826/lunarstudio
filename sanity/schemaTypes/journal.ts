import {defineArrayMember, defineField, defineType} from "sanity";

export const journal = defineType({
  name: "journal",
  title: "Journal",
  type: "document",
  groups: [
    {name: "content", title: "Content", default: true},
    {name: "publishing", title: "Publishing"},
    {name: "seo", title: "SEO"},
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "publishing",
      options: {source: "title", maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            {title: "Normal", value: "normal"},
            {title: "Heading 2", value: "h2"},
            {title: "Heading 3", value: "h3"},
            {title: "Quote", value: "blockquote"},
          ],
          lists: [
            {title: "Bulleted list", value: "bullet"},
            {title: "Numbered list", value: "number"},
          ],
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({scheme: ["http", "https", "mailto", "tel"]}),
                  }),
                  defineField({
                    name: "affiliate",
                    title: "Affiliate link",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: {hotspot: true},
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({name: "caption", title: "Caption", type: "string"}),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{type: "category"}],
      group: "publishing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      group: "publishing",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "publishing",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hasAffiliateLinks",
      title: "Contains affiliate links",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "affiliateDisclosure",
      title: "Affiliate disclosure",
      type: "text",
      rows: 2,
      group: "publishing",
      hidden: ({document}) => !document?.hasAffiliateLinks,
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.hasAffiliateLinks && !value
            ? "Add a disclosure when affiliate links are enabled."
            : true,
        ),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {title: "title", subtitle: "category.title.en", media: "coverImage"},
  },
});
