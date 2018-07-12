import React from "react";
import {Svg} from "expo";
const { Path, Defs, G, Circle, Use } = Svg;


const LocationIcon = props => (
  <Svg {...props} width={props.width || 18} height={props.height || 22} viewBox="0 0 18 22">
    <Path d="M8.988 4.258c-2.636 0-4.786 2.129-4.786 4.749 0 2.62 2.15 4.748 4.786 4.748.446 0 .81-.361.81-.803a.809.809 0 0 0-.81-.804c-1.745 0-3.166-1.41-3.166-3.141 0-1.732 1.421-3.142 3.166-3.142 1.746 0 3.167 1.41 3.167 3.142 0 .75-.27 1.472-.76 2.04a.797.797 0 0 0 .09 1.133c.341.29.85.25 1.142-.09a4.713 4.713 0 0 0 1.147-3.083c0-2.616-2.145-4.749-4.786-4.749zm6.244-1.754C13.464.808 11.134-.076 8.669.005 4.179.161.474 3.62.042 8.047a8.932 8.932 0 0 0 .18 2.843c.14.603.337 1.192.598 1.754.913 2.133 2.901 5.418 7.197 8.952a1.526 1.526 0 0 0 1.943 0c4.296-3.539 6.284-6.819 7.197-8.952.26-.562.463-1.151.598-1.754a9.09 9.09 0 0 0 .22-1.973 8.815 8.815 0 0 0-2.743-6.413zm.99 7.801c0 .014-.005.023-.005.036l-.04.183v.009a7.265 7.265 0 0 1-.505 1.473c-.836 1.959-2.671 4.985-6.68 8.305-4.007-3.316-5.842-6.346-6.679-8.305-.004-.01-.009-.018-.009-.023a7.176 7.176 0 0 1-.495-1.45v-.01l-.04-.182c0-.013-.004-.022-.004-.036A7.031 7.031 0 0 1 1.652 8.2c.35-3.633 3.392-6.467 7.07-6.592a7.342 7.342 0 0 1 5.385 2.049 7.22 7.22 0 0 1 2.25 5.261c0 .465-.046.933-.136 1.388z" fill={props.color || "#696969"} fillRule="evenodd"></Path>
  </Svg>
);

export default LocationIcon;
