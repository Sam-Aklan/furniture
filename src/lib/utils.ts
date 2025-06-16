import * as THREE from 'three'

const lerpEuler = (v1: THREE.Euler, v2: THREE.Euler, t: number): THREE.Euler => {
    const q1 = new THREE.Quaternion().setFromEuler(v1)
    const q2 = new THREE.Quaternion().setFromEuler(v2)
    const qInterpolated = new THREE.Quaternion().slerpQuaternions(q1, q2, t)
    return new THREE.Euler().setFromQuaternion(qInterpolated)
  }

  export {lerpEuler}