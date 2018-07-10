import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from "react-native-svg";

const CloseIcon = props => (
  <Svg {...props} width={props.width || 28} height={props.height || 28} viewBox="0 0 28 28">
    <Defs fill={props.color || undefined}>
      <Path d="M9.323 10.137L.172.985A.565.565 0 0 1 0 .578.582.582 0 0 1 .99.17l9.245 9.244L19.478.17a.577.577 0 0 1 .82 0 .577.577 0 0 1 0 .82l-9.153 9.152 9.151 9.152a.565.565 0 0 1 .172.408.582.582 0 0 1-.99.407l-9.245-9.244L.99 20.11a.577.577 0 0 1-.82 0 .577.577 0 0 1 0-.82l9.153-9.152z" id="b" fill={props.color || undefined}></Path>
    </Defs>
    <G transform="translate(4 2)" fill={props.color || "none"} fillRule="evenodd">
      <Use fill={props.color || "#000"} filter="url(#a)" xlink:href="#b"></Use>
      <Use fill={props.color || "#696969"} xlink:href="#b"></Use>
    </G>
  </Svg>
);

export default CloseIcon;
