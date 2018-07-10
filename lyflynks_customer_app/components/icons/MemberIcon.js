import React from "react";
import Svg, { Path, Defs, G, Circle, Use } from "react-native-svg";

const MemberIcon = props => (
  <Svg {...props} width={props.style.width || 18} height={props.style.height || 22} viewBox="0 0 18 22">
    <Path d="M8.907 11.63h.14c1.281-.022 2.318-.481 3.083-1.359 1.684-1.934 1.404-5.248 1.374-5.564-.11-2.375-1.212-3.51-2.122-4.04C10.704.27 9.912.055 9.03.036h-.074c-.486 0-1.44.081-2.353.611-.919.53-2.039 1.666-2.148 4.059-.03.316-.31 3.63 1.373 5.564.761.878 1.798 1.337 3.08 1.359zM5.622 4.818c0-.013.004-.027.004-.036.145-3.194 2.37-3.537 3.324-3.537h.053c1.18.027 3.188.517 3.324 3.537 0 .014 0 .027.005.036.004.031.31 3.06-1.08 4.656-.552.632-1.287.944-2.253.953h-.044c-.962-.01-1.702-.32-2.249-.953-1.386-1.586-1.089-4.63-1.084-4.656zm12.343 12.31c.004.23.009 1.42-.21 2.013a.593.593 0 0 1-.227.28c-.131.085-3.276 2.13-8.538 2.13-5.262 0-8.407-2.04-8.538-2.13a.568.568 0 0 1-.228-.28c-.231-.597-.227-1.787-.223-2.018v-.014c.005-.035.005-.07.005-.111.026-.878.083-2.94 1.98-3.604.014-.004.027-.009.045-.013 1.981-.513 3.613-1.67 3.63-1.684a.583.583 0 0 1 .822.147.608.608 0 0 1-.144.837c-.074.05-1.815 1.288-3.993 1.858-1.02.37-1.133 1.479-1.164 2.495 0 .04-.004.075-.004.111-.009.4.022 1.02.092 1.377.713.41 3.508 1.83 7.715 1.83 4.226 0 7.003-1.416 7.712-1.826.07-.356.096-.976.092-1.376-.005-.036-.005-.072-.005-.112-.03-1.016-.144-2.125-1.163-2.495-2.178-.57-3.92-1.804-3.994-1.857a.608.608 0 0 1-.144-.838.583.583 0 0 1 .822-.147c.018.013 1.658 1.172 3.63 1.684l.044.013c1.899.66 1.956 2.722 1.982 3.605 0 .04.004.075.004.11v.014z" stroke={props.style.color || "#696969"}></Path>
  </Svg>
);

export default MemberIcon;
