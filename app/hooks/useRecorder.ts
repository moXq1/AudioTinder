import { useState, useEffect, useRef } from "react";

function newAudioUrl(audio: Blob) {
  return URL.createObjectURL(audio);
}

export function useRecorder() {
  const [audio, setAudio] = useState<Blob | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audio) {
      setAudioUrl(newAudioUrl(audio));
    }
  }, [audio]);

  const record = async () => {
    setAudioUrl(null);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const options = { mimeType: "audio/webm" };
    const recordedChunks: BlobPart[] = [];

    recorder.current = new MediaRecorder(stream, options);

    recorder.current.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    });

    recorder.current.addEventListener("stop", () => {
      const blob = new Blob(recordedChunks);
      setAudio(blob);
      const file = new File([blob], "audiofile.webm", { type: "audio/webm" });
    });

    recorder.current.start();
  };

  const stop = () => {
    recorder.current?.stop();
    recorder.current = null;
  };

  return { audioUrl, record, stop, audioBlob: audio };
}
