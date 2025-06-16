import * as THREE from "three";
import React, { use, useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { type GLTF } from "three-stdlib";
import { DissolveMaterial } from "./shaders/DissolveMaterial";
import type { ModelProps } from "../lib/types";
import { lerpEuler } from "../lib/utils";
import ScrollContext from "../lib/ScrollContext";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_12: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    material_0: THREE.MeshStandardMaterial;
  };
};

const keyFrames = [
    new THREE.Euler(0, Math.PI, 0),
      new THREE.Euler(0, Math.PI/2, 0),
      new THREE.Euler(0 , -Math.PI/2, 0),
]

export default function Sofa(props: React.JSX.IntrinsicElements["group"] &ModelProps) {
  const gltf = useGLTF("/model/sofa_chair.glb") as unknown as GLTFResult;
  const { nodes, materials } = gltf;
  const mat01 = useMemo(()=>materials['Material.001'].clone(),[])
  const mat02 = useMemo(()=> materials['Material.002'].clone(),[])
  const mat = useMemo(()=>materials.material_0.clone(),[])

  const sofaRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
  const {scrollProgress} = use(ScrollContext)
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
      mat01.dispose()
      mat02.dispose()
      mat.dispose()
    };
  }, [gltf]);

  useFrame(()=>{
    if(!scrollProgress) return
    const totalSteps = keyFrames.length - 1
const currentStep = Math.floor((scrollProgress.get()/1) * totalSteps)
const nextStep = Math.min(currentStep + 1, totalSteps)

const localT = ((scrollProgress.get()/1) * totalSteps) % 1

const current = keyFrames[currentStep]
const next = keyFrames[nextStep]

const  interpolated = lerpEuler(current,next,localT)

if ( sofaRef.current) {
  sofaRef.current.rotation.copy(interpolated)
    // console.log("modelRef", modelRef.current)
    
}

})
  return (
    <group {...props} scale={10} ref={sofaRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        // material={materials["Material.001"]}
        scale={[0.944, 1, 1]}
      >
        <DissolveMaterial baseMaterial={mat01} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        // material={materials["Material.001"]}
        scale={[0.934, 0.99, 0.99]}
      >
        <DissolveMaterial baseMaterial={mat01} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        // material={materials["Material.001"]}
        position={[0, 0.229, 0.039]}
        scale={[0.863, 1.02, 0.914]}
      >
        <DissolveMaterial baseMaterial={mat01} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        // material={materials["Material.002"]}
        position={[0, 0.017, 0]}
      >
        <DissolveMaterial baseMaterial={mat02} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        // material={materials.material_0}
        position={[0.006, 0.678, -0.478]}
        rotation={[1.24, -0.013, -0.104]}
        scale={[0.4, 0.294, 0.354]}
      >
        <DissolveMaterial baseMaterial={mat} visible={props.dissolveVisible} color='#f5cba7' onFadeOut={()=>{}}/>
      </mesh>
    </group>
  );
}

// useGLTF.preload('/sofa_chair.glb')
