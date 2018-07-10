import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from "react-native-svg";

const BurgerIcon = props => (
  <Svg {...props} width={props.width || 20} height={props.height || 21} viewBox="0 0 20 21">
    <Path d="M0 0h20v2.88H0V0zm0 8.642h14.286v2.881H0v-2.88zm0 8.643h20v2.88H0v-2.88z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default BurgerIcon;
