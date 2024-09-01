// "use client";
// import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
// import Filter from './components/filter';

// import './page.css';



// function App() {
// //   const [osc1Settings, setOsc1Settings] = useState({
// //     frequency: osc1.frequency.value,
// //     detune: osc1.detune.value,
// //     type: osc1.type,
// //   });
//   let actx = new AudioContext();
  
//   let out = actx.destination;
  
//   let analyzer = actx.createAnalyser();
//   let gain1 = actx.createGain();
//   let filter = actx.createBiquadFilter();
  
//   analyzer.connect(gain1);
//   gain1.connect(filter);
//   filter.connect(out);
//   const canvasRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const ctx = canvas.getContext('2d');

// const audioContext = new AudioContext();
// audioContextRef.current = audioContext;

// const analyser = audioContext.createAnalyser();
// analyserRef.current = analyser;

// // Set analyzer parameters (e.g., frequency bin count)
// analyser.fftSize = 2048; // Adjust as needed
//   const [filterSettings1, setFilterSettings1] = useState({
//     frequency: filter.frequency.value,
//     // detune: filter.detune.value,
//     // Q: filter.Q.value,
//     // gain: filter.gain.value,
//     type: filter.type,
//   });
//   const [filterSettings2, setFilterSettings2] = useState({
//     frequency: filter.frequency.value,
//     // detune: filter.detune.value,
//     // Q: filter.Q.value,
//     // gain: filter.gain.value,
//     // type: filter.type,
//   });
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//     .then(stream => {
//       const source = actx.createMediaStreamSource(stream);
//       source.connect(osc1);
//     })
//     .catch(error => {
//       console.error('Error accessing microphone:', error);
//     });

//   },[])
// //   const changeOsc1 = (e) => {
// //     let { value, id } = e.target;
// //     setOsc1Settings({ ...osc1Settings, [id]: value });
// //     osc1[id].value = value;
// //   };

// //   const changeOsc1Type = (e) => {
// //     let { id } = e.target;
// //     setOsc1Settings({ ...osc1Settings, type: id });
// //     osc1.type = id;
// //   };

//   const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
//     let { value, id } = e.target;
//     setFilterSettings1({ ...filterSettings1, [id]: value });
//     filter[id].value = value;
//   };

//   const changeFilterType = (e:ChangeEvent<HTMLInputElement>) => {
//     let { id } = e.target;
//     setFilterSettings1({ ...filterSettings1, type: id as BiquadFilterType });
//     filter.type = id as BiquadFilterType;
//   };
//   // const changeFilter2 = (e) => {
//   //   let { value, id } = e.target;
//   //   setFilterSettings2({ ...filterSettings2, [id]: value });
//   //   filter2[id].value = value;
//   // };

//   // const changeFilterType2 = (e) => {
//   //   let { id } = e.target;
//   //   setFilterSettings2({ ...filterSettings2, type: id });
//   //   filter2.type = id;
//   // };

//   return (
//     <div className='App'>
//       <h1 className='center'>sliders</h1>
//       {/* <div className='center'>
//         <button onClick={() => osc1.start()}>start</button>
//         <button onClick={() => osc1.stop()}>stop</button>
//       </div> */}
//       {/* <Osc1
//         // change={changeOsc1}
//         settings={osc1Settings}
//         // changeType={changeOsc1Type}
//       /> */}
//       <Filter
//         change={changeFilter}
//         settings={filterSettings1}
//         changeType={changeFilterType}
//       />
//       {/* <div>{filterSettings1.frequency}</div> */}
//       {/* <Filter
//         change={changeFilter2}
//         settings={filterSettings2}
//         changeType={changeFilterType2}
       
//       /> */}
//        {/* <div>{filterSettings2.frequency}</div> */}
//     </div>
//   );
// }

// export default App;