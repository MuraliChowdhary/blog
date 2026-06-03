// components/MDXRenderer.tsx
"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { getMDXComponents } from "@/components/mdx/MDXComponents";

export default function MDXRenderer({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={getMDXComponents()} />;
}