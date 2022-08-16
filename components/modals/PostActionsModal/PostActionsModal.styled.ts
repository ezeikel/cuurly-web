/* eslint-disable import/prefer-default-export */

import tw from "twin.macro";
import styled from "styled-components";

type PostActionProps = {
  actionType?: string;
  disabled?: boolean;
};

export const PostAction = styled.div(
  ({ disabled, actionType }: PostActionProps) => [
    actionType === "negative" && tw`text-red-500`,
    disabled && tw`pointer-events-none opacity-50`,
    tw`grid items-center justify-around min-h-[48px] px-2 py-4`,
  ],
);
