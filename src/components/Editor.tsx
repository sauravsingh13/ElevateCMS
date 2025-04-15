"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import FontFamily from "@tiptap/extension-font-family"; // Import the custom FontFamily extension
import { FontSize } from "@/extensions/font-size"; // Import the custom FontSize extension
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import CharacterCount from '@tiptap/extension-character-count'; // Import the CharacterCount extension
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import TitleIcon from '@mui/icons-material/Title';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TableChartIcon from '@mui/icons-material/TableChart';
import { SlashCommand } from "@/extensions/slash-command";
import MenuBar from "@/components/MenuBar";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Placeholder.configure({
        placeholder: "Start writing your article here...",
      }),
      TextStyle, // Include TextStyle extension
      Color, // Include Color extension
      FontSize, // Include FontSize extension
      FontFamily, // Include FontFamily extension
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({
        width: 640,
        height: 360,
      }),
      Link.configure({
        openOnClick: false,
      }),
      CharacterCount.configure({
        limit: null,
      }), // Add CharacterCount extension
      SlashCommand.configure({
        suggestion: {
          items: () => [
            { title: 'Heading 1', icon: <TitleIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
            { title: 'Heading 2', icon: <TitleIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
            { title: 'Bullet List', icon: <FormatListBulletedIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleBulletList().run() },
            { title: 'Ordered List', icon: <FormatListNumberedIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleOrderedList().run() },
            { title: 'Blockquote', icon: <FormatQuoteIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleBlockquote().run() },
            { title: 'Code Block', icon: <CodeIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleCodeBlock().run() },
            { title: 'Image', icon: <ImageIcon fontSize="small" />, command: ({ editor }: { editor: any }) => {
              const url = window.prompt('Enter image URL');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }},
          ],
        },
      }),
    ],
    content: "<p>Start writing your article here...</p>",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none max-w-full min-h-[400px] px-2",
      },
    },
  });

  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Article title...",
      }),
    ],
    content: "<h1>Article title...</h1>",
    editorProps: {
      attributes: {
        class:
          "text-4xl font-semibold text-center w-full max-w-3xl outline-none border-none bg-transparent mb-6",
      },
    },
  });

  // const MenuBar = ({ editor }: { editor: any }) => {
  //   if (!editor) return null;

  //   return (
  //     <div style={{height: "90vh" ,left:"101%"}}className="fixed top-0  w-56 bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto px-3 py-4 flex items-center justify-center">
  //       <div className="grid grid-cols-2 gap-3 auto-rows-min">
  //         <select
  //           onChange={(e) =>
  //             editor.chain().focus().setFontSize?.(e.target.value).run()
  //           }
  //           className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:border-blue-400 focus:outline-none"
  //         >
  //           <option value="16px">16px</option>
  //           <option value="18px">18px</option>
  //           <option value="20px">20px</option>
  //           <option value="24px">24px</option>
  //           <option value="32px">32px</option>
  //         </select>

  //         <select
  //           onChange={(e) =>
  //             editor.chain().focus().setFontFamily?.(e.target.value).run()
  //           }
  //           className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:border-blue-400 focus:outline-none"
  //         >
  //           <option value="Arial">Arial</option>
  //           <option value="Georgia">Georgia</option>
  //           <option value="Courier New">Courier New</option>
  //           <option value="Times New Roman">Times New Roman</option>
  //         </select>

  //         <input
  //           type="color"
  //           className="w-8 h-8 rounded border border-gray-300"
  //           onChange={(e) =>
  //             editor.chain().focus().setColor?.(e.target.value).run()
  //           }
  //         />

  //         <button
  //           title="Insert Link"
  //           onClick={() => {
  //             const url = window.prompt("Enter the URL");
  //             if (url) {
  //               editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  //             }
  //           }}
  //           className={`px-2 py-1 rounded ${
  //             editor.isActive("link") ? "bg-cyan-100 text-cyan-800 shadow-sm" : "bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <InsertLinkIcon />
  //         </button>

  //         <button
  //           title="Blockquote"
  //           onClick={() => editor.chain().focus().toggleBlockquote().run()}
  //           className={`px-2 py-1 rounded ${
  //             editor.isActive("blockquote") ? "bg-lime-100 text-lime-800 shadow-sm" : "bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <FormatQuoteIcon />
  //         </button>

  //         <button
  //           title="Code Block"
  //           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
  //           className={`px-2 py-1 rounded ${
  //             editor.isActive("codeBlock") ? "bg-neutral-100 text-neutral-800 shadow-sm" : "bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <CodeIcon />
  //         </button>

  //         <button
  //           title="Highlight"
  //           onClick={() => editor.chain().focus().toggleHighlight?.({ color: '#ffff00' }).run()}
  //           className={`px-2 py-1 rounded ${
  //             editor.isActive("highlight") ? "bg-yellow-200 text-yellow-800 shadow-sm" : "bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <HighlightAltIcon />
  //         </button>

  //         <button title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
  //           <FormatAlignLeftIcon />
  //         </button>
  //         <button title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
  //           <FormatAlignCenterIcon />
  //         </button>
  //         <button title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
  //           <FormatAlignRightIcon />
  //         </button>
  //         <button title="Align Justify" onClick={() => editor.chain().focus().setTextAlign("justify").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
  //           <FormatAlignJustifyIcon />
  //         </button>

  //         <button title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
  //           <FormatClearIcon />
  //         </button>

  //         <button
  //           title="Insert Image"
  //           onClick={() => {
  //             const url = window.prompt("Enter image URL");
  //             if (url) editor.chain().focus().setImage({ src: url }).run();
  //           }}
  //           className="px-2 py-1 rounded bg-gray-100 text-gray-700"
  //         >
  //           <ImageIcon />
  //         </button>

  //         <button
  //           title="Insert YouTube Video"
  //           onClick={() => {
  //             const url = window.prompt("Enter YouTube embed URL");
  //             if (url) editor.commands.setYoutubeVideo({ src: url });
  //           }}
  //           className="px-2 py-1 rounded bg-gray-100 text-gray-700"
  //         >
  //           <OndemandVideoIcon />
  //         </button>

  //         <button
  //           title="Insert Audio"
  //           onClick={() => {
  //             const url = window.prompt("Enter audio file URL");
  //             if (url) editor.commands.insertContent(`<audio controls src="${url}"></audio>`);
  //           }}
  //           className="px-2 py-1 rounded bg-gray-100 text-gray-700"
  //         >
  //           <AudiotrackIcon />
  //         </button>

  //         <button
  //           title="Insert Table"
  //           onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
  //           className="px-2 py-1 rounded bg-gray-100 text-gray-700"
  //         >
  //           <TableChartIcon />
  //         </button>

  //         {[
  //           { cmd: "toggleBold", icon: <FormatBoldIcon />, color: "bg-yellow-100 text-yellow-800", title: "Bold" },
  //           { cmd: "toggleItalic", icon: <FormatItalicIcon />, color: "bg-green-100 text-green-800", title: "Italic" },
  //           { cmd: "toggleUnderline", icon: <FormatUnderlinedIcon />, color: "bg-purple-100 text-purple-800", title: "Underline" },
  //           { cmd: "toggleStrike", icon: <StrikethroughSIcon />, color: "bg-pink-100 text-pink-800", title: "Strikethrough" },
  //         ].map(({ cmd, icon, color, title }) => (
  //           <button
  //             key={cmd}
  //             title={title}
  //             onClick={() => editor.chain().focus()[cmd]().run()}
  //             className={`px-2 py-1 rounded transition-all duration-150 border border-transparent hover:brightness-110 ${
  //               editor.isActive(cmd.replace("toggle", "").toLowerCase())
  //                 ? `${color} shadow-sm`
  //                 : "bg-gray-100 text-gray-700"
  //             }`}
  //           >
  //             {icon}
  //           </button>
  //         ))}

  //         {[1, 2].map((level) => (
  //           <button
  //             key={`H${level}`}
  //             title={`Heading ${level}`}
  //             onClick={() =>
  //               editor.chain().focus().toggleHeading({ level }).run()
  //             }
  //             className={`px-2 py-1 rounded border border-transparent font-medium ${
  //               editor.isActive("heading", { level })
  //                 ? "bg-indigo-100 text-indigo-800 shadow-sm"
  //                 : "bg-gray-100 text-gray-700"
  //             }`}
  //           >
  //             <TitleIcon fontSize="small" className="mr-1" />H{level}
  //           </button>
  //         ))}

  //         <button
  //           title="Bullet List"
  //           onClick={() => editor.chain().focus().toggleBulletList().run()}
  //           className={`px-2 py-1 rounded ${
  //             editor.isActive("bulletList")
  //               ? "bg-rose-100 text-rose-800 shadow-sm"
  //               : "bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <FormatListBulletedIcon/>
  //         </button>
  //         <button
  //           title="Ordered List"
  //           onClick={() => editor.chain().focus().toggleOrderedList().run()}
  //           className={`px-2 py-1 rounded ${
  //             editor.isActive("orderedList")
  //               ? "bg-orange-100 text-orange-800 shadow-sm"
  //               : "bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <FormatListNumberedIcon/>
  //         </button>

  //         <button
  //           title="Horizontal Rule"
  //           onClick={() => editor.chain().focus().setHorizontalRule().run()}
  //           className="px-2 py-1 rounded hover:bg-blue-100 text-gray-700"
  //         >
  //           <HorizontalRuleIcon />
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col items-center justify-start  px-4" style={{ height: "80vh" }}>
      {/* {editor && (
          <div className="mt-2 text-sm text-gray-500 text-right">
            {editor.storage.characterCount.words()} words
          </div>
        )} */}
      <div className="w-full max-w-3xl py-4 overflow-y-auto">
        <EditorContent editor={titleEditor} />
        <EditorContent editor={editor} />
        
      </div>
      <MenuBar editor={editor} />
    </div>
  );
}
