import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from "react-native-svg";

const UpdateIcon = props => (
  <Svg {...props} width={props.width || 23} height={props.height || 22} viewBox="0 0 23 22">
    <G stroke="#727272" fill={props.color || "none"} fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19.465 14.98a9.946 9.946 0 0 0 .53-6.58C18.622 3.174 13.363.073 8.245 1.473 3.13 2.873.092 8.244 1.463 13.47c1.372 5.226 6.631 8.327 11.749 6.927a9.489 9.489 0 0 0 3.785-2.044" strokeWidth="2" fill={props.color || undefined}></Path>
      <Path d="M22.837 13.112l-3.296 2.056-2.334-3.28" fill={props.color || undefined}></Path>
    </G>
  </Svg>
);

export default UpdateIcon;
