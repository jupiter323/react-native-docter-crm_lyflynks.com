import React from "react";
import {Svg} from "expo";
const { Path, Defs, G, Use } = Svg;


const CloseIcon = props => (
  <Svg {...props} width={props.style.width || 28} height={props.style.height || 28} viewBox="0 0 28 28">
    <Path d="M9.323 10.137L.172.985A.565.565 0 0 1 0 .578.582.582 0 0 1 .99.17l9.245 9.244L19.478.17a.577.577 0 0 1 .82 0 .577.577 0 0 1 0 .82l-9.153 9.152 9.151 9.152a.565.565 0 0 1 .172.408.582.582 0 0 1-.99.407l-9.245-9.244L.99 20.11a.577.577 0 0 1-.82 0 .577.577 0 0 1 0-.82l9.153-9.152z" id="b" fill={props.color || undefined}></Path>
  </Svg>
);

export default CloseIcon;
