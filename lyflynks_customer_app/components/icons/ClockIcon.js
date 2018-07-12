import React from "react";
import {Svg} from "expo";
const { Path } = Svg;


const ClockIcon = props => (
  <Svg {...props} width={props.width || 22} height={props.height || 22} viewBox="0 0 22 22">
    <Path d="M18.438 3.174a10.774 10.774 0 0 1 3.165 7.661c0 2.897-1.123 5.613-3.165 7.66a10.706 10.706 0 0 1-7.636 3.176 10.706 10.706 0 0 1-7.637-3.175A10.781 10.781 0 0 1 0 10.836c0-2.893 1.123-5.614 3.16-7.662a10.754 10.754 0 0 1 9.862-2.94.81.81 0 0 1 .622.956.802.802 0 0 1-.944.628A9.146 9.146 0 0 0 4.31 4.32c-3.58 3.592-3.58 9.439 0 13.03 3.582 3.593 9.41 3.593 12.991 0 3.393-3.403 3.572-8.823.547-12.438L15.98 6.785a.809.809 0 0 1-1.142 0 .815.815 0 0 1 0-1.145l2.458-2.466a.809.809 0 0 1 1.141 0zm-7.64.122c.442 0 .805.363.8.808v6.722c0 .027 0 .054-.004.081 0 .013-.005.022-.005.036 0 .018 0 .031-.004.045a.13.13 0 0 1-.01.04c-.003.014-.003.023-.008.036l-.013.04c-.005.014-.01.023-.014.037-.004.013-.013.022-.018.036-.004.013-.013.022-.018.035-.004.014-.013.027-.017.036-.01.014-.014.027-.023.036-.009.014-.018.023-.027.036a.092.092 0 0 1-.018.027c-.017.018-.035.04-.053.058l-3.452 3.463a.802.802 0 0 1-.568.238.803.803 0 0 1-.569-.238.815.815 0 0 1 0-1.145l3.214-3.225V4.104a.81.81 0 0 1 .806-.808z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default ClockIcon;
