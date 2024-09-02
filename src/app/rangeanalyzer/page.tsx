//@ts-nocheck
"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Filter from './components/filter';

import './page.css';

function App() {
//   const [osc1Settings, setOsc1Settings] = useState({
//     frequency: osc1.frequency.value,
//     detune: osc1.detune.value,
//     type: osc1.type,
//   });
const canvasRef = useRef<HTMLCanvasElement>(null);
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
    let actx = new AudioContext();
  
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
  analyser.fftSize = 2048; // Adjust as needed
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    audioContextRef.current = actx;

    analyserRef.current = analyser;

    // Set analyzer parameters (e.g., frequency bin count)
    analyser.fftSize = 8192; // Adjust as needed

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
      return ((Math.log10(f) - Math.log10(20))/ (Math.log10(20000) - Math.log10(20))) * (canvas.width - 30)
      // console.log(((Math.log10(f) - Math.log10(20))/ (Math.log10(20000) - Math.log10(20))) * canvas.width)
    }
    ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000000";
    ctx.moveTo(0, canvas.height - 10);
  ctx.lineTo((canvas.width - 30), canvas.height - 10);
  ctx.stroke();
    ctx.strokeStyle = 'red'
    for(let w of freqValues) {
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(w.toString(), position(w), canvas.height) 
    }
    const updateVisualization = () => {
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencyData);
      // Clear canvas
      ctx.clearRect(0, 0, (canvas.width - 30), (canvas.height - 10));

      // Draw frequency spectrum
      const barWidth = (canvas.width - 30) / frequencyData.length;
      const barHeightFactor = (canvas.height - 10) / 256; // Adjust as needed
      for (let i = 0; i < frequencyData.length; i++) {
        const barHeight = frequencyData[i] * barHeightFactor;
        
        ctx.fillStyle = 'rgb(' + (barHeight) + ',68,150)'
        ctx.fillRect(i * barWidth, (canvas.height - 10) - barHeight, barWidth, barHeight);
      }
     
      
      

      requestAnimationFrame(updateVisualization);
    };

    updateVisualization();

    return () => {
      actx.close();
    };
  }, [filterSettings1]);
//   const changeOsc1 = (e) => {
//     let { value, id } = e.target;
//     setOsc1Settings({ ...osc1Settings, [id]: value });
//     osc1[id].value = value;
//   };

//   const changeOsc1Type = (e) => {
//     let { id } = e.target;
//     setOsc1Settings({ ...osc1Settings, type: id });
//     osc1.type = id;
//   };

  const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, id } = e.target;
    setFilterSettings1({ ...filterSettings1, [id]: value });
  };


  const changeFilterType = (e:ChangeEvent<HTMLInputElement>) => {
    let { id } = e.target;
    setFilterSettings1({ ...filterSettings1, type: id as BiquadFilterType });
  };
  // const changeFilter2 = (e) => {
  //   let { value, id } = e.target;
  //   setFilterSettings2({ ...filterSettings2, [id]: value });
  //   filter2[id].value = value;
  // };

  // const changeFilterType2 = (e) => {
  //   let { id } = e.target;
  //   setFilterSettings2({ ...filterSettings2, type: id });
  //   filter2.type = id;
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
      <h1 className='center'>Frequency Analyzer</h1>
      {/* <div className='center'>
        <button onClick={() => osc1.start()}>start</button>
        <button onClick={() => osc1.stop()}>stop</button>
      </div> */}
      {/* <Osc1
        // change={changeOsc1}
        settings={osc1Settings}
        // changeType={changeOsc1Type}
      /> */}
      <Filter
        change={changeFilter}
        settings={filterSettings1}
        changeType={changeFilterType}
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width: '80%', alignSelf: 'center', borderTopLeftRadius: '3rem', borderTopRightRadius: '3rem', margin: '3rem' }}>
        <canvas color='red' ref={canvasRef} width="830" height="410" />
      </div>
      {/* <div>{filterSettings1.frequency}</div> */}
      {/* <Filter
        change={changeFilter2}
        settings={filterSettings2}
        changeType={changeFilterType2}
       
      /> */}
       {/* <div>{filterSettings2.frequency}</div> */}
    </div>
  );
}

export default App;