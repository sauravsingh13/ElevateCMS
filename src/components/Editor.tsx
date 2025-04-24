"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alt: { default: null },
      title: { default: null },
      style: { default: null },
    };
  },
});
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
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ImageResize from 'tiptap-extension-resize-image';
import { ThreeColumnLayout } from '@/extensions/ThreeColumnLayout';
import { ColumnBlock } from '@/extensions/ColumnBlock';

interface EditorProps {
  content: string;
  title: string;
  id: string;
}

export default function Editor({ content, title, id }: EditorProps) {
  const [bgColor, setBgColor] = useState('');
  const [bgImage, setBgImage] = useState('');
  const [theme, setTheme] = useState("light");
  const [editorHtmlData, setEditorHtmlData] = useState("");


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
      CustomImage,
      ThreeColumnLayout,
      ImageResize,
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
      ColumnBlock,
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
    content:"",
    editorProps: {
      attributes: {
        class:
        "focus:outline-none max-w-full min-h-[400px] px-2 mx-auto prose prose-sm prose-ul:list-disc prose-ol:list-decimal flex flex-col items-center",
        style: `${bgColor ? `background-color: ${bgColor};` : ''} ${bgImage ? `background-image: url(${bgImage}); background-size: cover;` : ''}`
      },
    },
  });

  const [openPreview, setOpenPreview] = useState(false);


  const handleClose = () => setOpenPreview(false);

  // Function to get HTML with the parent container
function getCompleteHTML() {
  if (!editor) return '';
  
  // Get the editor's content
  const editorContent = editor.getHTML();
  
  // Get the editor's DOM element to extract applied styles
  const editorDOM = document.querySelector(".tiptap.ProseMirror");
  const editorStyle = editorDOM?.getAttribute('style') || '';
  const editorClasses = editorDOM?.getAttribute('class') || '';
  
  // Create a parent container with the extracted styles
  const containerDiv = document.createElement('div');
  if (editorStyle) {
    containerDiv.setAttribute('style', editorStyle);
  }
  
  // Optionally preserve classes that aren't tiptap-specific
  if (editorClasses) {
    const filteredClasses = editorClasses
      .split(' ')
      .filter(cls => !['tiptap', 'ProseMirror'].includes(cls))
      .join(' ');
    
    if (filteredClasses) {
      containerDiv.setAttribute('class', filteredClasses);
    }
  }
  
  // Set the editor content inside the container
  containerDiv.innerHTML = editorContent;
  
  // Create a wrapper to get the HTML
  const wrapper = document.createElement('div');
  wrapper.appendChild(containerDiv);
  console.log('wrapper',typeof wrapper.innerHTML)
  return wrapper.innerHTML.replaceAll('resizable-image','img');
}

  useEffect(() => {
    if (editor && content) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        
        // Step 1: Extract styles from the parent container
        const rootDiv = doc.body.firstElementChild;
        let extractedStyle = '';
        
        if (rootDiv && rootDiv.tagName === 'DIV') {
          extractedStyle = rootDiv.getAttribute('style') || '';
          
          // Optional: Extract any classes too
          const extractedClasses = rootDiv.getAttribute('class') || '';
          
          // Step 2: Apply the styles to your editor container
          setTimeout(() => {
            // Find the actual editor DOM element
            const editorContainer = document.querySelector(".tiptap.ProseMirror");
            if (editorContainer) {
              // Apply the extracted styles
              if (extractedStyle) {
                editorContainer.setAttribute("style", extractedStyle);
              }
              
              // Optionally apply classes if needed
              if (extractedClasses) {
                extractedClasses.split(' ').forEach(cls => {
                  if (cls.trim()) editorContainer.classList.add(cls.trim());
                });
              }
            }
          }, 100); // Small delay to ensure DOM is ready
        }
        
        // Handle image replacements as you were doing
        // doc.querySelectorAll("img").forEach((img) => {
        //   const wrapper = document.createElement("div");
        //   wrapper.innerHTML = `<resizable-image src="${img.src}" alt="${img.alt}" width="300" alignment="center"></resizable-image>`;
        //   if (wrapper.firstChild) {
        //     img.replaceWith(wrapper.firstChild);
        //   }
        // });
        
        // Get the inner content of the root div (if it exists)
        const contentToSet = rootDiv && rootDiv.tagName === 'DIV' 
          ? rootDiv.innerHTML 
          : doc.body.innerHTML;
          
        // Set the content in the editor
        setTimeout(() => {
          editor.commands.setContent(contentToSet, false);
        }, 0);
        
      } catch (e) {
        console.error("Error processing content:", e);
        setTimeout(() => {
          editor.commands.setContent(content, false);
        }, 0);
      }
    }
  }, [content, editor]);

  const handlePreviewModel = (value: boolean) => {
    setOpenPreview(value);
    if (value) {
      let data = getCompleteHTML()
      setEditorHtmlData(data);
    }
  }

  const handleSave = async (published: boolean) => {
    const token = localStorage.getItem("token");
    const content = getCompleteHTML();
    const thumbnail = localStorage.getItem(`thumbnail-${id}`);
    await fetch("/api/posts?id="+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, content, published, thumbnail })
    });
};

  return (
    <div className="flex flex-row w-full h-full px-10 items-center justify-evenly">
      {/* Editor container with scroll */}
      <div className={`flex flex-col items-center overflow-y-auto rounded-xl shadow-lg backdrop-blur-lg ${
        theme === 'light'
          ? 'bg-white/90 text-black'
          : theme === 'dark'
          ? 'bg-gray-800 text-white'
          : 'bg-yellow-100/90 text-gray-900'
      }`} style={{ height: '85vh' , width: '80%', backgroundColor: bgColor, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
        {/* <EditorContent editor={titleEditor} /> */}
        <EditorContent editor={editor} />
      </div>

      {/* Right sidebar: MenuBar */}
      <div className=" w-60 bg-white border-l border-gray-200 shadow-lg z-50 px-3 py-4 flexr" style={{ height: '85vh'}}>
      <MenuBar editor={editor} id={id} setBgColor={setBgColor} setBgImage={setBgImage} setTheme={setTheme} handlePreviewModel={handlePreviewModel} handleSave={handleSave}/>
      </div>

      <Modal open={openPreview} onClose={handleClose}>
            {/* <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} /> */}
            <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflowY: 'auto',
          width: '80%',
          borderRadius: 2
        }}>
          <div dangerouslySetInnerHTML={{ __html: editorHtmlData }} />
        </Box>

      </Modal>
    </div>
  );
}
