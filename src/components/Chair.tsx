import * as THREE from 'three'
import React, { useEffect } from 'react'
import {  useGLTF} from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import { DissolveMaterial } from './shaders/DissolveMaterial'
import type { ModelProps } from '../lib/types'

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh
  }
  materials: {
    place_holder: THREE.MeshStandardMaterial
  }
}

export default function Chair(props: React.JSX.IntrinsicElements['group'] &ModelProps) {
  
  const gltf = useGLTF('/model/black_chair.glb') as unknown as GLTFResult
  const {nodes,materials,} = gltf
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
    }
  },[gltf])
  return (
    
    <group {...props} position={[0,0,0]} scale={12}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        rotation={[0 , 0, 0]}
      >
        <DissolveMaterial baseMaterial={materials.place_holder} visible={props.dissolveVisible} onFadeOut={props.onFadeOut}
        color={props.color}/>
      </mesh>
    </group>
   
  )
}

// useGLTF.preload('/model/black_chair.glb')
