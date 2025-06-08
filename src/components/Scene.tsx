import { Model } from './Model'
import { OrbitControls, PerspectiveCamera,} from '@react-three/drei'
import { extend} from '@react-three/fiber';
import { NoiseShader } from './shaders/NoiseShader'
import { useEffect, useRef } from 'react';
extend({NoiseShader})




const Scene = () => {
  const meshRef = useRef<any>(null)
  const noise = new NoiseShader()
  useEffect(()=>{
    
  },[])
  return (
    <>
     <PerspectiveCamera
  makeDefault
  fov={70} 
  near={0.1}
  far={1000}
  position={[20, 15, 30]} 
/>
      <OrbitControls target={[0, 5, 0]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        intensity={1}
        position={[10, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <pointLight intensity={0.3} position={[-10, -10, -10]} />
      <Model />
     
    </>
  )
}

export default Scene
