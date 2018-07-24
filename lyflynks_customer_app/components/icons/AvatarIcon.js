import React from "react";
import {Svg} from "expo";
const { Path, Defs, G, Circle, Use } = Svg;


const AvatarIcon = props => (
  <Svg {...props} width={props.style.width || 37} height={props.style.height || 37} viewBox="0 0 37 37">
    <Defs fill={props.color || undefined}>
      <Circle id="a" cx="18.5" cy="18.5" r="18.5" fill={props.color || undefined}></Circle>
    </Defs>
    <G fill={props.color || "none"} fillRule="evenodd">
      <Use fill={props.color || "#A1A1A1"}></Use>
      <G mask="url(#b)" fill={props.color || "#FFF"}>
        <Path d="M25.402 27.775a1.328 1.328 0 0 0-.081 1.874 9.595 9.595 0 0 1 2.53 6.498v5.703a.491.491 0 0 1-.487.487H9.135a.491.491 0 0 1-.487-.487v-5.703c0-5.296 4.309-9.597 9.598-9.597 4.84 0 8.779-3.94 8.779-8.779S23.093 9 18.253 9s-8.778 3.94-8.778 8.779c0 1.446.361 2.884 1.04 4.153.346.65 1.15.885 1.8.538.649-.346.885-1.15.538-1.8a6.126 6.126 0 0 1 5.4-9.015 6.127 6.127 0 0 1 6.123 6.124 6.127 6.127 0 0 1-6.123 6.123C11.496 23.902 6 29.398 6 36.155v5.703A3.145 3.145 0 0 0 9.142 45h18.23a3.145 3.145 0 0 0 3.142-3.142v-5.703c0-3.084-1.15-6.027-3.239-8.3a1.328 1.328 0 0 0-1.873-.08z" fill={props.color || undefined}></Path>
      </G>
    </G>
  </Svg>
);

export default AvatarIcon;
