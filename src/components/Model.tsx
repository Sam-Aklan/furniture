import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh
  }
  materials: {
    place_holder: THREE.MeshStandardMaterial
  }
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
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
                if(Array.isArray(material)) material.forEach(m=>m.dispose)
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
        material={materials.place_holder}
        rotation={[0 , 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/model/black_chair.glb')
