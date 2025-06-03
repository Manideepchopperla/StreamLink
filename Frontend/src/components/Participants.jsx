import React from 'react'
import {
  FaTimes,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash
} from 'react-icons/fa'

const Participants = ({ participants, onClose, isOpen }) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white text-zinc-800 shadow-2xl border-l border-zinc-200 z-30 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
        <h2 className="text-lg font-semibold">Participants ({participants.length})</h2>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-900 p-2 rounded hover:bg-zinc-100"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>

      {/* Participant List */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <h4 className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wide">In this call</h4>
        <ul className="space-y-4">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center justify-between border-b pb-4 border-zinc-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-zinc-400 text-white flex items-center justify-center text-sm font-semibold">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm font-medium">
                  {participant.name}
                  {participant.isLocal && (
                    <span className="ml-1 text-xs text-zinc-400 font-normal">(You)</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {participant.audioEnabled ? (
                  <FaMicrophone className="text-green-600" />
                ) : (
                  <FaMicrophoneSlash className="text-red-500" />
                )}
                {participant.videoEnabled ? (
                  <FaVideo className="text-green-600" />
                ) : (
                  <FaVideoSlash className="text-red-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Participants
