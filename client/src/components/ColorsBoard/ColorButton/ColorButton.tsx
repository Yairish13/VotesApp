import React, { useState } from "react";
import { updateColors, updateColorWithVotes } from "../../../api/requests";
import { socketController } from "../../../api/SocketsController";
import Progressbar from "../Progressbar/Progressbar";
import { StyledDivColorContainer } from "./ColorButton.styled";

type ColorButtonProps = {
  id: string;
  colorCode: string;
  colorName: string;
  votes: number;
  maxVotes: number;
  isOnline:boolean;
  setIsOnline:(value: boolean) => void;
  updateColorOffline: (id: string) => void;
};
const ColorButton: React.FC<ColorButtonProps> = ({
  id,
  colorCode,
  votes,
  maxVotes,
  updateColorOffline,
  setIsOnline,
  isOnline
}) => {
  const ppp = votes;
  const [localVotes, setLocalVotes] = useState(votes);
  // const [isOnline, setIsOnline] = useState(true);
  const onClickButton = async (): Promise<void> => {
    try {
      console.log(localVotes)
      console.log(ppp)
      console.log(isOnline)
      const { data } = await updateColorWithVotes(id,localVotes+1);
      const { colors, votes } = data;
      console.log(votes)
      socketController.emit("new-operations", { colors, votes });
      setLocalVotes((prevState) => prevState + 1) 
      setIsOnline(true)
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
              <Progressbar votes={localVotes} maxVotes={maxVotes} />
            ) : (
              <Progressbar votes={localVotes} maxVotes={maxVotes} />
            ))}
        </StyledDivColorContainer>
      )}
    </>
  );
};
export default React.memo(ColorButton);
