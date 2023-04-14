/*
  Auto-generated by Spline
*/

import useSpline from "@splinetool/r3f-spline";
import { PerspectiveCamera } from "@react-three/drei";

export default function Scene({ ...props }) {
	const { nodes, materials } = useSpline("https://prod.spline.design/U2fplQkZQPZ02Xkn/scene.splinecode");
	return (
		<>
			<color attach="background" args={["#5e6063"]} />
			<group {...props} dispose={null}>
				<spotLight
					name="Spot Light"
					castShadow
					intensity={1.5}
					angle={0.56}
					penumbra={0.1}
					decay={0}
					distance={1614}
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
					shadow-camera-fov={119.99999999999999}
					shadow-camera-near={100}
					shadow-camera-far={100000}
					color="#62c5fb"
					position={[338.21, 164.28, 0]}
					rotation={[0, 0, -0.81]}
				/>
				<PerspectiveCamera
					name="Camera"
					makeDefault={true}
					far={100000}
					near={70}
					fov={45}
					position={[280.49, 393.11, 828.89]}
					rotation={[-0.51, 0.3, 0.16]}
					scale={1}
				/>
				<group name="badminton court" position={[1, -1, 0]}>
					<mesh name="6.007" geometry={nodes["6.007"].geometry} material={nodes["6.007"].material} castShadow receiveShadow />
					<mesh name="6.008" geometry={nodes["6.008"].geometry} material={nodes["6.008"].material} castShadow receiveShadow />
					<mesh name="13.006" geometry={nodes["13.006"].geometry} material={nodes["13.006"].material} castShadow receiveShadow />
					<mesh name="13.008" geometry={nodes["13.008"].geometry} material={nodes["13.008"].material} castShadow receiveShadow />
					<mesh name="13.009" geometry={nodes["13.009"].geometry} material={nodes["13.009"].material} castShadow receiveShadow />
					<mesh name="13.010" geometry={nodes["13.010"].geometry} material={nodes["13.010"].material} castShadow receiveShadow />
					<mesh name="6.009" geometry={nodes["6.009"].geometry} material={nodes["6.009"].material} castShadow receiveShadow />
					<mesh name="6.010" geometry={nodes["6.010"].geometry} material={nodes["6.010"].material} castShadow receiveShadow />
					<mesh name="13.011" geometry={nodes["13.011"].geometry} material={nodes["13.011"].material} castShadow receiveShadow />
					<mesh name="6.011" geometry={nodes["6.011"].geometry} material={nodes["6.011"].material} castShadow receiveShadow />
					<mesh name="6.012" geometry={nodes["6.012"].geometry} material={nodes["6.012"].material} castShadow receiveShadow />
					<mesh name="13.012" geometry={nodes["13.012"].geometry} material={nodes["13.012"].material} castShadow receiveShadow />
					<mesh
						name="Circle.002"
						geometry={nodes["Circle.002"].geometry}
						material={nodes["Circle.002"].material}
						castShadow
						receiveShadow
						position={[0, 4.45, 0]}
					/>
					<mesh
						name="Circle.003"
						geometry={nodes["Circle.003"].geometry}
						material={nodes["Circle.003"].material}
						castShadow
						receiveShadow
						position={[0, 4.45, 0]}
					/>
					<mesh
						name="courtbig.001 2"
						geometry={nodes["courtbig.001 2"].geometry}
						material={nodes["courtbig.001 2"].material}
						castShadow
						receiveShadow
						position={[7.23, -80.55, -9.7]}
						scale={[1.22, 0.07, 1.18]}
					/>
					<mesh
						name="courtbig.001"
						geometry={nodes["courtbig.001"].geometry}
						material={nodes["courtbig.001"].material}
						castShadow
						receiveShadow
						position={[0, 0, -1.47]}
					/>
					<mesh name="Plane.001" geometry={nodes["Plane.001"].geometry} material={nodes["Plane.001"].material} castShadow receiveShadow />
					<mesh
						name="badminton_court"
						geometry={nodes.badminton_court.geometry}
						material={nodes.badminton_court.material}
						castShadow
						receiveShadow
					/>
				</group>
				<directionalLight
					name="Directional Light"
					castShadow
					intensity={0.7}
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
					shadow-camera-near={-10000}
					shadow-camera-far={100000}
					shadow-camera-left={-500}
					shadow-camera-right={500}
					shadow-camera-top={500}
					shadow-camera-bottom={-500}
					position={[244.14, 300, 300]}
				/>
				<hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
			</group>
		</>
	);
}