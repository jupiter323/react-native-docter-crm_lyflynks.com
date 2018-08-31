import React from "react";
import {Svg} from "expo";
const { Path, Defs, G, Circle, Use } = Svg;


const NextIcon = props => (
  <Svg {...props} width={props.style.width || 19} height={props.style.height || 29} viewBox="0 0 19 29">
    <Defs fill={props.color || undefined}>
      <Path d="M1.045.18a.61.61 0 0 0-.865 0 .61.61 0 0 0 0 .865l9.763 9.764L.18 20.573a.615.615 0 1 0 .43 1.046.596.596 0 0 0 .43-.181l10.2-10.199a.608.608 0 0 0 .004-.86L1.045.18z" id="b" fill={props.color || undefined}></Path>
    </Defs>
    <G transform={{ translateX: 4, translateY: 2}} fill={props.color || "none"} fillRule="evenodd">
      <Use fill={props.color || "#000"} filter="url(#a)"></Use>
      <Use fill={props.color || "#696969"}></Use>
    </G>
  </Svg>
);

export default NextIcon;
