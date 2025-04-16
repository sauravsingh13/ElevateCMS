import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from "@tiptap/react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";

const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: 300 },
      height: { default: "auto" },
      alignment: { default: "center" }, // new attribute
    };
  },

  parseHTML() {
    return [{ tag: "resizable-image" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["resizable-image", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

const ResizableImageComponent = ({ node, updateAttributes }: any) => {
  const { src, alt, width, alignment } = node.attrs;

  return (
<NodeViewWrapper className="my-4" style={{ width: '100%', overflow: 'auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent:
            alignment === 'center'
              ? 'center'
              : alignment === 'left'
              ? 'flex-start'
              : 'flex-end',
          float:
            alignment === 'center'
              ? 'none'
              : alignment === 'left'
              ? 'left'
              : alignment === 'right'
              ? 'right'
              : 'none',
          display: 'inline-block',
          maxWidth: '100%',
          margin: alignment !== 'center' ? '0 1rem 1rem 1rem' : '0 auto',
          clear: 'both',
          flexDirection: 'column',
          alignItems:
            alignment === 'center'
              ? 'center'
              : alignment === 'left'
              ? 'flex-start'
              : 'flex-end',
        }}
      >
        <ResizableBox
          width={width}
          height={300}
          resizeHandles={["se"]}
          minConstraints={[100, 150]}
          maxConstraints={[1000, 800]}
          lockAspectRatio={false}
          axis="both"
          handle={
            <span
              className="custom-handle-e"
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '24px',
                height: '24px',
                backgroundColor: '#888',
                borderRadius: '50%',
                cursor: 'nwse-resize',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#fff',
                zIndex: 10,
              }}
            >
              ❯
            </span>
          }
          onResizeStop={(_: unknown, data: ResizeCallbackData) =>
            updateAttributes({ width: data.size.width, height: data.size.height })
          }
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
              display: "block",
              float:
                alignment === 'center'
                  ? 'none'
                  : alignment === 'left'
                  ? 'left'
                  : alignment === 'right'
                  ? 'right'
                  : 'none',
              // margin:
              //   alignment === 'center'
              //     ? '0 auto'
              //     : alignment === 'left'
              //     ? '0 1rem 1rem 0'
              //     : alignment === 'right'
              //     ? '0 0 1rem 1rem'
              //     : '0 auto'
            }}
          />
        </ResizableBox>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button onClick={() => updateAttributes({ alignment: 'left' })}>⬅️</button>
          <button onClick={() => updateAttributes({ alignment: 'center' })}>↔️</button>
          <button onClick={() => updateAttributes({ alignment: 'right' })}>➡️</button>
        </div>

        <input
          type="text"
          placeholder="Add a caption..."
          value={alt}
          onChange={(e) => updateAttributes({ alt: e.target.value })}
          style={{
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: '#555',
            border: 'none',
            borderBottom: '1px solid #ccc',
            background: 'transparent',
            textAlign: alignment,
            width: '100%',
            maxWidth: '90%',
          }}
        />
      </div>
    </NodeViewWrapper>
  );
};

export default ResizableImage;