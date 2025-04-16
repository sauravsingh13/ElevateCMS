import React from 'react'
import { Editor } from '@tiptap/react'

// Icons from MUI
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import TitleIcon from '@mui/icons-material/Title'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import CodeIcon from '@mui/icons-material/Code'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatClearIcon from '@mui/icons-material/FormatClear'
import ImageIcon from '@mui/icons-material/Image'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TableChartIcon from '@mui/icons-material/TableChart';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

// Import necessary Tiptap extensions
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="grid grid-cols-2 gap-3 auto-rows-min">
          <select
            onChange={(e) =>
              editor.chain().focus().setFontSize?.(e.target.value).run()
            }
            className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:border-blue-400 focus:outline-none"
          >
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="32px">32px</option>
          </select>

          <select
            onChange={(e) =>
              editor.chain().focus().setFontFamily?.(e.target.value).run()
            }
            className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:border-blue-400 focus:outline-none"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>

          <input
            type="color"
            className="w-8 h-8 rounded border border-gray-300"
            onChange={(e) =>
              editor.chain().focus().setColor?.(e.target.value).run()
            }
          />

          <button
            title="Insert Link"
            onClick={() => {
              const { from, to } = editor.state.selection;
              if (from === to) {
                alert("Please select text to link.");
                return;
              }
              const url = window.prompt("Enter the URL", "https://");
              if (url) {
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }
            }}
            className={`px-2 py-1 rounded ${
              editor.isActive("link") ? "bg-cyan-100 text-cyan-800 shadow-sm" : "bg-gray-100 text-gray-700"
            }`}
          >
            <InsertLinkIcon />
          </button>

          <button
            title="Blockquote"
            onClick={() => {
              editor.chain().focus().setParagraph().toggleBlockquote().run();
            }}
            className={`px-2 py-1 rounded ${
              editor.isActive("blockquote") ? "bg-lime-100 text-lime-800 shadow-sm" : "bg-gray-100 text-gray-700"
            }`}
          >
            <FormatQuoteIcon />
          </button>

          <button
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("codeBlock") ? "bg-neutral-100 text-neutral-800 shadow-sm" : "bg-gray-100 text-gray-700"
            }`}
          >
            <CodeIcon />
          </button>

          <button
            title="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight?.({ color: '#ffff00' }).run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("highlight") ? "bg-yellow-200 text-yellow-800 shadow-sm" : "bg-gray-100 text-gray-700"
            }`}
          >
            <HighlightAltIcon />
          </button>

          <button title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            <FormatAlignLeftIcon />
          </button>
          <button title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            <FormatAlignCenterIcon />
          </button>
          <button title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            <FormatAlignRightIcon />
          </button>
          <button title="Align Justify" onClick={() => editor.chain().focus().setTextAlign("justify").run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            <FormatAlignJustifyIcon />
          </button>

          <button title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            <FormatClearIcon />
          </button>

          <button
            title="Insert Image"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = async () => {
                const file = input.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  const base64 = reader.result as string;
                  editor.chain().focus().setImage({ src: base64 }).run();
                };
                reader.readAsDataURL(file);
              };
              input.click();
            }}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700"
          >
            <ImageIcon />
          </button>

          <button
            title="Insert YouTube Video"
            onClick={() => {
              const url = window.prompt("Enter YouTube embed URL");
              if (url) editor.commands.setYoutubeVideo({ src: url });
            }}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700"
          >
            <OndemandVideoIcon />
          </button>

          <button
            title="Insert Audio"
            onClick={() => {
              const url = window.prompt("Enter audio file URL");
              if (url) editor.commands.insertContent(`<audio controls src="${url}"></audio>`);
            }}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700"
          >
            <AudiotrackIcon />
          </button>

          <button
            title="Insert Table"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className="px-2 py-1 rounded bg-gray-100 text-gray-700"
          >
            <TableChartIcon />
          </button>

          {[
            { cmd: "toggleBold", icon: <FormatBoldIcon />, color: "bg-yellow-100 text-yellow-800", title: "Bold" },
            { cmd: "toggleItalic", icon: <FormatItalicIcon />, color: "bg-green-100 text-green-800", title: "Italic" },
            { cmd: "toggleUnderline", icon: <FormatUnderlinedIcon />, color: "bg-purple-100 text-purple-800", title: "Underline" },
            { cmd: "toggleStrike", icon: <StrikethroughSIcon />, color: "bg-pink-100 text-pink-800", title: "Strikethrough" },
          ].map(({ cmd, icon, color, title }) => (
            <button
              key={cmd}
              title={title}
              onClick={() => editor.chain().focus()[cmd]().run()}
              className={`px-2 py-1 rounded transition-all duration-150 border border-transparent hover:brightness-110 ${
                editor.isActive(cmd.replace("toggle", "").toLowerCase())
                  ? `${color} shadow-sm`
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {icon}
            </button>
          ))}

          {[1, 2].map((level) => (
            <button
              key={`H${level}`}
              title={`Heading ${level}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              className={`px-2 py-1 rounded border border-transparent font-medium ${
                editor.isActive("heading", { level })
                  ? "bg-indigo-100 text-indigo-800 shadow-sm"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <TitleIcon fontSize="small" className="mr-1" />H{level}
            </button>
          ))}

          <button
            title="Bullet List"
            onClick={() => {
              editor.chain().focus().setParagraph().toggleBulletList().run();
            }}
            className={`px-2 py-1 rounded ${
              editor.isActive("bulletList")
                ? "bg-rose-100 text-rose-800 shadow-sm"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <FormatListBulletedIcon/>
          </button>
          <button
            title="Ordered List"
            onClick={() => {
              editor.chain().focus().setParagraph().toggleOrderedList().run();
            }}
            className={`px-2 py-1 rounded ${
              editor.isActive("orderedList")
                ? "bg-orange-100 text-orange-800 shadow-sm"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <FormatListNumberedIcon/>
          </button>

          <button
            title="Horizontal Rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-2 py-1 rounded hover:bg-blue-100 text-gray-700"
          >
            <HorizontalRuleIcon />
          </button>
        </div>
    );
  };


export default MenuBar