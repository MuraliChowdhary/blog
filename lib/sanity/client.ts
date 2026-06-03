import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "zxftdys7",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});
