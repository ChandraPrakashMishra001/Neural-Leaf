"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export function ThreeGlassText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // 1. Scene Setup
    const scene = new THREE.Scene()
    // We use a small FOV for orthographic-like flat text rendering
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 20

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // 2. Lights for reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xffffff, 2)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // 3. MatCap Texture for Chrome/Glass reflection
    // We generate a procedural MatCap or use a standard sphere reflection texture
    // Here we'll use a high-gloss MeshPhysicalMaterial to simulate pure glass/chrome
    // since we don't have an external MatCap texture loaded locally.
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.1,
      transmission: 0.9, // glass like
      ior: 1.5,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    // 4. Load Font and Create Text
    const loader = new FontLoader()
    let textMesh: THREE.Mesh | null = null

    // Fallback: Using a standard three.js hosted font for demonstration
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 2,
        depth: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      })

      // Center the geometry
      geometry.computeBoundingBox()
      const xOffset = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x)
      const yOffset = -0.5 * (geometry.boundingBox!.max.y - geometry.boundingBox!.min.y)
      geometry.translate(xOffset, yOffset, 0)

      textMesh = new THREE.Mesh(geometry, material)
      scene.add(textMesh)
    })

    // 5. Mouse Interaction for smooth liquid/glass rotation
    const mouse = new THREE.Vector2()
    const targetRotation = new THREE.Vector2()
    const windowHalf = new THREE.Vector2(container.clientWidth / 2, container.clientHeight / 2)

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x)
      mouse.y = (event.clientY - windowHalf.y)
      targetRotation.x = mouse.y * 0.001
      targetRotation.y = mouse.x * 0.001
    }

    document.addEventListener('mousemove', onMouseMove, false)

    // 6. Handle Resize
    const onWindowResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
      windowHalf.set(container.clientWidth / 2, container.clientHeight / 2)
    }
    window.addEventListener("resize", onWindowResize)

    // 7. Animation Loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (textMesh) {
        // Smooth interpolation for liquid, heavy glass feel
        textMesh.rotation.x += (targetRotation.x - textMesh.rotation.x) * 0.05
        textMesh.rotation.y += (targetRotation.y - textMesh.rotation.y) * 0.05
      }

      renderer.render(scene, camera)
    }
    animate()

    // 8. Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener("resize", onWindowResize)
      cancelAnimationFrame(animationId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      if (textMesh) {
        scene.remove(textMesh)
        textMesh.geometry.dispose()
      }
    }
  }, [text])

  return (
    <div
      ref={containerRef}
      className="w-full h-40 md:h-64 cursor-default relative z-20"
      style={{ touchAction: 'none' }}
    />
  )
}
