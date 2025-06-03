import React, { useState, useRef, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Chat = ({ messages, sendMessage, onClose, isOpen }) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isOpen) return null

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-zinc-900 text-white shadow-xl z-30 flex flex-col border-l border-zinc-700">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
        <h2 className="text-lg font-semibold">In-call messages</h2>
        <button onClick={onClose} className="text-zinc-400 hover:text-white p-2 rounded hover:bg-zinc-800">
          <FaTimes className="text-lg" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-9 h-9 bg-zinc-600 text-white flex items-center justify-center rounded-full text-sm font-semibold">
                {msg.sender.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm text-zinc-400">
                  {msg.sender} <span className="ml-2 text-xs text-zinc-500">{msg.time}</span>
                </div>
                <div className="text-base text-white">{msg.content}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-700 px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message to everyone"
            className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-600 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium text-white transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
