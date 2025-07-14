'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PatrimoScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(0, 0, 15)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(300, 300)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))

    const directionalLight = new THREE.DirectionalLight(0xd4af37, 0.7)
    directionalLight.position.set(4, 4, 10)
    scene.add(directionalLight)

    const geometry = new THREE.DodecahedronGeometry(2.5, 2)
    geometry.computeVertexNormals()

    const jadeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#00895e'),
      metalness: 0.3,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      reflectivity: 0.6,
      emissive: new THREE.Color('#005f43'),
      emissiveIntensity: 0.05,
    })

    const crystal = new THREE.Mesh(geometry, jadeMaterial)
    scene.add(crystal)

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: 0xd4af37,
        linewidth: 1,
        transparent: true,
        opacity: 0.25,
      })
    )
    crystal.add(wireframe)

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.06,
      })
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -2.7
    scene.add(shadow)

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      crystal.rotation.y = t * 0.3 + mouse.x * 0.2
      crystal.rotation.x = Math.sin(t * 0.15) * 0.2 + mouse.y * 0.2
      crystal.position.y = Math.sin(t * 0.9) * 0.12

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <>
      <div
        ref={mountRef}
        style={{
          position: 'fixed',
          bottom: '7rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 300,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0,
          animation: 'fadeInPatrimo 1.8s ease-out forwards',
        }}
      />
      <style jsx global>{`
        @keyframes fadeInPatrimo {
          from {
            opacity: 0;
            transform: scale(0.92) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: scale(1) translateX(-50%);
          }
        }
      `}</style>
    </>
  )
}

export default PatrimoScene
