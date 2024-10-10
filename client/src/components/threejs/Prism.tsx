// src/Prism.tsx

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Prism: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const bobbingSpeed = 0.001; // Speed of bobbing
  const rotationSpeed = 0.005; // Speed of rotation

  useEffect(() => {
    const width = 120; // Set width to 120 pixels
    const height = 150; // Set height to 150 pixels

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(66, .90, 0.1, 1000);
    
    // Enable alpha transparency in the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    // Create a geometry for a pyramid using BufferGeometry
    const geometry = new THREE.BufferGeometry();
    
    // Define the vertices of the pyramid
    const vertices = new Float32Array([
      // Base (square)
      -1, 0, 1,  // Front left
       1, 0, 1,  // Front right
       1, 0, -1, // Back right
      -1, 0, -1, // Back left
      // Apex (top point of the pyramid)
       0, 2, 0   // Apex
    ]);

    // Define the indices for the pyramid's faces
    const indices = new Uint16Array([
      // Base
      0, 1, 2,
      0, 2, 3,
      // Side faces
      0, 1, 4, // Front face
      1, 2, 4, // Right face
      2, 3, 4, // Back face
      3, 0, 4, // Left face
    ]);

    // Set the attributes and indices to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // Create a black material for the outline
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Black color for the outline

    // Create the edges geometry
    const edges = new THREE.EdgesGeometry(geometry);
    const outline = new THREE.LineSegments(edges, outlineMaterial);
    scene.add(outline);

    // Adjust the camera position for a better angle
    camera.position.set(0, .99, 3.4); // x, y, z positions
    // camera.lookAt(0, 0, 0); // Look at the center of the pyramid

    // Add a light source to see the black pyramid
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong white light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);

      // Bobbing effect
      outline.position.y = Math.sin(Date.now() * bobbingSpeed) * 0.2; // Adjust bobbing amplitude as needed

      // Slow clockwise rotation
      outline.rotation.y += rotationSpeed; // Clockwise rotation around the Y-axis

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '120px', height: '150px' }} />; // Updated dimensions
};

export default Prism;
