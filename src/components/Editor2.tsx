// app/editor/page.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Youtube from '@tiptap/extension-youtube';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import { DndContext, useSensors, useSensor, PointerSensor, DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable, useDroppable } from '@dnd-kit/core';

// MUI Icons
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import TableChartIcon from '@mui/icons-material/TableChart';
import HorizontalRuleIcon from '@mui/icons-material/Remove';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TitleIcon from '@mui/icons-material/Title';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import PaletteIcon from '@mui/icons-material/Palette';
import HighlightIcon from '@mui/icons-material/Highlight';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';

// Custom draggable image component
const DraggableImage = ({ node, updateAttributes, editor }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `image-${node.attrs.src}`,
    data: {
      type: 'image',
      node,
    },
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    position: 'relative',
    zIndex: 1,
    cursor: 'grab',
  } : {};

  return (
    <NodeViewWrapper>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div 
          ref={setNodeRef} 
          {...attributes} 
          {...listeners}
          style={style}
        >
          <img 
            src={node.attrs.src} 
            width={node.attrs.width || 300} 
            height={node.attrs.height || 'auto'} 
            style={{ 
              resize: 'both',
              overflow: 'auto',
              maxWidth: '100%',
              border: '1px solid #ccc',
            }}
          />
          <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.5)', padding: '2px' }}>
            <DragIndicatorIcon style={{ color: 'white', fontSize: 16 }} />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

// Custom draggable extension
const DraggableImageExtension = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(DraggableImage);
  },
});

// Styled components
const EditorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 'calc(100vh - 20px)',
  margin: '10px',
  gap: '10px',
  overflow: 'hidden',
}));

const EditorWrapper = styled(Box)(({ theme }) => ({
  width: '80%',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  padding: '20px',
  overflow: 'auto',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
}));

const MenuWrapper = styled(Box)(({ theme }) => ({
  width: '20%',
  backgroundColor: '#f5f5f5',
  padding: '15px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflowY: 'auto',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
}));

const MenuSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '10px',
  borderRadius: '4px',
  marginBottom: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
}));

const MenuSectionTitle = styled('h3')(({ theme }) => ({
  margin: '0 0 10px 0',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333',
}));

const IconButton = styled('button')(({ theme, active }) => ({
  backgroundColor: active ? '#e3f2fd' : 'transparent',
  border: active ? '1px solid #2196f3' : '1px solid #ddd',
  borderRadius: '4px',
  padding: '8px',
  cursor: 'pointer',
  margin: '0 4px 4px 0',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#f0f7ff',
  },
}));

const IconButtonRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
}));

const ColorPicker = styled('input')(({ theme }) => ({
  width: '30px',
  height: '30px',
  padding: 0,
  border: 'none',
  cursor: 'pointer',
}));

const SelectInput = styled('select')(({ theme }) => ({
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  marginRight: '4px',
  background: 'white',
}));

// Droppable area component
const DroppableArea = ({ children, id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} style={{ minHeight: '100px', width: '100%' }}>
      {children}
    </div>
  );
};

// Theme options
const themes = [
  {
    name: 'Light',
    backgroundColor: '#ffffff',
    color: '#333333',
  },
  {
    name: 'Dark',
    backgroundColor: '#222222',
    color: '#f5f5f5',
  },
  {
    name: 'Sepia',
    backgroundColor: '#f8f2e4',
    color: '#5b4636',
  },
  {
    name: 'Blue',
    backgroundColor: '#f0f7ff',
    color: '#0a2c4e',
  },
];

