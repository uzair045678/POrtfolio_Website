import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";

const base = import.meta.env.BASE_URL || "/";

function AvatarModel({ onLoaded }) {
  const group = useRef();
  const { scene, animations } = useGLTF(base + "avatar_with_anim_formal.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    onLoaded?.();
    const action = actions?.[Object.keys(actions || {})[0]];
    if (action) action.play();
  }, [actions, onLoaded]);

  return <primitive ref={group} object={scene} scale={2.5} position={[0, -3.6, 0]} />;
}

function CameraDebugger() {
  const { camera, scene } = useThree();

  useEffect(() => {
    window.r3fCamera = camera;
    window.r3fScene = scene;
  }, [camera, scene]);

  return null;
}

export default function HeroAvatar({ onLoaded }) {
  return (
    <Canvas
      camera={{ position: [-17.889551863863957, 1.093526315702387, 24.790483188927276], fov: 5 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
    >
      <CameraDebugger />
      <ambientLight intensity={1.6} />
      <hemisphereLight intensity={0.9} color="#ffffff" groundColor="#404040" />
      <directionalLight position={[-4, 6, 10]} intensity={4} />
      <directionalLight position={[-9, 2, 6]} intensity={2.2} />
      <directionalLight position={[5, 2, -6]} intensity={1.4} />
      <directionalLight position={[0, -3, 3]} intensity={0.8} />
      <Suspense fallback={null}>
        <AvatarModel onLoaded={onLoaded} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0} />
    </Canvas>
  );
}
