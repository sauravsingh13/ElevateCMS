// src/extensions/ThreeColumnLayout.js
import { Node } from "@tiptap/core";

export const ThreeColumnLayout = Node.create({
  name: "threeColumnLayout",
  group: "block",
  content: "columnBlock{3}", // Exactly 3 columnBlock nodes
  
  parseHTML() {
    return [{ tag: 'div[data-type="three-column"]' }];
  },

  renderHTML() {
    return ['div', { 'data-type': 'three-column' }, 0];
  },
  
  addAttributes() {
    return {
      style: {
        default: 'display: flex; justify-content: space-between; width: 100%; min-height: 200px; margin: 1rem 0;'
      }
    }
  },

  addCommands() {
    return {
      insertThreeColumnLayout: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          content: [
            { 
                type: 'columnBlock', 
                content: [{ 
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Type or drop image' }]
                }]
              },
            { 
                type: 'columnBlock', 
                content: [{ 
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Type or drop image' }]
                }]
              },
              { 
                type: 'columnBlock', 
                content: [{ 
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Type or drop image' }]
                }]
              },
          ]
        });
      }
    };
  }
});