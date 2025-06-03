import React, { useState } from 'react';

const HomePage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [moved, setMoved] = useState(false);

  const handleClick = (form) => {
    if (!moved) {
      setMoved(true);
    }
    setActiveForm(form);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">

      {!moved ? (
        <div className="flex gap-8 transition-all duration-700">
          <button
            onClick={() => handleClick('create')}
            className="bg-blue-500 text-white py-4 px-8 text-xl rounded hover:bg-blue-600 transition"
          >
            Create Room
          </button>
          <button
            onClick={() => handleClick('join')}
            className="bg-green-500 text-white py-4 px-8 text-xl rounded hover:bg-green-600 transition"
          >
            Join Room
          </button>
        </div> 
      ) : (
        <div className="flex w-full h-full transition-all duration-700 ease-in-out">
          <div className="w-1/2 flex flex-col items-center justify-center gap-8 bg-white border-r shadow-md">
            <button
              onClick={() => handleClick('create')}
              className={`py-4 px-8 text-xl rounded text-white transition-all duration-500 ${
                activeForm === 'create' ? 'bg-blue-500' : 'bg-gray-400 hover:bg-blue-400'
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => handleClick('join')}
              className={`py-4 px-8 text-xl rounded text-white transition-all duration-500 ${
                activeForm === 'join' ? 'bg-green-500' : 'bg-gray-400 hover:bg-green-400'
              }`}
            >
              Join Room
            </button>
          </div>

          <div className="w-1/2 flex items-center justify-center bg-gray-50">
            {activeForm === 'create' ? (
              <form className="w-3/4 max-w-md bg-white p-6 rounded shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center">Create Room</h2>
                <input
                  type="text"
                  placeholder="Room Name"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </form>
            ) : (
              <form className="w-3/4 max-w-md bg-white p-6 rounded shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center">Join Room</h2>
                <input
                  type="text"
                  placeholder="Room Code"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
