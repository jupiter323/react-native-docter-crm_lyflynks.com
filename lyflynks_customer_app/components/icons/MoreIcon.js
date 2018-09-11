import React from "react";
import {Svg} from "react-native-svg";
const { Path, Defs, G, Circle, Use } = Svg;


const MoreIcon = props => (
  <Svg {...props} width={props.style.width || 5} height={props.style.height || 20} viewBox="0 0 5 20">
    <G fill={props.color || "#B1B3B6"} fillRule="evenodd">
      <Path d="M2.5 7.5C1.123 7.5 0 8.62 0 10s1.123 2.5 2.5 2.5c.233 0 .423-.19.423-.423a.424.424 0 0 0-.423-.423A1.657 1.657 0 0 1 .846 10c0-.912.742-1.654 1.654-1.654.912 0 1.654.742 1.654 1.654 0 .395-.14.775-.397 1.074a.422.422 0 0 0 .047.597.422.422 0 0 0 .597-.047C4.789 11.172 5 10.594 5 10c0-1.377-1.12-2.5-2.5-2.5zM2.5 15C1.123 15 0 16.12 0 17.5S1.123 20 2.5 20c.233 0 .423-.19.423-.423a.424.424 0 0 0-.423-.423A1.657 1.657 0 0 1 .846 17.5c0-.912.742-1.654 1.654-1.654.912 0 1.654.742 1.654 1.654 0 .395-.14.775-.397 1.074a.422.422 0 0 0 .047.597.422.422 0 0 0 .597-.047c.388-.452.599-1.03.599-1.624C5 16.123 3.88 15 2.5 15zM2.5 0C1.123 0 0 1.12 0 2.5S1.123 5 2.5 5c.233 0 .423-.19.423-.423a.424.424 0 0 0-.423-.423A1.657 1.657 0 0 1 .846 2.5c0-.912.742-1.654 1.654-1.654.912 0 1.654.742 1.654 1.654 0 .395-.14.775-.397 1.074a.422.422 0 0 0 .047.597.422.422 0 0 0 .597-.047C4.789 3.672 5 3.094 5 2.5 5 1.123 3.88 0 2.5 0z" fill={props.color || undefined}></Path>
    </G>
  </Svg>
);

export default MoreIcon;