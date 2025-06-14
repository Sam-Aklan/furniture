import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import type { ModelProps } from '../lib/types'
import { DissolveMaterial } from './shaders/DissolveMaterial'

type GLTFResult = GLTF & {
  nodes: {
    polySurface1_lambert15_0: THREE.Mesh
    polySurface1_lambert6_0: THREE.Mesh
    polySurface1_lambert9_0: THREE.Mesh
  }
  materials: {
    lambert15: THREE.MeshStandardMaterial
    lambert6: THREE.MeshStandardMaterial
    lambert9: THREE.MeshStandardMaterial
  }
}

export default function Table(props: React.JSX.IntrinsicElements['group'] & ModelProps) {
  const gltf = useGLTF('/model/office_table-01.glb') as unknown as GLTFResult
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
    <group {...props} scale={2} >
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface1_lambert15_0.geometry}
          // material={materials.lambert15}
        >
          <DissolveMaterial baseMaterial={materials.lambert15} visible={props.dissolveVisible} color='#0082b2' onFadeOut={()=>{}}/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface1_lambert6_0.geometry}
          // material={materials.lambert6}
        >
          <DissolveMaterial baseMaterial={materials.lambert6} visible={props.dissolveVisible} color='#0082b2' onFadeOut={()=>{}}/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface1_lambert9_0.geometry}
          // material={materials.lambert9}
        >
          <DissolveMaterial baseMaterial={materials.lambert9} visible={props.dissolveVisible} color='#0082b2' onFadeOut={()=>{}}/>
        </mesh>
      </group>
    </group>
  )
}

// useGLTF.preload('/model/office_table-01.glb')