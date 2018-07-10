import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from "react-native-svg";

const TransportIcon = props => (
  <Svg {...props} width={props.style.width || 20} height={props.style.height || 24} viewBox="0 0 20 24">
    <G stroke={props.color || "#696969"} fill={props.style.color || "none"} fillRule="evenodd">
      <Path d="M1 6.688v12.91c0 .583.478 1.058 1.065 1.058h9.264c0-.031.692.073.685-.088-.01-.211-.689-.09-.69-.133h-9.26a.841.841 0 0 1-.842-.838V6.91h17.426v12.688a.841.841 0 0 1-.843.838l-3.273.014c0 .073.002.147.004.22l3.269-.013c.587 0 1.065-.475 1.065-1.059V6.688H1zM1.222 6.214h8.363V1.221h-7.52a.841.841 0 0 0-.843.837v4.156zm8.586.221H1V2.058C1 1.475 1.478 1 2.065 1h7.743v5.435zM10.284 6.214h8.364V2.058a.841.841 0 0 0-.843-.837h-7.52v4.993zm8.586.221h-8.808V1h7.743c.587 0 1.065.475 1.065 1.058v4.377z" fill={props.style.color || "#696969"}></Path>
      <Path d="M5.213 20.573v1.656c0 .623-.513.911-1.14.911-.626 0-1.138-.288-1.138-.91v-1.657M16.824 20.518v1.656c0 .623-.513.911-1.14.911-.626 0-1.138-.288-1.138-.911v-1.656" fill={props.style.color || undefined}></Path>
      <Path d="M10.385 16.834a.323.323 0 0 1-.325-.322v-2.58H7.464a.323.323 0 0 1-.325-.323c0-.178.146-.322.325-.322h2.596v-2.58c0-.179.145-.323.325-.323.179 0 .324.144.324.323v2.58h2.596c.18 0 .325.144.325.322a.323.323 0 0 1-.325.323H10.71v2.58a.323.323 0 0 1-.324.322z" fill={props.style.color || "#696969"}></Path>
    </G>
  </Svg>
);

export default TransportIcon;
