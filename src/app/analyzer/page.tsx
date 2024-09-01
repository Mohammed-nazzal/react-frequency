// @ts-nocheck
"use client";
import React, { useEffect, useRef } from 'react';

function RealTimeFrequencyAnalyzer() {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;

    // Set analyzer parameters (e.g., frequency bin count)
    analyser.fftSize = 2048; // Adjust as needed

    // Start capturing audio input
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });

    // Update visualization in a loop
    const updateVisualization = () => {
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencyData);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw frequency spectrum
      const barWidth = canvas.width / frequencyData.length;
      const barHeightFactor = canvas.height / 256; // Adjust as needed
      for (let i = 0; i < frequencyData.length; i++) {
        const barHeight = frequencyData[i] * barHeightFactor;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
      }

      requestAnimationFrame(updateVisualization);
    };

    updateVisualization();

    return () => {
      audioContext.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', border: '1px solid blue' }}>
      <canvas color='red' ref={canvasRef} width="800" height="400" />
    </div>
  );
}

export default RealTimeFrequencyAnalyzer;
