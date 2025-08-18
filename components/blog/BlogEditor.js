"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function BlogEditor({ content, setContent }) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API} // 🔑 ✅ Replace this with your actual API key
      value={content}
      onEditorChange={(newContent) => setContent(newContent)}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo | formatselect | fontselect fontsizeselect | " +
          "bold italic underline strikethrough forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat",
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        branding: false, // ✅ Hide “Built with TinyMCE”
      }}
    />
  );
}
