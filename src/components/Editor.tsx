"use client";

import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editorTools";

const ReactEditorJS = createReactEditorJS();

export default function Editor() {
  return (
    <div className="px-6 md:px-16 py-12 max-w-5xl mx-auto space-y-10">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Start Creating Your Post</h1>
        <p className="text-gray-500">Use the inputs and editor below to build your article.</p>
      </div>

      {/* Cover image action */}
      <div className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-gray-700 transition">
        <span className="text-xl">🖼️</span>
        <span className="underline underline-offset-2">Add Cover Image</span>
      </div>

      {/* Title input */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter your article title here..."
          className="w-full text-4xl font-bold text-gray-900 placeholder-gray-400 outline-none border-b border-gray-300 focus:border-blue-500 pb-2"
        />
      </div>

      {/* Subtitle input */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Subtitle (optional)</label>
        <input
          type="text"
          placeholder="Write a short summary or subtitle..."
          className="w-full text-xl text-gray-600 placeholder-gray-400 outline-none border-b border-gray-200 focus:border-blue-400 pb-2"
        />
      </div>

      {/* Editor label and tips */}
      <div className="space-y-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Article Content</h2>
          <p className="text-sm text-gray-500">
            Start writing below. Use <strong>/</strong> to open commands. Use <strong>**</strong> or toolbar for <strong>bold</strong>, <strong>#</strong> for headings, and more.
          </p>
        </div>

        {/* Editor block */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <ReactEditorJS
            defaultValue={{
              time: new Date().getTime(),
              blocks: [],
            }}
            tools={EDITOR_JS_TOOLS}
            holder="editorjs-container"
          />
          <div id="editorjs-container" />
        </div>
      </div>
    </div>
  );
}