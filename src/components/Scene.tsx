import {useEffect } from 'react';
import { OrbitControls, PerspectiveCamera,} from '@react-three/drei'
import ThreeDModels from './ThreeDModels';
// import { Table } from './Table';
// import { Sofa } from './Sofa';
// import { Chair } from './Chair';

const Scene=()=>{
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const handleContextLost = (e: Event) => {
      console.warn('WebGL context lost', e);
      e.preventDefault();
    };
    canvas?.addEventListener('webglcontextlost', handleContextLost, false);
    return () => {
      canvas?.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, []);
  return (
    <>
     <PerspectiveCamera
  makeDefault
  fov={70} 
  near={0.1}
  far={1000}
  position={[20, 15, 30]} 
  
/>
      <OrbitControls target={[0, 0, 0]} enableZoom={false}/>
      
      <ambientLight intensity={0.2} />
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
      <ThreeDModels/>
      {/* <Sofa dissolveVisible={true}  onFadeOut={()=>{}} color='#f5cba7'/> */}
      {/* <Table dissolveVisible={true}  onFadeOut={()=>{}} color='#f5cba7'/> */}
      
   
    </>
  )
}

export default Scene
