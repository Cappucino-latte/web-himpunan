'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 1. KOMPONEN: CINCIN GYROSCOPE (The Rings)
// Kita buat komponen reusable biar bisa bikin banyak cincin dengan mudah
const TechRing = ({ radius, speed, rotationAxis, color }: { radius: number, speed: number, rotationAxis: 'x' | 'y' | 'z', color: string }) => {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      // Rotasi cincin berdasarkan axis-nya
      if (rotationAxis === 'x') ringRef.current.rotation.x = t * speed;
      if (rotationAxis === 'y') ringRef.current.rotation.y = t * speed;
      if (rotationAxis === 'z') ringRef.current.rotation.z = t * speed;
      
      // Sedikit goyangan agar terlihat dinamis (floating magnetic field)
      ringRef.current.rotation.x += Math.sin(t * 0.5) * 0.005;
    }
  });

  return (
    <mesh ref={ringRef}>
      {/* Torus tipis agar terlihat seperti orbit laser */}
      <torusGeometry args={[radius, 0.015, 16, 100]} /> 
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={2} // Glow kuat
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// 2. KOMPONEN: INTI UTAMA (The Core)
const AICore = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;
  const responsiveScale = isMobile ? viewport.width / 2.5 : 2.2;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animasi Bola Wireframe Luar
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.2;
    }

    // Animasi Titik-Titik Dalam (Neural Network)
    if (pointsRef.current) {
      pointsRef.current.rotation.x = -t * 0.3; // Putar lawan arah
      pointsRef.current.rotation.y = -t * 0.3;
      // Efek berdenyut (Pulse)
      const pulse = 1 + Math.sin(t * 3) * 0.05;
      pointsRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={1}
    >
      <group scale={responsiveScale}>
        
        {/* --- LAYER 1: WIREFRAME LUAR (Geometric Shield) --- */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 1]} /> 
          <meshStandardMaterial
            color="#00ffff"       
            emissive="#00ffff"    
            emissiveIntensity={1.5}
            wireframe={true}      
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* --- LAYER 2: NEURAL POINTS (Data Cloud) --- */}
        {/* Ini pengganti bola solid. Titik-titik terlihat lebih "Digital" */}
        <points ref={pointsRef}>
          <icosahedronGeometry args={[1, 4]} /> {/* Detail tinggi untuk banyak titik */}
          <pointsMaterial 
            color="#3b82f6"
            size={0.03} // Ukuran titik
            transparent
            opacity={0.8}
            sizeAttenuation={true} // Titik mengecil jika jauh
          />
        </points>

        {/* --- LAYER 3: MULTI-AXIS RINGS (Gyroscope Effect) --- */}
        {/* Tiga cincin berputar beda arah menciptakan efek atom/reaktor */}
        <TechRing radius={1.6} speed={0.4} rotationAxis="x" color="#06b6d4" />
        <TechRing radius={1.8} speed={0.3} rotationAxis="y" color="#3b82f6" />
        <TechRing radius={2.0} speed={0.2} rotationAxis="z" color="#00ffff" />

        {/* --- LAYER 4: DATA PARTICLES (Sparkles) --- */}
        {/* Partikel melayang di sekitar inti */}
        <Sparkles 
          count={60} 
          scale={5} // Sebaran partikel
          size={3}  // Ukuran partikel
          speed={0.4} 
          opacity={0.6} 
          color="#a5f3fc" 
        />

      </group>
    </Float>
  );
};

// Main Component
export default function Hero3D() {
  return (
    <div className="w-full h-[500px] md:h-full relative z-10">
      <Canvas 
        className="bg-transparent" 
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]} 
      >
        {/* LIGHTING - Cyberpunk Style */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={4} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={4} color="#3b82f6" />
        <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" />
        
        {/* OBJEK UTAMA */}
        <AICore />
        
        {/* BACKGROUND */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8} 
        />
      </Canvas>
    </div>
  );
}