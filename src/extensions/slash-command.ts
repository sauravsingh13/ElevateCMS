import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import tippy, { Instance as TippyInstance } from 'tippy.js'
import { SlashCommandList } from '@/components/SlashCommandList' // we'll create this

export interface SlashCommandItem {
  title: string
  command: (props: { editor: any; range: any }) => void
}

const items: SlashCommandItem[] = [
  {
    title: 'Heading 1',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    },
  },
  {
    title: 'Heading 2',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    },
  },
  {
    title: 'Bullet List',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Quote',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  {
    title: 'Code Block',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
  {
    title: 'Image',
    command: ({ editor, range }) => {
      const url = window.prompt('Enter image URL')
      if (!url) return
      editor.chain().focus().deleteRange(range).setImage({ src: url }).run()
    },
  },
]

export const SlashCommand = Extension.create({
  name: 'slash-command',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: true,
        items: () => items,
        render: () => {
          let component: any
          let popup: TippyInstance | null = null

          return {
            onStart: (props: { editor: any; clientRect: () => DOMRect | undefined }) => {
              component = new ReactRenderer(SlashCommandList, {
                props,
                editor: props.editor,
              })

              const instance = tippy(document.body, {
                getReferenceClientRect: () => props.clientRect() as DOMRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              })
              popup = instance
            },
            onUpdate(props: { editor: any; clientRect: () => DOMRect | undefined }) {
              component.updateProps(props)
              if (popup) {
                popup.setProps({ getReferenceClientRect: () => props.clientRect() || new DOMRect() })
              }
            },
            onKeyDown(props: { event: KeyboardEvent; range: any; text: string }) {
              return component.ref?.onKeyDown(props)
            },
            onExit() {
              popup?.destroy()
              component?.destroy()
            },
          }
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})