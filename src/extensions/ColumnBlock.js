// src/extensions/ColumnBlock.js
import { Node } from '@tiptap/core';

export const ColumnBlock = Node.create({
  name: 'columnBlock',
  group: 'block',
  content: 'block+',
  
  parseHTML() {
    return [{ tag: 'div[data-type="column-block"]' }];
  },
  
  renderHTML() {
    return ['div', { 'data-type': 'column-block' }, 0];
  },
  
  addAttributes() {
    return {
      style: {
        default: 'width: 32%; padding: 12px; min-height: 100px; word-wrap: break-word;'
      }
    }
  }
});