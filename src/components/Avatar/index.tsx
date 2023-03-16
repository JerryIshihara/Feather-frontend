import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BigHead } from "@bigheads/core";

interface Props {
	size?: number;
}

const Avatar: React.FC<Props> = props => {
	const navigate = useNavigate();
	return (
		<div style={{ height: props.size || 60, width: props.size || 60 }} onClick={() => navigate("/dashboard")}>
			<BigHead
				accessory="shades"
				body="chest"
				circleColor="blue"
				clothing="tankTop"
				clothingColor="black"
				eyebrows="angry"
				eyes="wink"
				facialHair="mediumBeard"
				graphic="vue"
				hair="short"
				hairColor="black"
				hat="none"
				hatColor="green"
				lashes={false}
				lipColor="purple"
				mask={true}
				faceMask={true}
				mouth="open"
				skinTone="brown"
			/>
		</div>
	);
};

export default Avatar;
