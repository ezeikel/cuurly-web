import Image from "next/image";
import { Wrapper } from "./NextImageWrapper.styled";

type NextImageWrapperProps = {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive";
  quality?: number;
  alt: string;
};

const NextImageWrapper = ({ className, ...props }: NextImageWrapperProps) => (
  <Wrapper className={className}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Image src={props.src} {...props} />
  </Wrapper>
);

export default NextImageWrapper;
