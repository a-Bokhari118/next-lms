"use client";

import { useMemo } from "react";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
export default function RenderEditorText({ json }: { json: JSONContent }) {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [json]);

  return (
    <div className="prose prose-li:marker:text-primary  dark:prose-invert">
      {parse(output)}
    </div>
  );
}
