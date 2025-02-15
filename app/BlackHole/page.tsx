'use client';
import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const BlackHole: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene 구성
    const scene = new THREE.Scene();

    // PerspectiveCamera: 원근감을 주기 위해 사용합니다.
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // 카메라를 조금 비스듬한 위치에 배치하여 3D 효과를 강조합니다.
    camera.position.set(10, 10, 10);

    // Renderer 생성 및 container에 부착합니다.
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // OrbitControls를 생성해 카메라를 자유롭게 회전할 수 있게 합니다.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 조명 추가 : 적절한 조명으로 3D 음영을 구현합니다.
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // 블랙홀 - 검은 구체
    const blackHoleGeometry = new THREE.SphereGeometry(1, 32, 32);
    const blackHoleMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    scene.add(blackHole);

    // 가스 디스크 (Accretion Disk)
    const diskGeometry = new THREE.RingGeometry(1.5, 3, 64);
    const diskMaterial = new THREE.MeshPhongMaterial({
      color: 0xff5500,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
    // 디스크를 X축으로 90도 회전하여 수평 평면에 맞춥니다.
    accretionDisk.rotation.x = Math.PI / 2;
    scene.add(accretionDisk);

    // 별 배경 생성 : 랜덤 위치에 별을 찍어 깊이감을 줍니다.
    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);
      // 가스 디스크의 회전 (Z축)
      accretionDisk.rotation.z += 0.01;
      // OrbitControls 업데이트
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 창 크기 변경에 따라 업데이트
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 정리 작업
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={'w-full h-screen'} />;
};

export default BlackHole;
