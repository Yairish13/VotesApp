import React from "react";
import {  updateColors } from "../../../api/requests";
import { socketController } from "../../../api/SocketsController";
import { IColor } from "../../../types";
import Progressbar from "../Progressbar/Progressbar";
import { StyledDivColorContainer } from "./ColorButton.styled";

type ColorButtonProps = {
  id: string;
  colorCode: string;
  colorName: string;
  votes: number;
  maxVotes: number;
  setMaxVotes: (maxVotes: number) => void;
  setColors:(colors:IColor[])=>void
};
const ColorButton: React.FC<ColorButtonProps> = ({
  id,
  colorCode,
  votes,
  maxVotes,
}) => {
  const onClickButton = async (): Promise<void> => {
    try {
      const {data} = await updateColors(id);
      const {colors,votes} = data;
      socketController.emit("new-operations",{colors,votes})
    } catch (error) {
      // set colors menually
      console.log(error);
    }
  };

  return (
    <>
      {colorCode && (
        <StyledDivColorContainer color={colorCode} onClick={onClickButton}>
          {votes && maxVotes && (
            <Progressbar votes={votes} maxVotes={maxVotes} />
          )}
        </StyledDivColorContainer>
      )}
    </>
  );
};
export default React.memo(ColorButton);


