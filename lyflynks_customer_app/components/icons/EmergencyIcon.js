import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from "react-native-svg";

const EmergencyIcon = props => (
  <Svg {...props} width={props.style.width || 20} height={props.style.height || 25} viewBox="0 0 20 25">
    <Defs fill={props.style.color || undefined}>
      <Path id="a" d="M0 .22h18.974v16.437H0z" fill={props.style.color || undefined}></Path>
    </Defs>
    <G fill={props.style.color || "none"} fillRule="evenodd">
      <G transform="translate(.453 7.409)" fill={props.style.color || undefined}>
        <Path d="M16.967 13.136h-.464V6.37c0-3.397-3.141-6.15-7.016-6.15-3.874 0-7.015 2.753-7.015 6.15v2.966a1.806 1.806 0 0 1 .585.026V6.371c0-3.114 2.879-5.638 6.43-5.638 3.552 0 6.431 2.524 6.431 5.638v6.765H3.056v-1.288a1.789 1.789 0 0 1-.584.026v1.262h-.465C.898 13.136 0 13.925 0 14.897c0 .972.899 1.76 2.007 1.76h1.455a1.31 1.31 0 0 1 .013-.513H2.007c-.786 0-1.423-.56-1.423-1.249 0-.688.638-1.246 1.423-1.247h14.96c.787 0 1.424.56 1.423 1.249 0 .688-.637 1.247-1.423 1.247H6.637c.022.171.011.346-.034.513h10.364c1.11 0 2.008-.79 2.007-1.762 0-.971-.898-1.759-2.007-1.76" stroke={props.color || "#696969"} fill={props.style.color || "#727272"} mask="url(#b)"></Path>
      </G>
      <Path d="M10.232 4.285V1.55c0-.141-.13-.256-.292-.256-.162 0-.292.115-.292.256v2.735c0 .141.13.256.292.256.161 0 .292-.115.292-.256M15.766 6.335l2.358-1.94a.235.235 0 0 0 .014-.363.323.323 0 0 0-.414-.011l-2.359 1.94a.235.235 0 0 0-.013.362c.11.104.296.109.414.012M4.313 6.404c.161 0 .292-.116.291-.257a.243.243 0 0 0-.092-.186l-2.36-1.94a.322.322 0 0 0-.412-.012.235.235 0 0 0-.014.362c.01.009.019.017.03.024l2.358 1.94a.315.315 0 0 0 .199.069" stroke={props.color || "#696969"} fill={props.style.color || "#000"}></Path>
    </G>
  </Svg>
);

export default EmergencyIcon;
