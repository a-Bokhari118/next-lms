"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";

const RichTextEditor = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose prose-sm prose-li:marker:text-primary dark:prose-invert !w-full !max-w-none",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "<p>Hello World!</p>",
  });

  return (
    <div className="border border-input rounded-lg overflow-hidden dark:bg-input/30 ">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
