import React from "react";
import {Svg} from "expo";
const { G, Path } = Svg;

const UpDownGreen = props => (
<Svg width={props.width || 55} height={props.height || 51} viewBox="0 0 55 51">
  <G fill="#00A68C" fill-rule="evenodd" stroke="#00A68C"><Path d="M41.848 5.091L42 50.993 39.163 51l-.154-46.21L26.976 16 25 14.237 40.293 0 55 14.102l-1.902 1.83-11.25-10.841zM15.99 46.164L28.025 35 30 36.755 14.707 51 0 36.89l1.902-1.822 11.251 10.795L13 .008 15.837 0l.154 46.164z"></Path></G></Svg>
);

export default UpDownGreen;
