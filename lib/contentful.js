import { createClient } from "contentful";

export const createContentClient = () => {
  return createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "wwl438y6tfze",
    accessToken:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
      "ZD-BMcXD_gkSqLv7GaApuauZx-cT_VIqJ8O1d5c5fgM",
  });
};
const client = createContentClient();

export const getEntriesByType = async (type) => {
  const response = await client.getEntries({
    content_type: type,
  });

  return response.items;
};

export const getBlogPosts = async (type) => {
  const results = await getEntriesByType(type);
  const blogPosts = results.map((blog) => blog.fields);
  return blogPosts;
};

export const getEntryBySlug = async (slug, type) => {
  const queryOptions = {
    content_type: type,
    "fields.slug[match]": slug,
  };
  const queryResult = await client.getEntries(queryOptions);
  return queryResult.items[0];
};
