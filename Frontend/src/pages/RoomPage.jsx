import { toast } from 'react-toastify';
import copy from 'copy-text-to-clipboard'; 
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Controls from '../components/Controls';
import Chat from '../components/Chat';
import Participants from '../components/Participants';

const RoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [copied, setCopied] = useState(false);

  const toggleMic = () => setIsMicOn(prev => !prev);
  const toggleCamera = () => setIsCameraOn(prev => !prev);
  const toggleScreenShare = () => setIsScreenSharing(prev => !prev);
  const toggleRecording = () => setIsRecording(prev => !prev);
  const leaveMeeting = () => navigate("/");

  const handleCopy = () => {
    copy(id);
    setCopied(true);
    toast.success("Meeting link copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-200">
      {/* Meeting info bar */}
      <div className="bg-white border-b border-gray-300 py-3 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Meeting</h1>
          <div className="flex items-center">
            <div className="mr-4 text-gray-600 text-sm hidden sm:flex items-center">
              <span>Share meeting: </span>
              <button className="ml-2 flex items-center text-blue-600 hover:text-blue-800 transition duration-200" onClick={handleCopy}>
                {copied ? <FaCheck className="mr-1" /> : <FaCopy className="mr-1" />}
                <span className="truncate">{id}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        {/* Video grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {participants.map((participant) => (
            <VideoPlayer
              key={participant.id}
              stream={participant.stream}
              userName={participant.name}
              isLocal={participant.isLocal}
              muted={participant.isLocal}
              audioEnabled={participant.audioEnabled}
            />
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <Controls
        isMicOn={isMicOn}
        toggleMic={toggleMic}
        isCameraOn={isCameraOn}
        toggleCamera={toggleCamera}
        isScreenSharing={isScreenSharing}
        toggleScreenShare={toggleScreenShare}
        leaveMeeting={leaveMeeting}
        toggleChat={() => setIsChatOpen(!isChatOpen)}
        toggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
        toggleRecording={toggleRecording}
        isRecording={isRecording}
      />
      
      {/* Chat panel */}
      <Chat
        messages={[]}
        sendMessage={() => {}}
        onClose={() => setIsChatOpen(false)}
        isOpen={isChatOpen}
      />
      
      {/* Participants panel */}
      <Participants
        participants={participants}
        onClose={() => setIsParticipantsOpen(false)}
        isOpen={isParticipantsOpen}
      />
    </div>
  );
}

export default RoomPage;
