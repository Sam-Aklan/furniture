"use client"

import { MotionValue } from "framer-motion"
import React, { useState } from "react"
import ScrollContext from "./ScrollContext"

const ScrollProvider = ({children,scrollProgress}:{
    children:React.ReactNode,
    scrollProgress:MotionValue<number>|null
}) => {
    const [scroll] = useState(scrollProgress)
  return (
    
    <ScrollContext.Provider value={{scrollProgress:scroll}}>
        {children}
    </ScrollContext.Provider>
  )
}

export default ScrollProvider