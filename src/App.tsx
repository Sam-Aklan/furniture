
import { Canvas } from '@react-three/fiber'
import './App.css'
import Archive from './components/Archive'
import Intro from './components/Intro'
import Outro from './components/Outro'
import Scene from './components/Scene'
import { Suspense, useEffect, useRef } from 'react'
import ReactLenis, { type LenisRef } from 'lenis/react'
import { cancelFrame, frame, useMotionValueEvent, useScroll } from 'framer-motion'
import ScrollProvider from './lib/ScrollProvider'

function App() {
  const {scrollYProgress} = useScroll()

  useMotionValueEvent(scrollYProgress, 'change',latest=> console.log("scroll value", latest))
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])
  

  return (
    <ReactLenis ref={lenisRef} root options={{lerp:.1,duration:1.5, smoothWheel:true, autoRaf:false}}>


      <nav className='fixed top-0 left-0 w-screen xl:w-screen xl:max-w-[1440px] p-8 flex justify-between items-center'>
        <p>oak<span>atelier</span></p>
        <a href="#" className='uppercase text-white no-underline'>contactus</a>
      </nav>
      <div className="model h-screen fixed z-2 m-0 top-0 left-1/4 w-full">
      <ScrollProvider scrollProgress={scrollYProgress}>

        <Suspense fallback={'loading....'}>
  
        <Canvas
        >
          <Scene/>
        </Canvas>
          </Suspense>
      </ScrollProvider>
      </div>
      <Intro/>
      <Archive/>
      <Outro/>
    </ReactLenis>
    
  )
}

export default App
