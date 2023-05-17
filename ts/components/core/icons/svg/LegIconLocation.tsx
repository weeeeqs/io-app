import React from "react";
import { Svg, Path } from "react-native-svg";
import { SVGIconProps } from "../Icon";

const LegIconLocation = ({ size, style, ...props }: SVGIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.043c-2.206 0-4 1.814-4 4.043 0 2.215 1.765 4.043 4 4.043 2.262 0 4-1.852 4-4.043 0-2.23-1.794-4.043-4-4.043Zm0 6.747c-1.478 0-2.676-1.214-2.676-2.704C9.324 7.6 10.53 6.382 12 6.382c1.47 0 2.671 1.218 2.671 2.704 0 1.468-1.17 2.704-2.671 2.704Z"
      fill="currentColor"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1C7.589 1 4 4.627 4 9.086c0 1.506.413 2.976 1.194 4.252l6.35 10.344a.665.665 0 0 0 .567.318h.005a.665.665 0 0 0 .567-.328l6.189-10.443A8.142 8.142 0 0 0 20 9.086C20 4.627 16.411 1 12 1Zm5.727 11.537-5.626 9.495-5.774-9.404a6.783 6.783 0 0 1-1.003-3.542c0-3.716 3-6.747 6.676-6.747s6.671 3.031 6.671 6.747c0 1.218-.33 2.412-.944 3.45Z"
      fill="currentColor"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.043c-2.206 0-4 1.814-4 4.043 0 2.215 1.765 4.043 4 4.043 2.262 0 4-1.852 4-4.043 0-2.23-1.794-4.043-4-4.043Zm0 6.747c-1.478 0-2.676-1.214-2.676-2.704C9.324 7.6 10.53 6.382 12 6.382c1.47 0 2.671 1.218 2.671 2.704 0 1.468-1.17 2.704-2.671 2.704Z"
      fill="currentColor"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1C7.589 1 4 4.627 4 9.086c0 1.506.413 2.976 1.194 4.252l6.35 10.344a.665.665 0 0 0 .567.318h.005a.665.665 0 0 0 .567-.328l6.189-10.443A8.142 8.142 0 0 0 20 9.086C20 4.627 16.411 1 12 1Zm5.727 11.537-5.626 9.495-5.774-9.404a6.783 6.783 0 0 1-1.003-3.542c0-3.716 3-6.747 6.676-6.747s6.671 3.031 6.671 6.747c0 1.218-.33 2.412-.944 3.45Z"
      fill="currentColor"
    />
  </Svg>
);

export default LegIconLocation;