// import { AudioManager } from "./components/AudioManager";
// import Transcript from "./components/Transcript";
// import { useTranscriber } from "./hooks/useTranscriber";
// import Summarizer from "./components/summarizer";

// function App() {
//     const transcriber = useTranscriber();

//     return (
//         <div className='flex justify-center items-center min-h-screen'>
//             <div className='container flex flex-col justify-center items-center'>
//                 <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
//                     Video Summarizer
//                 </h1>
//                 <h2 className='mt-3 mb-5 px-4 text-center text-1xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>
//                     Paste Your Link
//                 </h2>
//                 <AudioManager transcriber={transcriber} />
//                 <Transcript transcribedData={transcriber.output}  />
//                 {/* <Transcript transcribedData={transcriber.output} /> */}
//                 console.log('Transcriber Output:', transcriber.output);
//                 <Summarizer transcribedData={transcriber.output || ""} />
//                 console.log('Transcriber Output:', transcriber.output);

//             </div>

            
//         </div>
//     );
// }

// export default App;
import { AudioManager } from "./components/AudioManager";
import Transcript from "./components/Transcript";
import { useTranscriber } from "./hooks/useTranscriber";

function App() {
  const transcriber = useTranscriber();

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='container flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
          Video Summarizer
        </h1>
        <h2 className='mt-3 mb-5 px-4 text-center text-1xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>
          Paste the Meeting Link
        </h2>
        <AudioManager transcriber={transcriber} />
        <Transcript transcribedData={transcriber.output} />
      </div>
    </div>
  );
}

export default App;
