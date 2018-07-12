import React from "react";
import {Svg} from "expo";
const { Path, Defs, G, Use } = Svg;


const BackIcon = props => (
  <Svg {...props} width={props.width || 38} height={props.height || 29} viewBox="0 0 38 29">
    <Defs fill={props.color || undefined}>
      <Path d="M20.312 9.134H4.844l5.976-6.461c.552-.597.552-1.57 0-2.174a1.353 1.353 0 0 0-2.01 0L.414 9.586c-.552.596-.552 1.568 0 2.173l8.396 9.078c.276.298.638.452 1 .452.363 0 .726-.154 1.002-.452.552-.596.552-1.568 0-2.173l-5.968-6.462h15.468c.78 0 1.419-.69 1.419-1.534 0-.844-.639-1.534-1.42-1.534z" id="b" fill={props.color || undefined}></Path>
      <Path d="M29.204 9.134h-3.248c-.78 0-1.419.69-1.419 1.534 0 .844.639 1.534 1.42 1.534h3.247c.789 0 1.42-.69 1.42-1.534 0-.844-.639-1.534-1.42-1.534z" id="d" fill={props.color || undefined}></Path>
    </Defs>
    <G fill={props.color || "none"} fillRule="evenodd">
      <G transform="translate(4 2.13)" fill={props.color || undefined}>
        <Use fill={props.color || "#000"} filter="url(#a)"></Use>
        <Use fill={props.color || "#696969"}></Use>
      </G>
      <G transform="translate(4 2.13)" fill={props.color || undefined}>
        <Use fill={props.color || "#000"} filter="url(#c)"></Use>
        <Use fill={props.color || "#696969"}></Use>
      </G>
    </G>
  </Svg>
);

export default BackIcon;
