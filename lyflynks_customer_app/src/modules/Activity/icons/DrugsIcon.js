import React from "react";
import Svg,{ Path }  from 'react-native-svg';


const DrugsIcon = props => (
  <Svg {...props} width={props.style.width || 22} height={props.style.height || 22} viewBox="0 0 22 22">
    <Path d="M8.486 8.258l3.488-3.488a.674.674 0 1 1 .954.953L9.44 9.211l6.118 6.119a.673.673 0 0 1 0 .953l-3.574 3.574a7.194 7.194 0 0 1-.04.04 6.95 6.95 0 0 1-4.948 2.05 6.951 6.951 0 0 1-4.947-2.05A6.95 6.95 0 0 1 0 14.95a6.95 6.95 0 0 1 2.05-4.947l.007-.007.032-.033 3.575-3.574a.688.688 0 0 1 .007-.008l4.314-4.314a7.004 7.004 0 0 1 9.894 0 7.004 7.004 0 0 1 0 9.895l-2.013 2.013a.674.674 0 1 1-.953-.953l2.013-2.014a5.611 5.611 0 0 0 1.654-3.993 5.611 5.611 0 0 0-1.654-3.994 5.655 5.655 0 0 0-7.988 0L7.093 6.865l1.393 1.393z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default DrugsIcon;