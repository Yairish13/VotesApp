import React, { useEffect, useState } from "react";
import { updateColors } from "../../../api/requests";
import Progressbar from "../Progressbar/Progressbar";
import { StyledDivColorContainer } from "./ColorButton.styled";

type ColorButtonProps = {
  id: string;
  colorCode: string;
  colorName: string;
  votes: number;
  maxVotes: number;
  setMaxVotes: (maxVotes: number) => void;
};
const ColorButton: React.FC<ColorButtonProps> = ({
  id,
  colorCode,
  colorName,
  votes,
  maxVotes,
  setMaxVotes,
}) => {
  console.log(id);
  let [localVotes, setLocalVotes] = useState<number>(0);

  const onClickButton = async (): Promise<void> => {
    try {
      if (localVotes === maxVotes) setMaxVotes(maxVotes + 1);
      setLocalVotes((prevCount) => prevCount + 1);
      await updateColors(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLocalVotes(votes);
  }, []);
  return (
    <>
      {colorCode && (
        <StyledDivColorContainer color={colorCode} onClick={onClickButton}>
          {localVotes && maxVotes && (
            <Progressbar votes={localVotes} maxVotes={maxVotes} />
          )}
        </StyledDivColorContainer>
      )}
    </>
  );
};

export default ColorButton;
