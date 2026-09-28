import {defineField, defineType} from "sanity";

export const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "object",
      fields: [
        defineField({
          name: "ko",
          title: "Korean",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "en",
          title: "English",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: {source: "title.en", maxLength: 96},
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "English name",
      name: "titleEnAsc",
      by: [{field: "title.en", direction: "asc"}],
    },
  ],
  preview: {
    select: {ko: "title.ko", en: "title.en"},
    prepare: ({ko, en}) => ({title: ko || en, subtitle: ko && en ? en : undefined}),
  },
});
