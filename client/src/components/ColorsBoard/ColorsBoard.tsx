import React, { useEffect } from "react";
import { IColor } from "../../types";
import { getColors } from "../../api/requests";
import { StyledDivColorsContainer, StyledHeader } from "./ColorsBoard.styled";
import ColorButton from "./ColorButton/ColorButton";
import { socketController } from "../../api/SocketsController";
import useLocalStorage from "../../hooks/useLocalStorage";

export const ColorsBoard: React.FC = () => {
  const [colors, setColors] = useLocalStorage<IColor[]>('colors',[]);
  const [maxVotes, setMaxVotes] = useLocalStorage('maxVotes',0);

  useEffect(() => {
    (async () => {
      const { data }: IColor[] | any = await getColors();
      const { colors, votes } = data;
      setColors(colors);
      setMaxVotes(votes);
    })();

    socketController.subscribe("new-remote-operations", (data: any) => {
      const { colors, votes } = data;
      setColors(colors);
      setMaxVotes(votes);
    });
    return () => {
      socketController.unsubscribe("new-remote-operations");
    };
  }, []);

let newArr;
const updateColorOffline = async(id:string) =>{
  newArr = [...colors];
  newArr.map((el)=> id === el._id ? el.votes += 1 : el)
  setColors(newArr)
}

  return (
    <>
      <StyledHeader>Favourite Colors</StyledHeader>
      <StyledDivColorsContainer>
        {colors.length > 0 &&
          colors.map(({ _id: id, colorCode, colorName, votes }, i) => (
            <ColorButton
              key={i}
              {...{
                id,
                colorName,
                setColors,
                votes,
                colorCode,
                maxVotes,
                updateColorOffline
              }}
            />
          ))}
      </StyledDivColorsContainer>
    </>
  );
};
