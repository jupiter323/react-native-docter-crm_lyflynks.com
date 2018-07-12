import React from "react";
import {Svg} from "expo";
const { Path } = Svg;


const AddIcon = props => (
  <Svg {...props} width={props.width || 23} height={props.height || 23} viewBox="0 0 23 23">
    <Path d="M12.352 12.36v2.664a.812.812 0 0 1-.809.809.805.805 0 0 1-.806-.806v-2.664H8.073a.805.805 0 0 1-.806-.806.812.812 0 0 1 .809-.81l2.664.001V8.084a.813.813 0 0 1 .81-.81.813.813 0 0 1 .808.81v2.664h2.665a.812.812 0 0 1 .809.81.796.796 0 0 1-.816.802h-2.664zm10.204-.803c0 2.938-1.144 5.7-3.222 7.778a10.928 10.928 0 0 1-7.778 3.223 10.93 10.93 0 0 1-7.778-3.223 10.93 10.93 0 0 1-3.223-7.778c0-2.938 1.145-5.7 3.223-7.778A10.928 10.928 0 0 1 11.555.556c3.73 0 7.175 1.866 9.212 4.994a.808.808 0 0 1-.235 1.116.809.809 0 0 1-1.116-.235 9.367 9.367 0 0 0-7.864-4.26c-5.177 0-9.386 4.209-9.385 9.386a9.335 9.335 0 0 0 2.753 6.636 9.333 9.333 0 0 0 6.64 2.75c4.903 0 8.941-3.778 9.35-8.577h-2.709a.812.812 0 0 1-.809-.809.812.812 0 0 1 .81-.808l3.549.003c.444 0 .805.361.805.805z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default AddIcon;
