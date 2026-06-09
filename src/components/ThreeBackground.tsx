"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. Dimensions & Scene Setup ---
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020208, 0.012);

    // --- 2. Camera Setup ---
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // --- 3. Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight(0x0e0d22, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 40);
    cyanLight.position.set(-15, 10, 10);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2, 40);
    purpleLight.position.set(15, -10, 10);
    scene.add(purpleLight);

    // --- 5. Interactive Neural Network (Nodes & Line Connections) ---
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    // Randomize initial node positions & drifting velocities
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        )
      );
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Glow node texture
    const nCanvas = document.createElement("canvas");
    nCanvas.width = 16;
    nCanvas.height = 16;
    const nCtx = nCanvas.getContext("2d");
    if (nCtx) {
      const grad = nCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(168, 85, 247, 0.7)"); // Violet glow
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      nCtx.fillStyle = grad;
      nCtx.fillRect(0, 0, 16, 16);
    }
    const nodeTexture = new THREE.CanvasTexture(nCanvas);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: nodeTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xa855f7, // Violet
    });
    const neuralNodes = new THREE.Points(geometry, nodeMaterial);
    scene.add(neuralNodes);

    // Grid connector lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4338ca, // Indigo
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    let lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    // --- 6. Orbiting 3D Glass Geometries ---
    const geoGroup = new THREE.Group();
    scene.add(geoGroup);

    // Glass material helper
    const getGlassMaterial = (color: number) => {
      return new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.7,
        thickness: 1.5,
        transparent: true,
        opacity: 0.35,
        wireframe: false,
      });
    };

    const wireMatHelper = (color: number) => {
      return new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
    };

    // Geometries
    const torusGeo = new THREE.TorusGeometry(3, 0.8, 16, 100);
    const torusMesh = new THREE.Mesh(torusGeo, getGlassMaterial(0x06b6d4));
    torusMesh.position.set(-15, 8, -10);
    geoGroup.add(torusMesh);

    const torusWire = new THREE.Mesh(torusGeo, wireMatHelper(0x06b6d4));
    torusMesh.add(torusWire);

    const octGeo = new THREE.OctahedronGeometry(2.5, 0);
    const octMesh = new THREE.Mesh(octGeo, getGlassMaterial(0xa855f7));
    octMesh.position.set(16, -10, -5);
    geoGroup.add(octMesh);

    const octWire = new THREE.Mesh(octGeo, wireMatHelper(0xa855f7));
    octMesh.add(octWire);

    const dodecGeo = new THREE.DodecahedronGeometry(2, 0);
    const dodecMesh = new THREE.Mesh(dodecGeo, getGlassMaterial(0xec4899));
    dodecMesh.position.set(-12, -12, -15);
    geoGroup.add(dodecMesh);

    const dodecWire = new THREE.Mesh(dodecGeo, wireMatHelper(0xec4899));
    dodecMesh.add(dodecWire);

    // --- 7. Cybersecurity Shield Grid Shell ---
    const shieldGeo = new THREE.IcosahedronGeometry(12, 2);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 0, 0);
    scene.add(shieldMesh);

    // --- 8. Vertical Dynamic Code Streams ---
    const codeStreamCount = 12;
    const codeStreams: THREE.Mesh[] = [];

    const createCodeTexture = () => {
      const cCanvas = document.createElement("canvas");
      cCanvas.width = 64;
      cCanvas.height = 512;
      const cCtx = cCanvas.getContext("2d");
      if (cCtx) {
        cCtx.fillStyle = "rgba(0,0,0,0)";
        cCtx.fillRect(0, 0, 64, 512);

        cCtx.fillStyle = "rgba(6, 182, 212, 0.8)"; // Cyan matrix colors
        cCtx.font = "bold 16px monospace";
        const chars = ["1", "0", "<", ">", "y", "o", "l", "o", "c", "y", "b", "e", "r", "p", "y", "s", "q", "l"];
        
        for (let y = 0; y < 32; y++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const opacity = y / 32; // Fade stream effect upward
          cCtx.fillStyle = `rgba(34, 211, 238, ${opacity})`;
          cCtx.fillText(char, 24, y * 16);
        }
      }
      const tex = new THREE.CanvasTexture(cCanvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const streamGeo = new THREE.PlaneGeometry(1.2, 14);
    for (let i = 0; i < codeStreamCount; i++) {
      const streamMat = new THREE.MeshBasicMaterial({
        map: createCodeTexture(),
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stream = new THREE.Mesh(streamGeo, streamMat);
      stream.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30 - 15
      );
      scene.add(stream);
      codeStreams.push(stream);
    }

    // --- 9. Floating Programming Symbol Sprites ---
    const symbolStrings = ["<>", "{}", "[]", "py", "sql", "ml", "cyber", "ai", "git", "ng"];
    const symbolGroup = new THREE.Group();
    scene.add(symbolGroup);

    const makeSymbolSprite = (txt: string) => {
      const sCanvas = document.createElement("canvas");
      sCanvas.width = 64;
      sCanvas.height = 64;
      const sCtx = sCanvas.getContext("2d");
      if (sCtx) {
        sCtx.fillStyle = "rgba(0,0,0,0)";
        sCtx.fillRect(0, 0, 64, 64);
        sCtx.fillStyle = "rgba(168, 85, 247, 0.7)"; // Purple/Indigo symbols
        sCtx.font = "bold 20px Courier";
        sCtx.textAlign = "center";
        sCtx.textBaseline = "middle";
        sCtx.fillText(txt, 32, 32);
      }
      const texture = new THREE.CanvasTexture(sCanvas);
      const mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(1.5, 1.5, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 30 - 5
      );
      return sprite;
    };

    symbolStrings.forEach((sym) => {
      const sprite = makeSymbolSprite(sym);
      symbolGroup.add(sprite);
    });

    // --- 10. Mouse Interaction Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 8;
      mouse.targetY = (event.clientY / window.innerHeight - 0.5) * 8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- 10.1. Scroll-based Camera Telemetry (4D Experience) ---
    const scrollInfo = { current: 0, target: 0 };
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollInfo.target = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // --- 11. Resize Logic ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- 12. Animation Loop ---
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Interpolate scroll position smoothly
      scrollInfo.current += (scrollInfo.target - scrollInfo.current) * 0.05;

      // Parallax smooth camera movement
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 4D Camera trajectory through the background nodes based on scroll percentage
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 25;

      const s = scrollInfo.current;
      if (s < 0.25) {
        // Hero to About
        const t = s / 0.25;
        targetCamX = THREE.MathUtils.lerp(0, -12, t);
        targetCamY = THREE.MathUtils.lerp(0, 6, t);
        targetCamZ = THREE.MathUtils.lerp(25, 20, t);
      } else if (s < 0.5) {
        // About to Skills
        const t = (s - 0.25) / 0.25;
        targetCamX = THREE.MathUtils.lerp(-12, 12, t);
        targetCamY = THREE.MathUtils.lerp(6, -8, t);
        targetCamZ = THREE.MathUtils.lerp(20, 18, t);
      } else if (s < 0.75) {
        // Skills to Projects
        const t = (s - 0.5) / 0.25;
        targetCamX = THREE.MathUtils.lerp(12, -8, t);
        targetCamY = THREE.MathUtils.lerp(-8, -12, t);
        targetCamZ = THREE.MathUtils.lerp(18, 22, t);
      } else {
        // Projects to Contact
        const t = (s - 0.75) / 0.25;
        targetCamX = THREE.MathUtils.lerp(-8, 0, t);
        targetCamY = THREE.MathUtils.lerp(-12, 0, t);
        targetCamZ = THREE.MathUtils.lerp(22, 26, t);
      }

      camera.position.x = targetCamX + mouse.x;
      camera.position.y = targetCamY - mouse.y;
      camera.position.z = targetCamZ;
      camera.lookAt(0, 0, 0);

      // Rotate floating geometries
      torusMesh.rotation.x += 0.005;
      torusMesh.rotation.y += 0.008;
      octMesh.rotation.x -= 0.006;
      octMesh.rotation.z += 0.007;
      dodecMesh.rotation.y += 0.007;
      dodecMesh.rotation.z -= 0.005;

      // Drifting 3D geometries orbital motion
      const time = performance.now() * 0.0005;
      torusMesh.position.y = 8 + Math.sin(time) * 1.5;
      octMesh.position.y = -10 + Math.cos(time * 0.8) * 1.2;
      dodecMesh.position.y = -12 + Math.sin(time * 0.7) * 1.5;

      // Animate Code Streams falling
      codeStreams.forEach((stream) => {
        stream.position.y -= 0.06;
        // Wrap streams
        if (stream.position.y < -20) {
          stream.position.y = 20;
          stream.position.x = (Math.random() - 0.5) * 50;
        }
        // Offset texture coordinates for falling character streams
        const streamMat = stream.material as THREE.MeshBasicMaterial;
        if (streamMat && streamMat.map) {
          streamMat.map.offset.y += 0.006;
        }
      });

      // Animate cybersecurity shield shell grid pulsing
      shieldMesh.rotation.y = time * 0.15;
      shieldMesh.rotation.x = time * 0.08;
      const shieldGlow = 0.03 + Math.sin(time * 2.0) * 0.02;
      shieldMat.opacity = shieldGlow;

      // Drifting symbol sprites bouncing
      symbolGroup.children.forEach((sprite, idx) => {
        sprite.position.y += Math.sin(time + idx) * 0.004;
      });

      // Update particle node positions
      const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;

        posArray[xIdx] += velocities[i].x;
        posArray[yIdx] += velocities[i].y;
        posArray[zIdx] += velocities[i].z;

        // Boundaries check (keep them within bounds box)
        if (Math.abs(posArray[xIdx]) > 30) velocities[i].x *= -1;
        if (Math.abs(posArray[yIdx]) > 30) velocities[i].y *= -1;
        if (Math.abs(posArray[zIdx]) > 30) velocities[i].z *= -1;
      }
      positionsAttr.needsUpdate = true;

      // Calculate connections for drifting nodes (draw lines when nodes are close)
      const linePositions: number[] = [];
      const maxDistance = 9;

      for (let i = 0; i < particleCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dist = Math.sqrt(
            (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2
          );

          if (dist < maxDistance) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
          }
        }
      }

      // Rebuild lines geometry dynamically
      scene.remove(lineSegments);
      lineSegments.geometry.dispose();

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      renderer.render(scene, camera);
    };

    animate();

    // --- 13. Cleanups ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      scene.clear();
      geometry.dispose();
      nodeMaterial.dispose();
      nodeTexture.dispose();
      lineMaterial.dispose();
      lineSegments.geometry.dispose();
      torusGeo.dispose();
      octGeo.dispose();
      dodecGeo.dispose();
      torusMesh.geometry.dispose();
      torusMesh.material.dispose();
      torusWire.material.dispose();
      octMesh.geometry.dispose();
      octMesh.material.dispose();
      octWire.material.dispose();
      dodecMesh.geometry.dispose();
      dodecMesh.material.dispose();
      dodecWire.material.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      streamGeo.dispose();
      
      codeStreams.forEach((stream) => {
        stream.geometry.dispose();
        const mat = stream.material as THREE.MeshBasicMaterial;
        if (mat && mat.map) mat.map.dispose();
        if (mat) mat.dispose();
      });

      symbolGroup.children.forEach((child) => {
        const sprite = child as THREE.Sprite;
        sprite.geometry.dispose();
        const mat = sprite.material as THREE.SpriteMaterial;
        if (mat && mat.map) mat.map.dispose();
        if (mat) mat.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 bg-[#020208] overflow-hidden"
      style={{ pointerEvents: "none" }}
    />
  );
}
