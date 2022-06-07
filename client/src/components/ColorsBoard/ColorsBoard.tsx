import React, { useEffect, useState } from "react";
import { IColor } from "../../types";
import { getColors } from "../../api/requests";
import { StyledViewColorsContainer } from "./ColorsBoard.styled";
import ColorButton from "./ColorButton/ColorButton";
import { socketController } from "../../api/SocketsController";

export const ColorsBoard: React.FC = () => {
  const [colors, setColors] = useState<IColor[]>([]);
  const [maxVotes, setMaxVotes] = useState(0);
  // replace to uselocalstroge


  useEffect(() => {
    (async()=>{
      const {data}: IColor[] | any = await getColors();
      const {colors,votes} = data;
      console.log(colors);
      console.log(votes);
      setColors(colors)
      setMaxVotes(votes)
    })()

    socketController.subscribe("new-remote-operations",
    (data:any) => {
      console.log(data)
      const {colors,votes} = data;
      setColors(colors);
      setMaxVotes(votes)
    }
    )
    return ()=>{
      socketController.unsubscribe("new-remote-operations")
    }
  }, []);


  // useEffect(() => {
  //   (async () => {
  //     // const maxVotes: number | any = await getMaxVotesColor();
  //     // setMaxVotes(maxVotes);
  //   })();
  // }, []); //TODO change get from *

  return (
    <StyledViewColorsContainer>
      {colors &&
        colors.map(({ _id:id , colorCode, colorName, votes }, i) => (
          <ColorButton
            key={i}
            {...{id,colorName,setColors,votes,colorCode,maxVotes,setMaxVotes}}
          />
        ))}
    </StyledViewColorsContainer>
  );
};
