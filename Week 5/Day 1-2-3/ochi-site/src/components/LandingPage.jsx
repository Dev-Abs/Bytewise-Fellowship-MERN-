import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { FaLongArrowAltUp } from "react-icons/fa";
function LandingPage() {
  return (
    <div className="w-full h-screen bg-zinc-900 pt-1">
      <div className="textstructure mt-52 px-20">
        {["We Create", "Eye opening", "presentations"].map((text, index) => {
          return (
            <div className="masker" key={index}>
                <div className="w-fit flex items-center">
                {index === 1 && ( <div className="mr-[1vw] rounded-md w-[6.5vw] h-[4.5vw] bg-red-500 relative top-[0.4vw]" ></div>)}
              <h1 className="flex items-center uppercase text-[6.5vw] leading-[5.5vw] tracking-tighter font-medium">
                {text}
              </h1>
              </div>
            </div>
          );
        })}

        {/* <div className='masker'>
                <h1 className='uppercase text-9xl leading-[5.5vw] tracking-tighter font-medium'>We Create</h1>
            </div>
            <div className='masker'>
                <h1 className='uppercase text-9xl leading-[5.5vw] tracking-tighter font-medium'>Eye opening</h1>
            </div>
            <div className='masker'>
                <h1 className='uppercase text-9xl leading-[5.5vw] tracking-tighter font-medium'>presentations</h1>
            </div> */}
      </div>

      <div className="border-t-2 border-zinc-800 mt-20 flex justify-between items-center py-5 px-20">
        {[
          "For public and private companies",
          "From the first pitch to IPO",
        ].map((text, index) => {
          return (
            <p
              className="text-md font-light tracking-tight leading-none"
              key={index}
            >
              {text}
            </p>
          );
        })}
        <div className="start flex items-center gap-5">
          <div className="px-5 py-2 uppercase border-[1px] border-zinc-400 rounded-full font-light text-md">
            start the project
          </div>
          <div className="w-10 h-10 flex items-center justify-center border-[1px] cursor-pointer border-zinc-400 rounded-full">
            <span className="rotate-[45deg]"><FaLongArrowAltUp /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
