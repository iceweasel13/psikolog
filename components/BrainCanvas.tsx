"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function BrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Sahne, Kamera & Şeffaf Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Beyin Lifleri Grubu
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // --- GLSL Shaders: Kalın Tüplerin İçinden Akan Işık Palsi ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uBaseColor;
      uniform vec3 uPulseColor;
      varying vec2 vUv;

      void main() {
        // Lif boyunca (u) periyodik akan ışık dalgası
        float pulseSpeed = 1.6;
        float pulseFrequency = 3.0;
        float pulse = sin((vUv.x * pulseFrequency) - (uTime * pulseSpeed));
        pulse = pow(max(pulse, 0.0), 5.0); // Işık huzmesini keskinleştir

        // Kenar parlama etkisi (Fresnel / Tube Glow)
        float glow = sin(vUv.y * 3.14159);

        vec3 finalColor = mix(uBaseColor, uPulseColor, pulse);
        float alpha = (0.28 + pulse * 0.72) * glow;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      // Kırık beyaz sitemize uyumlu vizon taban ve parlayan altın/vizon sinyal ışığı
      // (Neon mavi istersen: uPulseColor: new THREE.Color("#00e5ff"))
      uBaseColor: { value: new THREE.Color("#A89B8D") },
      uPulseColor: { value: new THREE.Color("#4A423B") },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Beyin Şeklini Oluşturan Kalın Kıvrımlı Tüpler (TubeGeometry)
    const curveCount = 38; // 38 ana nöron otoyolu
    const pointsPerCurve = 24;

    for (let c = 0; c < curveCount; c++) {
      const curvePoints: THREE.Vector3[] = [];
      const hemisphere = c % 2 === 0 ? 1 : -1;
      const progressRatio = c / curveCount;

      const baseAngle = progressRatio * Math.PI * 2;
      const baseRadius = 0.8 + Math.random() * 0.65;

      for (let p = 0; p < pointsPerCurve; p++) {
        const t = p / (pointsPerCurve - 1);
        const theta = baseAngle + Math.sin(t * Math.PI * 2.5) * 0.6;
        const phi = Math.PI * (t - 0.5) * 0.95;

        // Görseldeki beyin silueti ve omurilik/beyin sapı uzantısı
        let x = baseRadius * Math.cos(phi) * Math.cos(theta);
        let y = baseRadius * Math.sin(phi) * 1.15;
        let z = baseRadius * Math.cos(phi) * Math.sin(theta) * 0.9;

        // Alt kısımda beyin sapı (stem) oluştur
        if (c > curveCount - 6) {
          x = (Math.random() - 0.5) * 0.15;
          y = -0.9 - t * 0.95; // Aşağı inen sap
          z = (Math.random() - 0.5) * 0.15;
        } else {
          // İki ana lob yarığı
          x = (x + hemisphere * 0.22) * 1.05;
        }

        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const spline = new THREE.CatmullRomCurve3(curvePoints);
      // TubeGeometry(spline, tubularSegments, radius, radialSegments, closed)
      // radius = 0.016 ile lifleri kalınlaştırıyoruz
      const tubeGeometry = new THREE.TubeGeometry(spline, 64, 0.016, 6, false);
      const tubeMesh = new THREE.Mesh(tubeGeometry, shaderMaterial);
      brainGroup.add(tubeMesh);
    }

    brainGroup.position.set(-0.25, 0.1, 0);
    brainGroup.scale.set(1.25, 1.25, 1.25);

    // Mouse Etkileşimi
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX - window.innerWidth / 3;
      const y = event.clientY - window.innerHeight / 2;
      mouseX = (x / window.innerWidth) * 2;
      mouseY = (y / window.innerHeight) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // Render Döngüsü
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Shader zaman güncellemesi (akım hareketi)
      uniforms.uTime.value = clock.getElapsedTime();

      // Yumuşak dönme ve mouse takibi
      brainGroup.rotation.y += 0.0025;
      targetRotationY = mouseX * 0.85;
      targetRotationX = mouseY * 0.65;

      brainGroup.rotation.y += (targetRotationY - brainGroup.rotation.y) * 0.05;
      brainGroup.rotation.x += (targetRotationX - brainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      shaderMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}