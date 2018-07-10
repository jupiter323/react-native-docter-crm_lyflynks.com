import React from "react";
import {Svg} from "expo";
const { Path, Defs, G, Circle, Use } = Svg;


const LockIcon = props => (
  <Svg {...props} width={props.style.width || 17} height={props.style.height || 21} viewBox="0 0 17 21">
    <Path d="M15.237 9.152h-.31V6.416C14.928 2.88 12.048 0 8.498 0c-3.543 0-6.43 2.875-6.43 6.416 0 .326.263.587.59.587a.585.585 0 0 0 .588-.587c0-2.888 2.354-5.241 5.253-5.241 2.895 0 5.253 2.348 5.253 5.24v2.737H1.763c-.628 0-1.138.509-1.138 1.135v7.312A3.41 3.41 0 0 0 4.034 21h8.932a3.41 3.41 0 0 0 3.409-3.401v-7.312c0-.626-.51-1.135-1.138-1.135zm-.039 8.447a2.231 2.231 0 0 1-2.232 2.227H4.038a2.231 2.231 0 0 1-2.232-2.227v-7.273h13.392V17.6zm-6.26-.099a2.19 2.19 0 0 0 2.187-2.188 2.19 2.19 0 0 0-2.188-2.187 2.19 2.19 0 0 0-2.187 2.187A2.19 2.19 0 0 0 8.937 17.5zm0-3.21a1.02 1.02 0 0 1 0 2.04 1.02 1.02 0 0 1 0-2.04z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default LockIcon;
