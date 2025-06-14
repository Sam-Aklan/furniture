"use client"
import { MotionValue } from 'framer-motion';
import React from 'react';
const ScrollContext = React.createContext<{scrollProgress:MotionValue<number>|null}>({scrollProgress:null})
export default ScrollContext;