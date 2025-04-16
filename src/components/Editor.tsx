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
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import { SlashCommand } from "@/extensions/slash-command";
import MenuBar from "@/components/MenuBar";
import './editor.css'
import { use, useEffect } from "react";

interface EditorProps {
  content: string;
  title: string;
  id: string;
}

export default function Editor({ content, title, id }: EditorProps) {
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Article title...",
        showOnlyWhenEditable: true,
      }),
    ],
    content: `<h1>${title}</h1>`,
    editorProps: {
      attributes: {
        class:
          "text-4xl font-semibold text-center w-full max-w-3xl outline-none border-none bg-transparent mb-6 placeholder-gray-400",
      },
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Placeholder.configure({
        placeholder: "hit /",
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
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      SlashCommand.configure({
        suggestion: {
          items: () => [
            { title: 'Heading 1', icon: <TitleIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
            { title: 'Heading 2', icon: <TitleIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
            { title: 'Bullet List', icon: <FormatListBulletedIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().setParagraph().toggleBulletList().run() },
            { title: 'Ordered List', icon: <FormatListNumberedIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().setParagraph().toggleOrderedList().run() },
            { title: 'Blockquote', icon: <FormatQuoteIcon fontSize="small" />, command: ({ editor }: { editor: any }) => editor.chain().focus().setParagraph().toggleBlockquote().run() },
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
    content,
    editorProps: {
      attributes: {
        class:
        "focus:outline-none max-w-full min-h-[400px] px-2 prose prose-sm prose-ul:list-disc prose-ol:list-decimal",
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
    if (titleEditor && title) {
      titleEditor.commands.setContent(`<h1>${title}</h1>`);
    }
  }, [content, title, editor, titleEditor]);
  /**
   * USER FLOW EXPECTATIONS:
   * 1. User sees an "Article title..." placeholder to start with a heading.
   * 2. Below that, "Start writing" placeholder encourages writing the body.
   * 3. As the user types, formatting can be applied using the vertical MenuBar on the right.
   * 4. MenuBar offers text formatting, headings, lists, code blocks, media embeds, and links.
   * 5. The editor scrolls independently while the menu remains fixed to the right.
   */

  return (
    <div className="flex flex-row w-full h-full px-10 items-center justify-evenly">
      {/* Editor container with scroll */}
      <div className=" bg-white/90 backdrop-blur-lg rounded-xl shadow-lg overflow-y-auto" style={{ height: '85vh' , width: '80%' }}>
        <EditorContent editor={titleEditor} />
        <EditorContent editor={editor} />
      </div>

      {/* Right sidebar: MenuBar */}
      <div className=" w-56 bg-white border-l border-gray-200 shadow-lg z-50 px-3 py-4 flex items-center justify-center" style={{ height: '85vh'}}>
      <MenuBar editor={editor} />
      </div>
    </div>
  );
}
