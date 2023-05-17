import React from "react";
import { Svg, Path } from "react-native-svg";
import { SVGIconProps } from "../Icon";

const LegIconTag = ({ size, style, ...props }: SVGIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} {...props}>
    <Path
      d="M21.8374 1C21.8125 1 21.7878 1.00105 21.7629 1.00316C21.616 1.01527 18.3318 1.31673 17.0976 3.71163C17.0976 3.71163 13.721 3.3684 12.6409 3.25873C11.5608 3.14906 10.5024 3.5265 9.73712 4.29298L2.04792 11.9567C0.650254 13.3568 0.65078 15.6342 2.04898 17.0336L7.94656 22.9361C8.65496 23.645 9.58428 24 10.5104 24C11.4238 23.9998 12.3342 23.6547 13.0264 22.9631C13.3772 22.6125 13.3776 22.044 13.0269 21.6932C12.6765 21.3422 12.1078 21.3421 11.757 21.6925C11.0634 22.3856 9.92383 22.3739 9.21718 21.6665L3.31942 15.764C2.62033 15.0644 2.62015 13.9257 3.31732 13.2273L11.0067 5.56343C11.3901 5.17949 11.9195 4.99068 12.4593 5.04543L19.2923 5.73996L19.3813 6.61313C18.1366 7.07709 16.9522 7.15114 16.9252 7.15272C16.4305 7.17939 16.0508 7.60176 16.0767 8.0966C16.102 8.57583 16.4984 8.94749 16.9727 8.94749C16.9887 8.94749 17.0046 8.94714 17.0206 8.94626C17.0782 8.94328 18.2274 8.87747 19.5682 8.44843L19.9862 12.5533C20.0411 13.0921 19.8533 13.6206 19.4708 14.004L15.0898 18.3207C14.7366 18.6687 14.7324 19.2374 15.0804 19.5906C15.4285 19.9439 15.9971 19.9481 16.3503 19.5999L20.7339 15.2808C20.7353 15.2794 20.7367 15.278 20.7383 15.2764C21.5058 14.5096 21.8831 13.4507 21.773 12.3714L21.2963 7.69108C21.9003 7.33749 22.4095 6.92091 22.8166 6.44608C23.594 5.53869 23.9879 4.44161 23.987 3.18555V3.14976C23.987 1.96442 23.0228 1 21.8374 1ZM22.191 3.18608C22.1917 4.1898 21.8283 5.00419 21.0882 5.64819L21.0048 4.82959C20.9616 4.40564 20.6263 4.0703 20.2022 4.02714L19.1605 3.92133C20.0797 3.04395 21.5984 2.82934 21.8697 2.7974C22.0496 2.8139 22.191 2.96568 22.191 3.14976V3.18608Z"
      fill="currentColor"
    />
  </Svg>
);

export default LegIconTag;