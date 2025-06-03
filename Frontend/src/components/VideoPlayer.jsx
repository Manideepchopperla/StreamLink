import React, { useRef, useEffect, useState } from 'react'
import { FaMicrophoneSlash } from 'react-icons/fa'

const VideoPlayer = ({ 
  stream, 
  userName,
  muted = false,
  isLocal = false,
  isSpeaking = false,
  audioEnabled = true
}) => {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.onloadedmetadata = () => setVideoLoaded(true)
    }
  }, [stream])

  const hasVideoEnabled = stream &&
    stream.getVideoTracks().length > 0 &&
    stream.getVideoTracks()[0].enabled

  return (
    <div
      className={`relative bg-zinc-900 rounded-xl overflow-hidden aspect-video shadow-lg transition ring-offset-2 ${
        isSpeaking ? 'ring-4 ring-blue-500/70 shadow-blue-400/30' : ''
      }`}
    >
      {hasVideoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal || muted}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-700">
          <div className="w-20 h-20 rounded-full bg-zinc-600 text-white text-3xl font-semibold flex items-center justify-center shadow-md">
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-2 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm shadow-sm">
        <span className="font-medium">
          {isLocal ? 'You' : userName || 'Guest'}
        </span>
        {!audioEnabled && (
          <FaMicrophoneSlash className="text-red-500 text-sm" />
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
