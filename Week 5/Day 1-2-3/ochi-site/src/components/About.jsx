import React from "react";

function About() {
  return (
    <div className="w-full p-20 bg-[#cdea68] rounded-tl-3xl rounded-tr-3xl text-black">
      <h1 className="text-[4vw] leading-[4.5vw] tracking-tight">
        Ochi is a strategic partner for fast-growing tech businesses that need
        to raise funds, sell products, explain complex ideas, and hire great
        people.
      </h1>
      <div className="border-t-2 border-[#7d903c] mt-20"></div>

      <div className="flex justify-between gap-16 mt-8">
        {/* {[
        "What you can expect:",
        "We create tailored presentations to help you persuade your colleagues, clients, or investors. Whether it’s live or digital, delivered for one or a hundred people.     We believe the mix of strategy and design (with a bit of coffee) is what makes your message clear, convincing, and captivating.",
        "S: Instagram Behance Facebook Linkedin",
      ].map((text, index) => {
        return (
          <p key={index}>
            {text}
          </p>
        );
      })} */}
        <h2 className="whitespace-nowrap">What you can expect:</h2>
        <p className="flex flex-col gap-6 ml-[24vw] w-[20vw]">
          <div>
            We create tailored presentations to help you persuade your
            colleagues, clients, or investors. Whether it's live or digital,
            delivered for one or a hundred people.
          </div>
          <div>
            We believe the mix of strategy and design (with a bit of coffee) is
            what makes your message clear, convincing, and captivating.
          </div>
        </p>

        <div className="flex flex-col gap-2 mt-[8vw]">
          <h1 className="mb-4">S:</h1>
          <a className="underline" href="">
            Instagram
          </a>
          <a className="underline" href="">
            Behance
          </a>
          <a className="underline" href="">
            Facebook
          </a>
          <a className="underline" href="">
            Linkedin
          </a>
        </div>
      </div>

      <div className="border-t-2 border-[#7d903c] pt-10 mt-20 flex gap-5">

      <div className="w-1/2">
        <h1>Our approach: </h1>
        <button className="px-10 py-4 uppercase flex gap-10 items-center mt-5 bg-zinc-900 rounded-full text-white">Read More
            <div className="w-2 h-2 rounded-full bg-white"></div>
        </button>
      </div>

      <img className="w-1/2 h-[70vh] rounded-3xl" src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg" alt="" srcset="" />

      </div>
    </div>
  );
}

export default About;
