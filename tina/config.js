import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "cms/tina",
  clientId: null, // Set after connecting to Tina Cloud (optional for local dev)
  token: null,    // Set after connecting to Tina Cloud (optional for local dev)

  build: {
    outputFolder: "admin",
    publicFolder: ".",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: ".",
    },
  },

  schema: {
    collections: [
      {
        name: "projects",
        label: "Projects",
        path: "data",
        format: "json",
        match: {
          include: "projects",
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Projects",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title || "New Project",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "URL Slug", required: true, description: "Lowercase, hyphens, no spaces (e.g. liquid-iv)" },
              { type: "string", name: "title", label: "Project Title", required: true },
              { type: "string", name: "tagline", label: "Tagline", description: "Short brand line shown on case study page" },
              { type: "string", name: "category", label: "Category", required: true, description: "e.g. Brand & Packaging" },
              { type: "string", name: "year", label: "Year", required: true },
              { type: "string", name: "client", label: "Client", required: true },
              { type: "string", name: "agency", label: "Agency", required: true, description: "Agency name or 'Freelance'" },
              { type: "string", name: "services", label: "Services", required: true, description: "Comma-separated list" },
              {
                type: "object",
                name: "credits",
                label: "Credits",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Name", required: true },
                  { type: "string", name: "role", label: "Role", required: true },
                ],
              },
              {
                type: "string",
                name: "awards",
                label: "Awards",
                list: true,
              },
              { type: "image", name: "thumbnail", label: "Thumbnail Image" },
              { type: "image", name: "heroImage", label: "Hero Image" },
              { type: "string", name: "summary", label: "Summary", required: true, description: "One sentence — what was the project" },
              {
                type: "string",
                name: "body",
                label: "Full Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "sections",
                label: "Case Study Sections",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Section Title", description: "e.g. Problem, Solution, Results" },
                  { type: "string", name: "body", label: "Section Body", ui: { component: "textarea" } },
                ],
              },
              {
                type: "image",
                name: "images",
                label: "Gallery Images",
                list: true,
              },
              { type: "boolean", name: "featured", label: "Featured on Work Page" },
            ],
          },
        ],
      },
      {
        name: "spotlights",
        label: "Spotlights",
        path: "data",
        format: "json",
        match: {
          include: "spotlights",
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Spotlights",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.projectId || "New Spotlight",
              }),
            },
            fields: [
              { type: "string", name: "projectId", label: "Project ID", required: true, description: "Must match a project's URL slug" },
              { type: "number", name: "position", label: "Position", required: true, description: "1 = after hero, 2 = mid-grid" },
              {
                type: "object",
                name: "images",
                label: "Rotating Images",
                list: true,
                fields: [
                  { type: "image", name: "src", label: "Image" },
                  { type: "number", name: "duration", label: "Duration (ms)", description: "1250-2000ms recommended" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
