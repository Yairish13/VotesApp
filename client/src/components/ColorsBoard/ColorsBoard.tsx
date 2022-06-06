import React, { useEffect, useState } from "react";
import { IColor } from "../../types";
import { getColors, getMaxVotesColor } from "../../api/requests";
import { StyledViewColorsContainer } from "./ColorsBoard.styled";
import ColorButton from "./ColorButton/ColorButton";

export const ColorsBoard: React.FC = () => {
  const [colors, setColors] = useState([]);
  const [maxVotes, setMaxVotes] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data }: IColor[] | any = await getColors();
      const maxVotes: number | any = await getMaxVotesColor();
      setColors(data);
      setMaxVotes(maxVotes);
    })();
  }, []);
  return (
    <StyledViewColorsContainer>
      {colors &&
        colors.map(({ _id, colorCode, colorName, votes }, i) => (
          <ColorButton
            key={i}
            id={_id}
            colorCode={colorCode}
            colorName={colorName}
            votes={votes}
            maxVotes={maxVotes}
            setMaxVotes={setMaxVotes}
          />
        ))}
    </StyledViewColorsContainer>
  );
};
