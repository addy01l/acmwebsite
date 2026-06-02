'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeMascot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let coreGeometry: THREE.IcosahedronGeometry | null = null;
    let coreMaterial: THREE.MeshPhongMaterial | null = null;
    let outerGeometry: THREE.IcosahedronGeometry | null = null;
    let outerMaterial: THREE.MeshPhongMaterial | null = null;
    let animationFrameId: number;

    try {
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      // Create scene & camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      // Create WebGL renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      container.appendChild(renderer.domElement);

      // Group to hold the spheres
      const group = new THREE.Group();
      scene.add(group);

      // Core Wireframe Sphere
      coreGeometry = new THREE.IcosahedronGeometry(1.5, 2);
      coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x0085ca,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        shininess: 100,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      group.add(core);

      // Outer Wireframe Shield
      outerGeometry = new THREE.IcosahedronGeometry(2.2, 1);
      outerMaterial = new THREE.MeshPhongMaterial({
        color: 0x0085ca,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const outer = new THREE.Mesh(outerGeometry, outerMaterial);
      group.add(outer);

      // Lighting
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      // Animation Loop
      const animate = () => {
        group.rotation.x += 0.005;
        group.rotation.y += 0.005;
        core.rotation.z += 0.01;
        
        if (renderer) renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Resize Handler
      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (container && renderer && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        if (coreGeometry) coreGeometry.dispose();
        if (coreMaterial) coreMaterial.dispose();
        if (outerGeometry) outerGeometry.dispose();
        if (outerMaterial) outerMaterial.dispose();
        if (renderer) renderer.dispose();
      };
    } catch (e) {
      console.warn('Three.js WebGL initialization failed:', e);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative z-20"
    />
  );
}
