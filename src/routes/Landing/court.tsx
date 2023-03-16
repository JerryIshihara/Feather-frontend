import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const courtCoord = [
	// x, y, z
	{ start: [-10, -22, 0], end: [10, -22, 0] },
	{ start: [-10, -19.4, 0], end: [10, -19.4, 0] },
	{ start: [-10, -6.4, 0], end: [10, -6.4, 0] },
	{ start: [-10, -22, 0], end: [-10, 0, 0] },
	{ start: [-8.4, -22, 0], end: [-8.4, 0, 0] },
	{ start: [0, -22, 0], end: [0, -6.4, 0] },
	{ start: [8.4, -22, 0], end: [8.4, 0, 0] },
	{ start: [10, -22, 0], end: [10, 0, 0] },
];
const netCoord = [
	// x, y, z
	{ start: [-10, 0, 5.1], end: [10, 0, 5.1] },
	{ start: [-10, 0, 0], end: [-10, 0, 5.1] },
	{ start: [10, 0, 0], end: [10, 0, 5.1] },
	{ start: [-10, 0, 2.5], end: [10, 0, 2.5] },
];

const rotate = (point: number[], theta: number) => {
	const [x, y, z] = point;
	theta = theta / 2;
	const _x = x * Math.cos(theta) - y * Math.sin(theta);
	const _y = x * Math.sin(theta) + y * Math.cos(theta);
	return [_x, _y, z];
};

interface LineProps {
	start: number[];
	end: number[];
	color: string;
}
const Line = (props: LineProps) => {
	const ref = useRef<THREE.Line>();
	let { start, end } = props;
	start = start.map(p => p / 7);
	end = end.map(p => p / 7);
	useFrame(({ clock }) => {
		if (ref.current) {
			ref.current.geometry.setFromPoints([start, end].map(point => new THREE.Vector3(...rotate(point, clock.getElapsedTime()))));
		}
	});
	return (
		<line ref={ref as any}>
			<bufferGeometry />
			<lineBasicMaterial color={props.color} />
		</line>
	);
};

// interface PlaneProps {
// 	position: [x: number, y: number, z: number];
// 	// color: string;
// }
// const Plane = (props: PlaneProps) => {
// 	const ref = useRef<THREE.Mesh>();
// 	const [x, y, z] = props.position;
// 	// let { start, end } = props;
// 	// start = start.map(p => p / 7);
// 	// end = end.map(p => p / 7);
// 	useFrame(({ clock }) => {
// 		const [_x, _y, _z] = rotate([x, y, z], clock.getElapsedTime());
// 		if (ref.current) {
// 			ref.current.rotation.x = _x;
// 			ref.current.rotation.y = _y;
// 			ref.current.rotation.z = _z;
// 		}
// 	});
// 	return (
// 		<mesh position={props.position} ref={ref as any}>
// 			<planeBufferGeometry attach="geometry" args={[22 / 7, 20 / 7]} />
// 			<meshPhongMaterial attach="material" color="green" />
// 		</mesh>
// 	);
// };

const Court3D = () => {
	const canvasRef = useRef(null);
	return (
		<div style={{ flex: 1 }}>
			<Canvas
				ref={canvasRef}
				// className="output_canvas"
				style={{
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					top: "100px",
					left: 0,
					right: 0,
					width: "100%",
					height: 1000,
					zIndex: -10,
				}}
				camera={{ position: [0, -5, 1] }}
			>
				<ambientLight intensity={0.7} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
				<pointLight position={[-10, -10, -10]} />
				{courtCoord.map(({ start, end }, index) => (
					<Line key={index} start={[start[0] + 1/10, start[1] + 1/10, start[2] - 1/10]} end={[end[0] + 1/10, end[1] + 1/10, end[2] - 1/10]} color={"white"} />
				))}
				{courtCoord.map(({ start, end }, index) => (
					<Line
						key={index}
						start={[start[0] + 1/10, -start[1] - 1/10, start[2] - 1/10]}
						end={[end[0] + 1/10, -end[1] - 1/10, end[2] - 1/10]}
						color={"white"}
					/>
				))}
				{courtCoord.map(({ start, end }, index) => (
					<Line key={index} start={start} end={end} color={"hotpink"} />
				))}
				{courtCoord.map(({ start, end }, index) => (
					<Line key={index} start={[start[0], -start[1], start[2]]} end={[end[0], -end[1], end[2]]} color={"cyan"} />
				))}
				{netCoord.map(({ start, end }, index) => (
					<Line key={index} start={[start[0], -start[1], start[2]]} end={[end[0], -end[1], end[2]]} color={"white"} />
				))}
				{/* <Plane position={[-10 / 7, -22 / 7, 0]} /> */}
			</Canvas>
		</div>
	);
};

export default Court3D;
