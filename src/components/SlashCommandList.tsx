import React from 'react'

export const SlashCommandList = ({ items, command, editor }: any) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded w-64 p-1">
      {items.length === 0 && (
        <div className="text-gray-500 px-2 py-1">No results</div>
      )}
      {items.map((item: any, index: number) => (
        <button
          key={index}
          onClick={() => command(item)}
          className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm"
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}