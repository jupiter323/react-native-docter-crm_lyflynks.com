import React from "react";


import Svg,{ Path }from 'react-native-svg';


const SearchIcon = props => (
  <Svg {...props} width={props.style.width || 20} height={props.style.height || 20} viewBox="0 0 20 20">
    <Path d="M19.251 15.625l-1.769-1.77a.747.747 0 0 0-1.052 0 .748.748 0 0 0 0 1.052l1.77 1.77a1.077 1.077 0 0 1-.763 1.837 1.08 1.08 0 0 1-.763-.313l-3.39-3.393 2.045-2.047a.747.747 0 0 0 0-1.052.746.746 0 0 0-1.052 0l-.763.763-1.072-1.073c2.219-2.749 2.054-6.797-.499-9.348A6.951 6.951 0 0 0 6.993 0a6.948 6.948 0 0 0-4.948 2.051c-2.727 2.728-2.727 7.173 0 9.901a6.951 6.951 0 0 0 4.949 2.051 6.96 6.96 0 0 0 4.396-1.552l1.073 1.074-.763.763a.737.737 0 0 0 0 1.048l3.918 3.921A2.63 2.63 0 0 0 17.44 20c.656 0 1.311-.252 1.81-.751a2.567 2.567 0 0 0 0-3.624zm-8.347-4.73a5.476 5.476 0 0 1-3.898 1.614 5.476 5.476 0 0 1-3.897-1.613 5.525 5.525 0 0 1 0-7.8 5.476 5.476 0 0 1 3.897-1.614c1.473 0 2.858.573 3.898 1.613a5.525 5.525 0 0 1 0 7.8z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default SearchIcon;
