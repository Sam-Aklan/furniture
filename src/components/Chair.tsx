import * as THREE from 'three'
import React, { use, useEffect, useMemo, useRef } from 'react'
import {  useGLTF} from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { DissolveMaterial } from './shaders/DissolveMaterial'
import type { ModelProps } from '../lib/types'
import ScrollContext from '../lib/ScrollContext'
import { lerpEuler } from '../lib/utils'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh
  }
  materials: {
    place_holder: THREE.MeshStandardMaterial
  }
}

const keyFrames = [
  new THREE.Euler(0, Math.PI/12, 0),
        new THREE.Euler(0, Math.PI/2, 0),
        new THREE.Euler(0 , -Math.PI/2, 0),
]

export default function Chair(props: React.JSX.IntrinsicElements['group'] &ModelProps) {
  
  const gltf = useGLTF('/model/black_chair.glb') as unknown as GLTFResult
  const {nodes,materials,} = gltf
  const clonedMaterial = useMemo(()=>materials.place_holder.clone(),[])
  const chairRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
    const {scrollProgress} = use(ScrollContext)
  useEffect(()=>{

    return ()=>{
        gltf.scene.traverse(child=>{
            if ((child as THREE.Mesh).geometry) {
                (child as THREE.Mesh).geometry.dispose()
            }
            if ((child as THREE.Mesh).material) {
                const material =  (child as THREE.Mesh).material
                if(Array.isArray(material)) material.forEach(m=>(m.dispose))
                else material.dispose()
            }
        })
        clonedMaterial.dispose()
    }
  },[gltf])
  useFrame(()=>{
    if(!scrollProgress) return
    const totalSteps = keyFrames.length - 1
const currentStep = Math.floor((scrollProgress.get()/1) * totalSteps)
const nextStep = Math.min(currentStep + 1, totalSteps)

const localT = ((scrollProgress.get()/1) * totalSteps) % 1

const current = keyFrames[currentStep]
const next = keyFrames[nextStep]

const  interpolated = lerpEuler(current,next,localT)

if ( chairRef.current) {
  chairRef.current.rotation.copy(interpolated)
    // console.log("modelRef", modelRef.current)
    
}

})
  return (
    
    <group {...props} position={[0,0,0]} scale={10} ref={chairRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        rotation={[0 , 0, 0]}
      >
        <DissolveMaterial baseMaterial={clonedMaterial} visible={props.dissolveVisible} onFadeOut={props.onFadeOut}
        color={props.color}/>
      </mesh>
    </group>
   
  )
}

// useGLTF.preload('/model/black_chair.glb')