const fontFamilies = [
  { name: 'Default', value: 'Arial, sans-serif' },
  { name: 'Serif', value: 'Georgia, serif' },
  { name: 'Monospace', value: 'Courier New, monospace' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
];

const fontSizes = [
  { name: 'Small', value: '12px' },
  { name: 'Default', value: '16px' },
  { name: 'Medium', value: '20px' },
  { name: 'Large', value: '24px' },
  { name: 'X-Large', value: '30px' },
];

const BlogEditor = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const youtubeInputRef = useRef(null);
  const bgImageInputRef = useRef(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [hasBgImage, setHasBgImage] = useState(false);

  // Set up sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px distance before drag starts
      },
    })
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      DraggableImageExtension.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      FontFamily,
      Youtube.configure({
        width: 640,
        height: 480,
        controls: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Start writing your blog post here...',
      }),
    ],
    content: '<h1>My Blog Post</h1><p>Start writing your amazing blog post here!</p>',
  });

  // Theme customization with useEffect
  useEffect(() => {
    if (editor) {
      const editorElement = document.querySelector('.ProseMirror');
      if (editorElement) {
        editorElement.style.backgroundColor = selectedTheme.backgroundColor;
        editorElement.style.color = selectedTheme.color;
      }
    }
  }, [selectedTheme, editor]);

  if (!editor) {
    return null;
  }

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          editor.chain().focus().setImage({ src: e.target.result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle background image upload
  const handleBgImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const editorElement = document.querySelector('.ProseMirror');
          if (editorElement) {
            editorElement.style.backgroundImage = `url(${e.target.result})`;
            editorElement.style.backgroundSize = 'cover';
            editorElement.style.backgroundPosition = 'center';
            setHasBgImage(true);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear background image
  const clearBackgroundImage = () => {
    const editorElement = document.querySelector('.ProseMirror');
    if (editorElement) {
      editorElement.style.backgroundImage = 'none';
      setHasBgImage(false);
    }
  };

  // Handle link insertion
  const handleInsertLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  // Handle YouTube embed
  const handleInsertYoutube = () => {
    if (youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
      setYoutubeUrl('');
      setShowYoutubeInput(false);
    }
  };

  // Insert table
  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.data.current?.type === 'image') {
      // Calculate position based on drop coordinates
      // This is a simplified approach - you might need a more sophisticated method
      // based on your specific requirements
      
      // Get the editor view DOM reference
      const editorView = editor.view.dom;
      const editorRect = editorView.getBoundingClientRect();
      
      // Position is relative to the editor
      const dropPosition = {
        x: over.rect.left - editorRect.left,
        y: over.rect.top - editorRect.top,
      };
      
      // Find the image node
      const imageNode = active.data.current.node;
      
      // Use the node ID to identify and update the image
      // In a real implementation, you might need to traverse the document
      // to find and update the node based on more reliable identifiers
      
      // This simplified approach assumes you want to visually move the image
      // You would need to update this based on your document structure
      
      // Find a near position in the document based on coordinates
      const pos = editor.view.posAtCoords({
        left: over.rect.left,
        top: over.rect.top,
      });
      
      if (pos) {
        // This is a simplified approach - in a real implementation you would:
        // 1. Delete the original node
        // 2. Insert a new node at the target position
        
        // For demonstration purposes, we'll just log the position
        console.log('Dropped image at position:', pos);
        
        // Force a document update to reflect changes
        editor.view.updateState(editor.view.state);
      }
    }
  };

  // Menu components and handlers
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <EditorContainer>
        <EditorWrapper>
          <DroppableArea id="editor-drop-area">
            <EditorContent editor={editor} />
          </DroppableArea>
        </EditorWrapper>
        <MenuWrapper>
          <MenuSection>
            <MenuSectionTitle>Text Formatting</MenuSectionTitle>
            <IconButtonRow>
              <IconButton 
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
                title="Bold"
              >
                <FormatBoldIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
                title="Italic"
              >
                <FormatItalicIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive('underline')}
                title="Underline"
              >
                <FormatUnderlinedIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                active={editor.isActive('highlight')}
                title="Highlight"
              >
                <HighlightIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                title="Clear Formatting"
              >
                <FormatClearIcon fontSize="small" />
              </IconButton>
            </IconButtonRow>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Headings & Paragraphs</MenuSectionTitle>
            <IconButtonRow>
              <IconButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
              >
                <TitleIcon fontSize="small" />1
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
              >
                <TitleIcon fontSize="small" />2
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor.isActive('heading', { level: 3 })}
                title="Heading 3"
              >
                <TitleIcon fontSize="small" />3
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive('blockquote')}
                title="Blockquote"
              >
                <FormatQuoteIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Rule"
              >
                <HorizontalRuleIcon fontSize="small" />
              </IconButton>
            </IconButtonRow>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Lists</MenuSectionTitle>
            <IconButtonRow>
              <IconButton 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
                title="Bullet List"
              >
                <FormatListBulletedIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
                title="Ordered List"
              >
                <FormatListNumberedIcon fontSize="small" />
              </IconButton>
            </IconButtonRow>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Alignment</MenuSectionTitle>
            <IconButtonRow>
              <IconButton 
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                active={editor.isActive({ textAlign: 'left' })}
                title="Align Left"
              >
                <FormatAlignLeftIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                active={editor.isActive({ textAlign: 'center' })}
                title="Align Center"
              >
                <FormatAlignCenterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                active={editor.isActive({ textAlign: 'right' })}
                title="Align Right"
              >
                <FormatAlignRightIcon fontSize="small" />
              </IconButton>
            </IconButtonRow>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Code</MenuSectionTitle>
            <IconButtonRow>
              <IconButton 
                onClick={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive('code')}
                title="Inline Code"
              >
                <CodeIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                active={editor.isActive('codeBlock')}
                title="Code Block"
              >
                <CodeIcon fontSize="small" style={{ transform: 'scale(1.2)' }} />
              </IconButton>
            </IconButtonRow>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Font Style</MenuSectionTitle>
            <Box sx={{ display: 'flex', gap: '8px', mb: 1 }}>
              <SelectInput
                onChange={(e) => {
                  editor.chain().focus().setFontFamily(e.target.value).run();
                }}
              >
                {fontFamilies.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </SelectInput>
            </Box>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <SelectInput
                onChange={(e) => {
                  editor.chain().focus().setFontSize(e.target.value).run();
                }}
              >
                {fontSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.name}
                  </option>
                ))}
              </SelectInput>
            </Box>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Colors</MenuSectionTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FormatColorTextIcon fontSize="small" sx={{ mr: 1 }} />
              <ColorPicker
                type="color"
                onChange={(e) => {
                  editor.chain().focus().setColor(e.target.value).run();
                }}
                defaultValue="#000000"
                title="Text Color"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormatColorFillIcon fontSize="small" sx={{ mr: 1 }} />
              <ColorPicker
                type="color"
                onChange={(e) => {
                  const editorElement = document.querySelector('.ProseMirror');
                  if (editorElement) {
                    editorElement.style.backgroundColor = e.target.value;
                  }
                }}
                defaultValue="#ffffff"
                title="Background Color"
              />
            </Box>
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Media</MenuSectionTitle>
            <IconButtonRow>
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                title="Insert Image"
              >
                <ImageIcon fontSize="small" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </IconButton>
              
              <IconButton
                onClick={() => bgImageInputRef.current?.click()}
                title="Background Image"
              >
                <WallpaperIcon fontSize="small" />
                <input
                  type="file"
                  ref={bgImageInputRef}
                  onChange={handleBgImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </IconButton>
              
              {hasBgImage && (
                <IconButton
                  onClick={clearBackgroundImage}
                  title="Clear Background Image"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}

              <IconButton
                onClick={() => setShowLinkInput(!showLinkInput)}
                active={showLinkInput}
                title="Insert Link"
              >
                <LinkIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => setShowYoutubeInput(!showYoutubeInput)}
                active={showYoutubeInput}
                title="Insert YouTube Video"
              >
                <YouTubeIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={insertTable}
                title="Insert Table"
              >
                <TableChartIcon fontSize="small" />
              </IconButton>
            </IconButtonRow>

            {showLinkInput && (
              <Box sx={{ mt: 1, display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Enter URL"
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd' 
                  }}
                />
                <button
                  onClick={handleInsertLink}
                  style={{ 
                    padding: '8px 12px', 
                    borderRadius: '4px', 
                    backgroundColor: '#1976d2', 
                    color: 'white', 
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </Box>
            )}

            {showYoutubeInput && (
              <Box sx={{ mt: 1, display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="YouTube URL"
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd' 
                  }}
                />
                <button
                  onClick={handleInsertYoutube}
                  style={{ 
                    padding: '8px 12px', 
                    borderRadius: '4px', 
                    backgroundColor: '#1976d2', 
                    color: 'white', 
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Embed
                </button>
              </Box>
            )}
          </MenuSection>

          <MenuSection>
            <MenuSectionTitle>Theme</MenuSectionTitle>
            <SelectInput
              onChange={(e) => {
                const theme = themes.find(t => t.name === e.target.value);
                if (theme) setSelectedTheme(theme);
              }}
              defaultValue={selectedTheme.name}
            >
              {themes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </SelectInput>
          </MenuSection>

          <MenuSection>
            <button
              onClick={() => {
                console.log(editor.getHTML());
                alert('Content saved!\n\nCheck the console to see the HTML output.');
              }}
              style={{ 
                padding: '12px',
                borderRadius: '4px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                width: '100%',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Save Blog Post
            </button>
          </MenuSection>
        </MenuWrapper>
      </EditorContainer>
    </DndContext>
  );
};

export default BlogEditor;