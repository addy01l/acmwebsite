import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeMascot = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Core layer
    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x0085CA,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    // Outer layer
    const outerGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const outerMaterial = new THREE.MeshPhongMaterial({
        color: 0x0085CA,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    globeGroup.add(outer);

    // Lights
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Mouse interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - width / 2) * 0.001;
      mouseY = (event.clientY - height / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smoothly track mouse offset
      const mouseOffsetY = mouseX * 2.0;
      const mouseOffsetX = mouseY * 2.0;
      
      targetRotationY += (mouseOffsetY - targetRotationY) * 0.05;
      targetRotationX += (mouseOffsetX - targetRotationX) * 0.05;

      // Base extremely slow rotation + exact cursor offset mapping
      const time = Date.now() * 0.001;
      globeGroup.rotation.y = time * 0.05 + targetRotationY;
      globeGroup.rotation.x = time * 0.05 + targetRotationX;
      
      // The core spins slightly faster independently
      core.rotation.z += 0.002;
      
      // Move the globe physically towards the cursor
      const targetPosX = mouseX * 1.5; 
      const targetPosY = -mouseY * 1.5; 
      globeGroup.position.x += (targetPosX - globeGroup.position.x) * 0.05;
      globeGroup.position.y += (targetPosY - globeGroup.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreeMascot;
