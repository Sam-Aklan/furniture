import * as THREE from 'three'
import React, { use, useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import type { ModelProps } from '../lib/types'
import { DissolveMaterial } from './shaders/DissolveMaterial'
import { useFrame } from '@react-three/fiber'
import ScrollContext from '../lib/ScrollContext'
import { lerpEuler } from '../lib/utils'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    material_0: THREE.MeshStandardMaterial
  }
}

const keyFrames = [
new THREE.Euler(0, 0, 0),
  new THREE.Euler(Math.PI / 15, 0, 0),
  new THREE.Euler(Math.PI/4 , Math.PI, 0),
]

export default function Table(props: React.JSX.IntrinsicElements['group']&ModelProps) {
  const gltf = useGLTF('/model/gaming_desk.glb') as unknown as GLTFResult
  const {nodes, materials} = gltf
  const mat= useMemo(()=>materials.material_0.clone(),[])
  const {scrollProgress}= use(ScrollContext)
  const tableRef = useRef<THREE.Group<THREE.Object3DEventMap> >(null)
  useEffect(() => {
      return () => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).geometry) {
            (child as THREE.Mesh).geometry.dispose();
          }
          if ((child as THREE.Mesh).material) {
            const material = (child as THREE.Mesh).material;
            if (Array.isArray(material)) material.forEach((m) => m.dispose);
            else material.dispose();
          }
        });
       mat.dispose()
      };
    }, [gltf]);

    useFrame(()=>{
        if(!scrollProgress) return
        const totalSteps = keyFrames.length - 1
    const currentStep = Math.floor((scrollProgress.get()/0.66) * totalSteps)
    const nextStep = Math.min(currentStep + 1, totalSteps)

    const localT = ((scrollProgress.get()/0.66) * totalSteps) % 1

    const current = keyFrames[currentStep]
    const next = keyFrames[nextStep]

    const  interpolated = lerpEuler(current,next,localT)
    
    if ( tableRef.current) {
      tableRef.current.rotation.copy(interpolated)
        // console.log("modelRef", modelRef.current)
        
    }

    })
  return (
    <group {...props} scale={10} rotation={[Math.PI/15,Math.PI/2,0]} ref={tableRef} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        // material={materials.material_0}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.012}
      >
        <DissolveMaterial baseMaterial={mat} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
      </mesh>
    </group>
  )
}

// useGLTF.preload('/gaming_desk.glb')