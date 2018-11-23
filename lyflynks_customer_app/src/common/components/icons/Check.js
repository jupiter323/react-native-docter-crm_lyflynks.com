import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from 'react-native-svg';



const Check = props => (
  <Svg width={props.style.width || 23} height={props.style.height || 23} viewBox="0 0 23 23">
    <G fill={props.color || "#696969"} fillRule="evenodd">
      <Path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </G>
  </Svg>
);

export default Check;
