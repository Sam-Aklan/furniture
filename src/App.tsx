
import { Canvas } from '@react-three/fiber'
import './App.css'
import Archive from './components/Archive'
import Intro from './components/Intro'
import Outro from './components/Outro'
import Scene from './components/Scene'
import { Suspense } from 'react'

function App() {
 

  return (
    <>
    <nav className='fixed top-0 left-0 w-screen xl:w-screen xl:max-w-[1440px] p-8 flex justify-center items-center'>
      <p>oak<span>atelier</span></p>
      <a href="#" className='uppercase'>contactus</a>
    </nav>
    <div className="model h-screen fixed z-2 m-0 top-0 left-1/2">
      <Suspense fallback={'loading....'}>

      <Canvas
      >
        <Scene/>
      </Canvas>
        </Suspense>
    </div>
    <Intro/>
    <Archive/>
    <Outro/>
    </>
  )
}

export default App
