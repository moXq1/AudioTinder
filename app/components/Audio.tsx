"use client";

import { useEffect, useRef, useState } from "react";

interface AudioProps {
  audioUrl: string | null;
  record: () => void;
  stop: () => void;
  audioValidation: (audioUrl: string | null) => void;
}

function newAudioUrl(audio: Blob) {
  return URL.createObjectURL(audio);
}

export const Audio: React.FC<AudioProps> = ({
  audioUrl,
  record,
  stop,
  audioValidation,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    audioValidation(audioUrl);
  }, [audioUrl]);

  return (
    <div className="w-full ">
      {audioUrl && (
        <audio className="mx-auto my-3" src={audioUrl} controls></audio>
      )}
      <div className="flex gap-4 justify-center my-4  w-1/2 mx-auto">
        <button
          disabled={isRecording}
          className="bg-green-600 text-white rounded-lg px-4 py-2 mt-2 w-full
          enabled:hover:bg-green-800 transition-colors
          disabled:opacity-50 
          disabled:cursor-not-allowed"
          type="button"
          onClick={() => {
            setIsRecording(true);
            record();
          }}
        >
          Record
        </button>

        <button
          disabled={!isRecording}
          className="bg-red-600 text-white rounded-lg px-4 py-2 mt-2 w-full
          enabled:hover:bg-red-800 transition-colors
           disabled:opacity-50 
           disabled:cursor-not-allowed
           "
          type="button"
          onClick={() => {
            stop();
            setIsRecording(false);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};
