"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const logRef = useRef<(msg: string) => void>(() => {});
  logRef.current = (msg: string) => {
    setDebugLogs((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let isCancelled = false;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 580;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0d0d2a, 1.2));

    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 30);
    cyanLight.position.set(-5, 4, 6);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 5, 30);
    purpleLight.position.set(5, -3, 6);
    scene.add(purpleLight);

    const whiteKey = new THREE.DirectionalLight(0xffffff, 0.9);
    whiteKey.position.set(0, 6, 8);
    scene.add(whiteKey);

    // ── Main Group (rotates with mouse) ────────────────────────────────────
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ── Lab Grid Floor ─────────────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(14, 28, 0x7c3aed, 0x1e1b4b);
    gridHelper.position.y = -3.8;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.3;
    mainGroup.add(gridHelper);

    // ── Scanner / HUD overlay refs (removed) ────────────────────────────────

    // ── Holographic Particle Ring System ───────────────────────────────────
    const createRing = (count: number, radius: number, color: number, offsetAngle = 0) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + offsetAngle;
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = Math.sin(angle) * radius;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.04,
        color,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return new THREE.Points(geo, mat);
    };

    const ring1 = createRing(160, 2.6, 0x06b6d4);
    const ring2 = createRing(120, 2.3, 0xa855f7, Math.PI / 3);
    const ring3 = createRing(80, 3.1, 0x7c3aed, Math.PI / 6);
    mainGroup.add(ring1, ring2, ring3);

    // ── AI Assistant Hologram Orb ──────────────────────────────────────────
    const assistantGroup = new THREE.Group();
    assistantGroup.position.set(-3.8, 0.6, 1.2);
    mainGroup.add(assistantGroup);

    const coreGeo = new THREE.IcosahedronGeometry(0.45, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.75,
    });
    const assistantCore = new THREE.Mesh(coreGeo, coreMat);
    assistantGroup.add(assistantCore);

    const ringGeo = new THREE.RingGeometry(0.6, 0.65, 40);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.55,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2;
    assistantGroup.add(orbitRing);

    // ── Holographic Data Panels ────────────────────────────────────────────
    const createPanelTexture = (title: string, lines: string[], clr: string) => {
      const pc = document.createElement("canvas");
      pc.width = 400; pc.height = 200;
      const px = pc.getContext("2d")!;
      px.fillStyle = "rgba(2,2,18,0.92)";
      px.fillRect(0, 0, 400, 200);
      px.strokeStyle = "rgba(139,92,246,0.07)";
      px.lineWidth = 1;
      for (let i = 0; i < 400; i += 18) { px.beginPath(); px.moveTo(i, 0); px.lineTo(i, 200); px.stroke(); }
      for (let j = 0; j < 200; j += 18) { px.beginPath(); px.moveTo(0, j); px.lineTo(400, j); px.stroke(); }
      px.strokeStyle = clr; px.lineWidth = 2.5;
      px.strokeRect(1, 1, 398, 198);
      const hg = px.createLinearGradient(0, 0, 400, 0);
      hg.addColorStop(0, clr + "cc");
      hg.addColorStop(1, clr + "22");
      px.fillStyle = hg;
      px.fillRect(0, 0, 400, 34);
      px.fillStyle = "#fff";
      px.font = "bold 14px monospace";
      px.fillText("⬡ " + title, 12, 23);
      lines.forEach((l, i) => {
        px.fillStyle = "rgba(200,240,255,0.88)";
        px.font = "12px monospace";
        px.fillText("▸ " + l, 14, 60 + i * 26);
      });
      return new THREE.CanvasTexture(pc);
    };

    const aiTex = createPanelTexture("COGNITIVE_CORE // HAF-AI", [
      "MODEL: YOLOv8 + Transformer", "INFERENCE: 14.8 ms",
      "NEURAL_MAP: ACTIVE [98.4%]", "STATUS: ONLINE ●",
    ], "#06b6d4");

    const sysTex = createPanelTexture("SYS_CHANNELS // KASARAGOD", [
      "STACK: Angular · React · Python", "SECTOR: Kerala, India",
      "FIREWALL: COMPLIANT", "NODE: HAF_COGNITIVE_v5",
    ], "#a855f7");

    const panelGeo = new THREE.PlaneGeometry(2.6, 1.3);

    const aiPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({
      map: aiTex, transparent: true, opacity: 0.92, side: THREE.DoubleSide,
    }));
    aiPanel.position.set(3.4, 2.0, 1.0);
    aiPanel.rotation.y = -0.38;
    mainGroup.add(aiPanel);

    const sysPanel = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({
      map: sysTex, transparent: true, opacity: 0.92, side: THREE.DoubleSide,
    }));
    sysPanel.position.set(-3.4, -1.4, 1.4);
    sysPanel.rotation.y = 0.38;
    mainGroup.add(sysPanel);

    const aiPanelMat = aiPanel.material as THREE.MeshBasicMaterial;
    const sysPanelMat = sysPanel.material as THREE.MeshBasicMaterial;

    // ── Floating DNA / helix streaks ───────────────────────────────────────
    const helixGroup = new THREE.Group();
    helixGroup.position.set(3.0, 0, 0);
    mainGroup.add(helixGroup);
    const helixGeo = new THREE.BufferGeometry();
    const helixPos: number[] = [];
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 4;
      helixPos.push(Math.cos(t) * 0.3, (i / 60) * 5 - 2.5, Math.sin(t) * 0.3);
    }
    helixGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(helixPos), 3));
    const helixMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4 });
    helixGroup.add(new THREE.Line(helixGeo, helixMat));

    // ── Scanning / sweep line ──────────────────────────────────────────────
    const scanGeo = new THREE.PlaneGeometry(3.4, 0.02);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    });
    const scanLine = new THREE.Mesh(scanGeo, scanMat);
    scanLine.position.z = 0.3;
    mainGroup.add(scanLine);

    // ── Facial Recognition Mesh Tracker (Removed as requested) ──────────


    // ── Particle Face Overlay ──────────────────────────────────────────────
    let faceParticles: THREE.Points | null = null;
    let originalPositions: Float32Array = new Float32Array(0);

    const photoImg2 = new Image();
    photoImg2.onload = () => {
      if (isCancelled) return;
      const aspect2 = photoImg2.naturalWidth / photoImg2.naturalHeight;
      const iH = 4.0;
      const iW = iH * aspect2;
      logRef.current("Particle map compiled successfully.");

      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      const W = 90, H = Math.round(90 / aspect2);
      cvs.width = W; cvs.height = H;
      ctx.drawImage(photoImg2, 0, 0, W, H);
      const imgData = ctx.getImageData(0, 0, W, H).data;

      const positions: number[] = [];
      const colors: number[] = [];

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const idx = (y * W + x) * 4;
          const r = imgData[idx], g = imgData[idx + 1], b = imgData[idx + 2], a = imgData[idx + 3];
          const brightness = (r + g + b) / 3;
          if (a < 50 || brightness < 30) continue;
          if (Math.random() > 0.33) continue;

          const nx = (x / W - 0.5) * iW;
          const ny = (0.5 - y / H) * iH;
          const pz = 0.05 + (brightness / 255) * 0.4;
          positions.push(nx, ny, pz);

          const factor = 0.25;
          colors.push((r / 255) * factor + 0.05, (g / 255) * factor + 0.4, (b / 255) * factor + 0.6);
        }
      }

      const pGeo = new THREE.BufferGeometry();
      const posArr = new Float32Array(positions);
      originalPositions = posArr.slice();
      pGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      pGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      const dotCvs = document.createElement("canvas");
      dotCvs.width = 16; dotCvs.height = 16;
      const dotCtx = dotCvs.getContext("2d")!;
      const dotG = dotCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      dotG.addColorStop(0, "rgba(255,255,255,1)");
      dotG.addColorStop(0.25, "rgba(34,211,238,0.8)");
      dotG.addColorStop(0.7, "rgba(139,92,246,0.2)");
      dotG.addColorStop(1, "rgba(0,0,0,0)");
      dotCtx.fillStyle = dotG;
      dotCtx.fillRect(0, 0, 16, 16);

      faceParticles = new THREE.Points(pGeo, new THREE.PointsMaterial({
        size: 0.12, map: new THREE.CanvasTexture(dotCvs), vertexColors: true,
        transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      mainGroup.add(faceParticles);
      // FIX: particles centered at origin (y=0), matching the photo plane
      faceParticles.position.set(0, 0, 0.15);
    };
    photoImg2.onerror = () => {
      logRef.current("ERROR: Particle map file load error.");
    };
    photoImg2.src = "/avatar.jpg";

    // ── Mouse tracking ─────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation Loop ─────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.065;
      mouse.y += (mouse.ty - mouse.y) * 0.065;
      mainGroup.rotation.y = mouse.x * 0.28;
      mainGroup.rotation.x = -mouse.y * 0.18;
      // FIX: group floats around y=0 instead of a large offset
      mainGroup.position.y = Math.sin(t * 1.1) * 0.1;

      ring1.rotation.z = t * 0.35;
      ring2.rotation.z = -t * 0.28;
      ring3.rotation.z = t * 0.18;

      assistantGroup.position.y = 0.6 + Math.sin(t * 1.7) * 0.12;
      assistantGroup.position.x = -3.8 + Math.cos(t * 0.75) * 0.12;
      assistantCore.rotation.y = t * 0.9;
      assistantCore.rotation.z = t * 0.45;
      orbitRing.rotation.z = -t * 1.1;

      aiPanel.position.y = 2.0 + Math.sin(t * 1.4) * 0.07;
      sysPanel.position.y = -1.4 + Math.cos(t * 1.3) * 0.07;
      aiPanelMat.opacity = 0.87 + Math.sin(t * 11) * 0.05;
      sysPanelMat.opacity = 0.87 + Math.cos(t * 9) * 0.05;

      helixMat.opacity = 0.3 + Math.sin(t * 2) * 0.15;
      scanLine.position.y = -2.1 + ((t * 0.8) % 4.2);
      scanMat.opacity = 0.45 + Math.sin(t * 8) * 0.15;

      // Face particle breathing animation
      if (faceParticles?.geometry && originalPositions.length > 0) {
        const posAttr = faceParticles.geometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < arr.length / 3; i++) {
          const ox = originalPositions[i * 3];
          const oy = originalPositions[i * 3 + 1];
          const oz = originalPositions[i * 3 + 2];
          const wave = Math.sin(t * 1.6 + oy * 0.5) * 0.025;
          arr[i * 3]     = ox + wave * Math.sin(ox * 2);
          arr[i * 3 + 1] = oy + wave * 0.5;
          arr[i * 3 + 2] = oz + wave * 0.8;
        }
        posAttr.needsUpdate = true;
      }

      // Scanner animation removed

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      isCancelled = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // ── 4D Photo Card: smooth mouse-tracking tilt + idle float ────────────────────
  useEffect(() => {
    const el = photoWrapperRef.current;
    if (!el) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let floatT = 0;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      floatT += 0.008;
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);
      const floatY = Math.sin(floatT) * 7;
      el.style.transform =
        `translateY(${floatY}px) perspective(900px) rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth  * 0.5);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5);
      targetX = Math.max(-20, Math.min(20,  dx * 20));
      targetY = Math.max(-13, Math.min(13, -dy * 13));
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[620px] flex items-center justify-center select-none">
      {/* Ambient glow blobs */}
      <div className="absolute w-[320px] h-[320px] bg-cyan-500/10 rounded-full blur-[80px] -z-10 animate-pulse" />
      <div className="absolute w-[280px] h-[280px] bg-purple-600/10 rounded-full blur-[80px] -z-10" />

      {/* ── 4D Photo Card ─────────────────────────────────────────────────
          Multiple layers at different translateZ depths create genuine parallax.
          Mouse drives rotateX/rotateY; idle float keeps it alive. */}
      <div
        ref={photoWrapperRef}
        className="absolute pointer-events-none select-none"
        style={{ zIndex: 2, width: 250, height: 340, transformStyle: "preserve-3d" }}
      >
        {/* Layer −20px — Ambient radial glow (deepest) */}
        <div style={{
          position: "absolute",
          inset: "-36px",
          background: "radial-gradient(ellipse at 50% 55%, rgba(6,182,212,0.28) 0%, rgba(139,92,246,0.18) 42%, transparent 70%)",
          filter: "blur(32px)",
          transform: "translateZ(-20px)",
          borderRadius: 6,
        }} />

        {/* Layer 0 — The actual photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.jpg"
          alt="Ar Hafiz Muhammed"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transform: "translateZ(0px)",
          }}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
        />

        {/* Layer 2px — Subtle gradient overlay: vignette + bottom fade for badge */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: [
            "linear-gradient(180deg, rgba(2,2,8,0) 52%, rgba(2,2,8,0.78) 100%)",
            "linear-gradient(90deg, rgba(6,182,212,0.05) 0%, transparent 28%, transparent 72%, rgba(139,92,246,0.05) 100%)",
          ].join(", "),
          transform: "translateZ(2px)",
          pointerEvents: "none",
        }} />

        {/* Layer 6px — Holographic border frame */}
        <div style={{
          position: "absolute",
          inset: 0,
          border: "1.5px solid rgba(6,182,212,0.6)",
          boxShadow: [
            "0 0 22px rgba(6,182,212,0.28)",
            "inset 0 0 22px rgba(6,182,212,0.04)",
            "0 0 55px rgba(139,92,246,0.14)",
          ].join(", "),
          transform: "translateZ(6px)",
          pointerEvents: "none",
        }} />

        {/* Layer 14px — Corner accent brackets */}
        {([
          { top: "-1px",   left: "-1px",  right: undefined, bottom: undefined, bt: "2px solid rgba(6,182,212,0.95)",  bl: "2px solid rgba(6,182,212,0.95)",  br: undefined, bb: undefined },
          { top: "-1px",   right: "-1px", left: undefined,  bottom: undefined, bt: "2px solid rgba(6,182,212,0.95)",  br: "2px solid rgba(6,182,212,0.95)",  bl: undefined, bb: undefined },
          { bottom: "-1px",left: "-1px",  right: undefined, top: undefined,    bb: "2px solid rgba(139,92,246,0.95)", bl: "2px solid rgba(139,92,246,0.95)", bt: undefined, br: undefined },
          { bottom: "-1px",right: "-1px", left: undefined,  top: undefined,    bb: "2px solid rgba(139,92,246,0.95)", br: "2px solid rgba(139,92,246,0.95)", bt: undefined, bl: undefined },
        ] as const).map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            top: c.top, left: c.left, right: c.right, bottom: c.bottom,
            width: 22, height: 22,
            borderTop:    c.bt, borderLeft:   c.bl,
            borderRight:  c.br, borderBottom: c.bb,
            transform: "translateZ(14px)",
            pointerEvents: "none",
          }} />
        ))}

        {/* Layer 20px — Floating name / role badge (closest to viewer) */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 14px 12px",
          transform: "translateZ(20px)",
          pointerEvents: "none",
        }}>
          <p style={{
            margin: 0,
            color: "#e8f8ff",
            fontFamily: "monospace",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.07em",
            lineHeight: 1.3,
            textShadow: "0 0 14px rgba(6,182,212,0.9), 0 0 28px rgba(6,182,212,0.45)",
          }}>AR HAFIZ</p>
          <p style={{
            margin: 0,
            marginTop: 3,
            color: "rgba(6,182,212,0.82)",
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>Full Stack · AI / ML Engineer</p>
        </div>
      </div>

      {/* Dark radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,#020208_88%)] pointer-events-none z-10" />

      {/* Three.js canvas — transparent background; holographic FX float above photo */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing z-20" />

      {/* HUD Top-left */}
      <div className="absolute top-4 left-4 bg-slate-950/75 border border-cyan-500/35 text-[10px] text-cyan-400 font-mono py-1.5 px-3 rounded tracking-widest uppercase z-30 backdrop-blur-md shadow-[0_0_18px_rgba(6,182,212,0.18)] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>HAF_COGNITIVE_CORE // ONLINE</span>
      </div>

      {/* Cyberpunk Developer System Telemetry Logs Box */}
      <div className="absolute top-14 left-4 max-w-[260px] bg-slate-950/80 border border-cyan-500/20 rounded-lg p-2.5 text-[9px] font-mono text-cyan-400/80 z-30 backdrop-blur-md shadow-lg pointer-events-none select-none max-h-[110px] overflow-y-auto flex flex-col gap-1">
        <div className="text-cyan-300 font-bold border-b border-cyan-500/10 pb-1 mb-1 flex items-center justify-between">
          <span>⬡ SYSTEM_TELEMETRY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        {debugLogs.length === 0 ? (
          <div>Initializing core protocols...</div>
        ) : (
          debugLogs.map((log, i) => (
            <div key={i} className="leading-tight truncate">
              ▸ {log}
            </div>
          ))
        )}
      </div>

      {/* HUD Bottom-right */}
      <div className="absolute bottom-4 right-4 bg-slate-950/75 border border-purple-500/35 text-[10px] text-purple-400 font-mono py-1.5 px-3 rounded tracking-widest uppercase z-30 backdrop-blur-md shadow-[0_0_18px_rgba(168,85,247,0.18)]">
        HOLOGRAPHIC_RENDER // v5.4
      </div>

      {/* HUD Bottom-left: skill tags */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1 z-30">
        {["AI/ML", "Frontend", "CyberSec"].map((tag) => (
          <span key={tag} className="bg-slate-950/70 border border-slate-800/60 text-[9px] text-slate-400 font-mono px-2 py-0.5 rounded backdrop-blur-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Loading overlay — hides until HTML img fires onLoad */}
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-slate-400 text-xs gap-2 z-40 bg-[#020208]/70 backdrop-blur-sm">
          <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>Mounting Holographic Avatar...</span>
        </div>
      )}
    </div>
  );
}
