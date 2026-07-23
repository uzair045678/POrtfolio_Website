import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const base = import.meta.env.BASE_URL || "/";

function Socials() {
  return (
    <div className="socials">
      <a href="https://linkedin.com/in/uzair-ahmad-mirza-b939a21a2" target="_blank"><FaLinkedin size={20} /></a>
      <a href="https://github.com/uzair045678" target="_blank"><FaGithub size={20} /></a>
    </div>
  );
}

function AvatarModel({ onLoaded }) {
  const group = useRef();
  const { scene, animations } = useGLTF(base + "avatar_with_anim_formal.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    onLoaded?.();
    const action = actions?.[Object.keys(actions || {})[0]];
    if (action) action.play();
  }, [actions]);

  return <primitive ref={group} object={scene} scale={2.5} position={[0, -3.6, 0]} />;
}

function AvatarScene({ onLoaded }) {
  return (
    <Canvas camera={{ position: [-17.889551863863957, 1.093526315702387, 24.790483188927276], fov: 5 }} gl={{ antialias: true }}>
      <CameraDebugger />
      <ambientLight intensity={1} color="white" />
      <directionalLight position={[5, 5, 5]} intensity={10} color="white" />
      <directionalLight position={[-5, -5, -5]} intensity={2} color="white" />
      <directionalLight position={[5, 0, -5]} intensity={4} color="white" />
      <Suspense fallback={null}>
        <AvatarModel onLoaded={onLoaded} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0} />
    </Canvas>
  );
}

function CameraDebugger() {
  const { camera, scene } = useThree();

  useEffect(() => {
    window.r3fCamera = camera;
    window.r3fScene = scene;
  }, [camera, scene]);

  return null;
}

export default function Hero() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const fallbackImg = base + "poster.webp";

  return (
    <section id="home" className="hero section">
      <div className="heroText">
        <h1>Hi, it's <span>Uzair Ahmad Mirza</span></h1>
        <h2>I'm an <span>XR Developer</span></h2>
        <p>
          I am a problem solver,  I build immersive AR, VR, XR, and real-time interactive experiences using Unity,
          Unreal Engine, C#, C++, and modern gameplay systems. I specialize in VR/AR applications,
          interactive simulations, and real-world XR solutions that bridge virtual environments with practical applications.
        </p>
        <Socials />
        <div className="buttons">
          <a className="btn primary" href="https://drive.google.com/file/d/1SFvy9tz3M3zbPICQiOPr3EyrsOMCE05q/view?usp=drive_link" target="_blank">Check my CV</a>
          <a className="btn outline" href="#contact">Contact Me</a>
        </div>
      </div>
      <div className="heroImageWrap">
        <div className="heroCanvasWrap">
          <img className={`heroFallbackImg ${modelLoaded ? "loaded" : ""}`} src={fallbackImg} alt="" />
          <div className={`heroCanvasInner ${modelLoaded ? "loaded" : ""}`}>
            <AvatarScene onLoaded={() => setModelLoaded(true)} />
          </div>
        </div>
      </div>
    </section>
  );
}
