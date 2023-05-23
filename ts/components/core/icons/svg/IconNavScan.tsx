import React from "react";
import { Svg, Path } from "react-native-svg";
import { SVGIconProps } from "../Icon";

const IconNavWallet = ({ size, style }: SVGIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 5c0-2.76142 2.23858-5 5-5h3c.55229 0 1 .44771 1 1 0 .55228-.44771 1-1 1H5C3.34315 2 2 3.34315 2 5v3c0 .55229-.44772 1-1 1-.55229 0-1-.44771-1-1V5Zm19-5c2.7614 0 5 2.23858 5 5v3c0 .55229-.4477 1-1 1s-1-.44771-1-1V5c0-1.65685-1.3431-3-3-3h-3c-.5523 0-1-.44772-1-1 0-.55229.4477-1 1-1h3Zm0 24c2.7614 0 5-2.2386 5-5v-3c0-.5523-.4477-1-1-1s-1 .4477-1 1v3c0 1.6569-1.3431 3-3 3h-3c-.5523 0-1 .4477-1 1s.4477 1 1 1h3ZM5 24c-2.76142 0-5-2.2386-5-5v-3c0-.5523.44771-1 1-1 .55228 0 1 .4477 1 1v3c0 1.6569 1.34315 3 3 3h3c.55229 0 1 .4477 1 1s-.44771 1-1 1H5Zm-1-9c0-1.1046.89543-2 2-2h3c1.1046 0 2 .8954 2 2v3c0 1.1046-.8954 2-2 2H6c-1.10457 0-2-.8954-2-2v-3Zm2.25 0c-.13807 0-.25.1119-.25.25v2.5c0 .1381.11193.25.25.25h2.5c.13807 0 .25-.1119.25-.25v-2.5c0-.1381-.11193-.25-.25-.25h-2.5ZM6 4c-1.10457 0-2 .89543-2 2v3c0 1.1046.89543 2 2 2h3c1.1046 0 2-.8954 2-2V6c0-1.10457-.8954-2-2-2H6Zm2.75 2c.13807 0 .25.11193.25.25v2.5c0 .13807-.11193.25-.25.25h-2.5C6.11193 9 6 8.88807 6 8.75v-2.5c0-.13807.11193-.25.25-.25h2.5ZM13 6c0-1.10457.8954-2 2-2h3c1.1046 0 2 .89543 2 2v3c0 1.1046-.8954 2-2 2h-3c-1.1046 0-2-.8954-2-2V6Zm2.25 0c-.1381 0-.25.11193-.25.25v2.5c0 .13807.1119.25.25.25h2.5c.1381 0 .25-.11193.25-.25v-2.5c0-.13807-.1119-.25-.25-.25h-2.5ZM20 15c0-.5523-.4477-1-1-1s-1 .4477-1 1v2.75c0 .1381-.1119.25-.25.25H15c-.5523 0-1 .4477-1 1s.4477 1 1 1h3c1.1046 0 2-.8954 2-2v-3Zm-5-1c.5523 0 1 .4477 1 1s-.4477 1-1 1-1-.4477-1-1 .4477-1 1-1Z"
      fill="currentColor"
    />
  </Svg>
);

export default IconNavWallet;