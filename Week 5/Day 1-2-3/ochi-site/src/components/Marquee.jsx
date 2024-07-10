import { motion } from 'framer-motion'
import React from 'react'

const Marquee = () => {
  return (
    <div className='w-full py-10 rounded-tl-3xl rounded-tr-3xl bg-[#004D43]'>
        <div className='text border-t-2 border-b-2 gap-16 overflow-hidden border-zinc-300 flex whitespace-nowrap'>
        <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 5}} className='text-[22vw] leading-none font-semibold uppercase -mt-10'>we are ochi</motion.h1>
        <motion.h1 initial={{x: 0}} animate={{x: "-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 5}} className='text-[22vw] leading-none font-semibold uppercase -mt-10'>we are ochi</motion.h1>
        </div>
      
    </div>
  )
}

export default Marquee
