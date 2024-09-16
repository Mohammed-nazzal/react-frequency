//@ts-nocheck
"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Filter from './components/filter';

import './page.css';
import PitchFinder from 'pitchfinder';
function App() {
//   const [osc1Settings, setOsc1Settings] = useState({
//     frequency: osc1.frequency.value,
//     detune: osc1.detune.value,
//     type: osc1.type,
//   });
const canvasRef = useRef<HTMLCanvasElement>(null);
const canvasRef2 = useRef<HTMLCanvasElement>(null);
const audioContextRef = useRef(null);
const analyserRef = useRef(null);
  const [filterSettings1, setFilterSettings1] = useState({
    frequency: 1000,
    // detune: filter.detune.value,
    Q: 0.5,
    // gain: filter.gain.value,
    type: 'lowpass',
  });

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //   .then(stream => {
  //     const source = actx.createMediaStreamSource(stream);
  //     source.connect(analyser);
  //   })
  //   .catch(error => {
  //     console.error('Error accessing microphone:', error);
  //   });

  // },[])
  useEffect(() => {
    let actx = new AudioContext({sampleRate: 44100});
  
  let out = actx.destination;
  
  let analyser = actx.createAnalyser();
  let gain1 = actx.createGain();
  let filter = actx.createBiquadFilter();
  filter.type = filterSettings1.type;
  filter.frequency.value = filterSettings1.frequency;
  filter.Q.value = filterSettings1.Q;
  filter.connect(analyser);
  analyser.connect(actx.destination);
  

  audioContextRef.current = actx;
  
  analyserRef.current = analyser;
  
  // Set analyzer parameters (e.g., frequency bin count)
  analyser.fftSize = 4096; // Adjust as needed
  analyser.minDecibels = -96; // Adjust as needed
  analyser.maxDecibels = -0; // Adjust as needed
  analyser.smoothingTimeConstant = 0.8
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const canvas2 = canvasRef2.current as HTMLCanvasElement;
    const ctx2 = canvas2.getContext('2d');

    audioContextRef.current = actx;

    analyserRef.current = analyser;

    // Set analyzer parameters (e.g., frequency bin count)

    // Start capturing audio input
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = actx.createMediaStreamSource(stream);
        source.connect(filter);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });

    // Update visualization in a loop
    const freqValues = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
    const position = (f: number) => {
      return ((Math.log10(f) - Math.log10(20))/ (Math.log10(20000) - Math.log10(20))) * (canvas.width)
      // console.log(((Math.log10(f) - Math.log10(20))/ (Math.log10(20000) - Math.log10(20))) * canvas.width)
    }
    ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
    ctx.moveTo(0, 0);
  ctx.lineTo((canvas.width), canvas.height);
  ctx.stroke();
    ctx.strokeStyle = 'red'
    for(let w of freqValues) {
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(w.toString(), position(w), canvas.height) 
    }
    const frequencyToXAxis =(frequency) => {
      const minF = Math.log(20) / Math.log(10)
      const maxF = Math.log(20000) / Math.log(10)
      
      let range = maxF - minF
      let xAxis = (Math.log(frequency) / Math.log(10) - minF) / range  
       * canvas.width
      return xAxis
    }
    const updateVisualization = () => {
      const frequencyData = new Float32Array(analyser.frequencyBinCount);
      const pitchFinder = PitchFinder.YIN({
        sampleRate: 44100,
      })
      const currentFrequency = pitchFinder(frequencyData)

      analyser.getFloatFrequencyData(frequencyData);
      // Clear canvas
      ctx.clearRect(0, 0, (canvas.width), (canvas.height));

      // Draw frequency spectrum
      // const barWidth = (canvas.width - 30) / frequencyData.length;
      // const barHeightFactor = (canvas.height - 10) / 256; // Adjust as needed
      for (let i = 0; i < analyser.frequencyBinCount; i++) {
        let frequency = Math.round(i * 44100 / 2 / 
          analyser.frequencyBinCount)
       //need to convert db Value because it is -120 to 0
       let barHeight = (frequencyData[i] / 2 + 70) * 10
       let barWidth = (canvas.width) / analyser.frequencyBinCount * 2.5
       let x = frequencyToXAxis(frequency)
       let h = (canvas.height) - barHeight / 2
       ctx.fillStyle = 'rgb(' + (barHeight + 200) + ',100,100)'
        if (h >= 0) {
          ctx.fillRect(x, h, barWidth, barHeight);
         }
      }
      requestAnimationFrame(updateVisualization);
    };
    ctx2.beginPath();
      ctx2.lineWidth = 1;
      ctx2.strokeStyle = "#000000";
        ctx2.moveTo(0, canvas2.height - 10);
      ctx2.lineTo((canvas2.width), canvas2.height - 10);
      ctx2.stroke();
      for(let w of freqValues) {
       ctx2.font = '10px Arial';
       ctx2.textAlign = 'start';
       ctx2.fillText(w.toString(), position(w), canvas2.height) 
     }
    updateVisualization();
    return () => {
      actx.close();
    };
  }, [filterSettings1]);

  const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, id } = e.target;
    setFilterSettings1({ ...filterSettings1, [id]: value });
  };


  const changeFilterType = (e:ChangeEvent<HTMLInputElement>) => {
    let { id } = e.target;
    setFilterSettings1({ ...filterSettings1, type: id as BiquadFilterType });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
      <h1 className='center'>Frequency Analyzer</h1>
      <Filter
        change={changeFilter}
        settings={filterSettings1}
        changeType={changeFilterType}
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width: '80%', alignSelf: 'center', borderTopLeftRadius: '3rem', borderTopRightRadius: '3rem', margin: '3rem', flexDirection: 'column' }}>
        <canvas style={{ overflow: 'visible' }} color='red' ref={canvasRef} width="995" height="445" />
        <canvas style={{ overflow: 'visible' }} color='red' ref={canvasRef2} width="995" height="20" />
      </div>
    </div>
  );
}

export default App;