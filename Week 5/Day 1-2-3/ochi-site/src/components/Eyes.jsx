import React, { useEffect, useState } from "react";

const Eyes = () => {
  const [rotate, setRotate] = useState(0); // [angle in degrees, setAngle function]

  // when the mouse moves, the eyes should follow the mouse pointer

  // when the whole page is loaded, following code will be executed

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      let angle = Math.atan2(deltaY, deltaX);

      // in degrees

      let angleDeg = (angle * 180) / Math.PI;
      setRotate(angleDeg - 180);
    });
  });

  return (
    <div className="w-full h-screen eyes overflow-hidden ">
      <div className='relative w-full h-full bg-cover bg-center bg-no-repeat bg-[url("https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg")] '>
        <div className="absolute -translate-x-[50%] -translate-y-[50%] top-1/2 left-1/2 flex gap-10">
          <div className="w-[15vw] h-[15vw] flex justify-center items-center bg-zinc-100 rounded-full">
            <div className="w-2/3 h-2/3 relative bg-black rounded-full">
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                }}
                className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10"
              >
                <div className="eye-ball w-7 h-7 bg-zinc-100 rounded-full ml-[26px]"></div>
              </div>
            </div>
          </div>
          <div className="w-[15vw] h-[15vw] flex justify-center items-center bg-zinc-100 rounded-full">
            <div className="w-2/3 h-2/3 relative bg-black rounded-full">
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                }}
                className={` line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10`}
              >
                <div className="eye-ball w-7 h-7 bg-zinc-100 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eyes;
