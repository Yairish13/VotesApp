import React, { useState } from "react";
import { updateColors } from "../../../api/requests";
import { socketController } from "../../../api/SocketsController";
import Progressbar from "../Progressbar/Progressbar";
import { StyledDivColorContainer } from "./ColorButton.styled";

type ColorButtonProps = {
  id: string;
  colorCode: string;
  colorName: string;
  votes: number;
  maxVotes: number;
  updateColorOffline: (id: string) => void;
};
const ColorButton: React.FC<ColorButtonProps> = ({
  id,
  colorCode,
  votes,
  maxVotes,
  updateColorOffline,
}) => {
  const [localVotes, setLocalVotes] = useState(votes);
  const [isOnline, setIsOnline] = useState(true);
  const onClickButton = async (): Promise<void> => {
    try {
      const { data } = await updateColors(id);
      setIsOnline(true)
      const { colors, votes } = data;
      socketController.emit("new-operations", { colors, votes });
    } catch (error) {
      setIsOnline(false);
      updateColorOffline(id);
      setLocalVotes((prevState) => prevState + 1);
      console.log(error);
    }
  };

  return (
    <>
      {colorCode && (
        <StyledDivColorContainer color={colorCode} onClick={onClickButton}>
          {votes &&
            maxVotes &&
            (isOnline ? (
              <Progressbar votes={votes} maxVotes={maxVotes} />
            ) : (
              <Progressbar votes={localVotes} maxVotes={maxVotes} />
            ))}
        </StyledDivColorContainer>
      )}
    </>
  );
};
export default React.memo(ColorButton);
