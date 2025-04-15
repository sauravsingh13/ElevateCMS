import React from 'react'

export const SlashCommandList = ({ items, command, editor }: any) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded w-64 p-1">
      {items.length === 0 && (
        <div className="text-gray-500 px-2 py-1">No results</div>
      )}
      <div className="flex gap-2 px-2">
        {items.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => command(item)}
            title={item.title}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded hover:bg-blue-100"
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  )
}