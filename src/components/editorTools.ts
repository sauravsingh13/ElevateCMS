import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
// import Checklist from "@editorjs/checklist";
import Table from "@editorjs/table";
// import Image from "@editorjs/image";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";

export const EDITOR_JS_TOOLS = {
  header: Header,
  paragraph: Paragraph,
  list: List,
//   checklist: Checklist,
  table: Table,
  code: Code,
  quote: Quote,
//   image: {
//     class: Image,
//     config: {
//       endpoints: {
//         byFile: "/api/upload", // implement this in your backend
//         byUrl: "/api/fetchImage",
//       },
//     },
//   },
};