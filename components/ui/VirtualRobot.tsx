'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const Droid = () => {
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const leftArmRef = useRef<THREE.Mesh>(null!);
  const rightArmRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Animasi Kepala (Tengok kanan-kiri pelan)
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1) * 0.3;
    }

    // 2. Animasi Tangan (Ayun pelan)
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 2) * 0.2;
      rightArmRef.current.rotation.x = -Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group>
      {/* --- KEPALA --- */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        {/* Batok Kepala */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
        
        {/* Mata Visor (Cyan Glowing) */}
        <mesh position={[0, 0.2, 0.45]}>
           <boxGeometry args={[0.8, 0.15, 0.1]} />
           <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>

        {/* Antena */}
        <mesh position={[0, 0.6, 0]}>
           <cylinderGeometry args={[0.02, 0.02, 0.5]} />
           <meshStandardMaterial color="#888" />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
           <sphereGeometry args={[0.08]} />
           <meshStandardMaterial color="#ff0000" emissive="#ff0000" />
        </mesh>
      </group>

      {/* --- BADAN --- */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        {/* Bentuk Kapsul/Silinder */}
        <cylinderGeometry args={[0.5, 0.4, 1.2, 32]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* --- TANGAN KIRI --- */}
      <mesh ref={leftArmRef} position={[-0.7, 0.2, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* --- TANGAN KANAN --- */}
      <mesh ref={rightArmRef} position={[0.7, 0.2, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.25]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* --- EFEK HOVER (Jetpack bawah) --- */}
      <mesh position={[0, -0.7, 0]} rotation={[Math.PI, 0, 0]}>
         <coneGeometry args={[0.3, 0.5, 32]} />
         <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Label Chat di samping robot */}
      <Html position={[1, 1.5, 0]} distanceFactor={6}>
        <div className="bg-black/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/50 font-mono whitespace-nowrap">
          Hello, Human! 🤖
        </div>
      </Html>
    </group>
  );
};

export default function VirtualRobot() {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="cyan" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="purple" />
        
        {/* Float membuat robot melayang naik turun otomatis */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <Droid />
        </Float>
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}