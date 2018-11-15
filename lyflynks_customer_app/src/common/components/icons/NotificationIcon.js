import React from "react";
import Svg,{ Path, Defs, G, Circle, Use } from 'react-native-svg';


const NotificationIcon = props => (
  <Svg {...props} width={props.style.width || 26} height={props.style.height || 29} viewBox="0 0 26 29">
    <Defs fill={props.color || undefined}>
      <Path d="M16.935 15.604c-.135-.193-.266-.373-.393-.556a16.354 16.354 0 0 0-.197-.287c-.341-.5-.696-1.018-1.02-1.535-.569-.907-.897-1.887-1.006-2.999a23.001 23.001 0 0 0-.359-2.416c-.223-1.1-.726-1.967-1.496-2.58-.875-.705-2.004-.94-3.186-.666-.691.162-1.4-.099-1.724-.629a1.545 1.545 0 0 1-.227-.855c.021-.826.73-1.515 1.575-1.54a1.631 1.631 0 0 1 1.562 1.022.788.788 0 0 0 1.015.445.76.76 0 0 0 .455-.992C11.453.776 10.214-.034 8.854 0c-.81.021-1.58.35-2.162.92a3.065 3.065 0 0 0-.94 2.112 3.07 3.07 0 0 0 .45 1.69c.687 1.12 2.07 1.655 3.444 1.334.49-.115 1.199-.145 1.82.355.49.394.8.946.954 1.694.149.736.263 1.493.337 2.258a8.337 8.337 0 0 0 1.23 3.661c.34.54.704 1.07 1.054 1.583.066.094.131.192.197.286.135.201.28.398.416.586.179.248.35.488.507.727.066.099.17.283.149.407-.018.094-.114.226-.28.363-.337.283-.78.45-1.212.582-1.379.432-2.91.676-4.83.766H7.9c-1.917-.086-3.452-.33-4.83-.766-.43-.137-.876-.3-1.213-.582-.166-.14-.262-.27-.28-.363-.022-.124.088-.308.15-.407.16-.243.327-.479.506-.727.136-.188.28-.385.416-.586.066-.094.131-.192.197-.286.35-.513.713-1.044 1.055-1.583a8.246 8.246 0 0 0 1.23-3.66 21.09 21.09 0 0 1 .336-2.259c.061-.308.153-.586.271-.83a.766.766 0 0 0-.376-1.026.8.8 0 0 0-1.05.368c-.17.354-.306.757-.394 1.184-.162.787-.28 1.6-.359 2.417a6.661 6.661 0 0 1-1.006 2.998c-.324.517-.678 1.035-1.02 1.536-.065.094-.13.192-.196.286-.127.184-.258.363-.394.556-.18.252-.368.513-.547.783-.648 1.01-.499 1.993.433 2.775.547.462 1.168.698 1.759.886 1.518.479 3.19.744 5.26.838h2.192c2.07-.094 3.74-.359 5.26-.838.59-.184 1.211-.42 1.758-.886.928-.786 1.08-1.77.424-2.767-.18-.27-.363-.53-.547-.782z" id="b" fill={props.color || undefined}></Path>
    </Defs>
    <G transform={{translateX: 4, translateY:2}} fill={props.color || "none"} fillRule="evenodd">
      <Use fill={props.color || "#000"} filter="url(#a)"></Use>
      <Use fill={props.color || "#696969"}></Use>
    </G>
  </Svg>
);

export default NotificationIcon;
