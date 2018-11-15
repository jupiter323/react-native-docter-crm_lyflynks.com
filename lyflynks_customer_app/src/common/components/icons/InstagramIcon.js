import React from "react";


import Svg,{ Path, Defs, G, Circle, Use } from 'react-native-svg';


const InstagramIcon = props => (
  <Svg {...props} width={props.style.width || 23} height={props.style.height || 23} viewBox="0 0 23 23">
    <G transform="translate(1.001 1)" fill={props.color || "none"} fillRule="evenodd">
      <Circle stroke="#6B6B6B" fill={props.color || "#FFF"} cx="10.5" cy="10.5" r="10.5"></Circle>
      <Path d="M14.866 14.723H6.409a.353.353 0 0 1-.352-.353V9.083h1.41c-.184.264-.246.757-.246 1.07a3.43 3.43 0 0 0 6.86 0c0-.313-.045-.799-.272-1.07h1.409v5.287a.353.353 0 0 1-.352.353M10.65 7.989c1.197 0 2.168.97 2.168 2.164 0 1.195-.97 2.164-2.168 2.164a2.166 2.166 0 0 1-2.168-2.164c0-1.195.97-2.164 2.168-2.164m2.805-2.079h1.057c.195 0 .353.158.353.353V7.32a.353.353 0 0 1-.353.353h-1.057a.353.353 0 0 1-.352-.353V6.262c0-.194.158-.352.352-.352m1.479-1.41H6.34C5.6 4.5 5 5.099 5 5.838v8.604c0 .74.6 1.338 1.34 1.338h8.595c.74 0 1.34-.599 1.34-1.338V5.838c0-.74-.6-1.338-1.34-1.338" fill={props.color || "#6B6B6B"}></Path>
    </G>
  </Svg>
);

export default InstagramIcon;
