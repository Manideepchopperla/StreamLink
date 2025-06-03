import { 
  FaMicrophone, FaMicrophoneSlash, 
  FaVideo, FaVideoSlash, 
  FaDesktop, FaPhone, 
  FaCommentAlt, FaUserFriends,
  FaEllipsisH, FaRecordVinyl
} from 'react-icons/fa'

const Controls = ({ 
  isMicOn, 
  toggleMic, 
  isCameraOn, 
  toggleCamera, 
  isScreenSharing,
  toggleScreenShare,
  leaveMeeting,
  toggleChat,
  toggleParticipants,
  toggleRecording,
  isRecording
}) => {
  return (
    <div className="bg-white border-t border-google-light-gray py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm text-google-gray">
          Meeting details
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
            onClick={toggleMic}
            title={isMicOn ? "Turn off microphone" : "Turn on microphone"}
            className={`p-3 rounded-full transition-colors duration-200 
            ${isMicOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} 
            text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${isMicOn ? 'green' : 'red'}-400`}
        >
            {isMicOn ? <FaMicrophone className="text-xl" /> : <FaMicrophoneSlash className="text-xl" />}
        </button>
          

  {/* Camera Toggle */}
  <button
    onClick={toggleCamera}
    title={isCameraOn ? "Turn off camera" : "Turn on camera"}
    className={`p-3 rounded-full transition-colors duration-200
      ${isCameraOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
      text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${isCameraOn ? 'green' : 'red'}-400`}
  >
    {isCameraOn ? <FaVideo className="text-xl" /> : <FaVideoSlash className="text-xl" />}
  </button>

  {/* Screen Share */}
  <button
    onClick={toggleScreenShare}
    title={isScreenSharing ? "Stop presenting" : "Present now"}
    className={`p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg 
      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400`}
  >
    <FaDesktop className="text-xl" />
  </button>

  {/* Recording */}
  <button
    onClick={toggleRecording}
    title={isRecording ? "Stop recording" : "Start recording"}
    className={`p-3 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-700'} 
      hover:bg-red-700 text-white shadow-md hover:shadow-lg 
      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400`}
  >
    <FaRecordVinyl className="text-xl animate-pulse" />
  </button>

  {/* Participants */}
  <button
    onClick={toggleParticipants}
    title="Show participants"
    className="p-3 rounded-full bg-gray-700 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition duration-200"
  >
    <FaUserFriends className="text-xl" />
  </button>

  {/* Chat */}
  <button
    onClick={toggleChat}
    title="Chat with everyone"
    className="p-3 rounded-full bg-gray-700 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition duration-200"
  >
    <FaCommentAlt className="text-xl" />
  </button>

  {/* More Options */}
  <button
    title="More options"
    className="p-3 rounded-full bg-gray-700 hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition duration-200"
  >
    <FaEllipsisH className="text-xl" />
  </button>

  {/* Leave Meeting */}
  <button
    onClick={leaveMeeting}
    title="Leave meeting"
    className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition duration-200"
  >
    <FaPhone className="text-xl transform rotate-225" />
  </button>

</div>

{/* Clock */}
<div className="hidden sm:block text-sm text-gray-500 font-medium">
  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</div>

      </div>
    </div>
  )
}

export default Controls