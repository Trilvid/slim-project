import React, { useRef, useState } from 'react';

function Capture() {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImageSrc(dataUrl);
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '400px' }} />
      {imageSrc && <img src={imageSrc} alt="Captured" style={{ maxWidth: '400px' }} />}
    </div>
  );
}

export default Capture;
