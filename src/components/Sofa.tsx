import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import type { ModelProps } from '../lib/types'
import { DissolveMaterial } from './shaders/DissolveMaterial'

type GLTFResult = GLTF & {
  nodes: {
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
  }
  materials: {
    L002_d1: THREE.MeshStandardMaterial
    lambert61: THREE.MeshStandardMaterial
  }
}

export default function Sofa(props: React.JSX.IntrinsicElements['group'] &ModelProps) {
  const gltf= useGLTF('/model/long_black_sofa.glb') as unknown as GLTFResult
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
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, Math.PI * (3/2), 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            // material={materials.L002_d1}
          >
            <DissolveMaterial baseMaterial={materials.L002_d1} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.lambert61}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.lambert61}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.L002_d1}
          />
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload('/model/long_black_sofa.glb')
