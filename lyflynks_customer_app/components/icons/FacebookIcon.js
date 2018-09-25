import React from "react";
import Svg,{ Path, G, Circle }  from 'react-native-svg';

const FacebookIcon = props => (
  <Svg {...props} width={props.style.width || 23} height={props.style.height || 23} viewBox="0 0 23 23">
    <G transform={{translateX: 1.001, translateY: 1}} fill={props.color || "none"} fillRule="evenodd">
      <Circle stroke="#737373" fill={props.color || "#FFF"} cx="10.5" cy="10.5" r="10.5"></Circle>
      <Path d="M13.514 6.217c-.377-.1-.81-.167-1.205-.167-.49 0-1.544.283-1.544.833V8.2h2.504v2.217h-2.504v6.116H8.243v-6.116H7V8.2h1.243V7.083C8.243 5.4 9.109 4 11.198 4c.716 0 1.996.033 2.692.25l-.376 1.967z" fill={props.color || "#696969"}></Path>
    </G>
  </Svg>
);

export default FacebookIcon;
