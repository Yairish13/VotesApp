import React, { useEffect, useState } from "react";
import { IColor } from "../../types";
import { getColors } from "../../api/requests";
import { StyledDivColorsContainer, StyledHeader } from "./ColorsBoard.styled";
import ColorButton from "./ColorButton/ColorButton";
import { socketController } from "../../api/SocketsController";
import useLocalStorage from "../../hooks/useLocalStorage";

export const ColorsBoard: React.FC = () => {
  const [colors, setColors] = useLocalStorage<IColor[]>("colors", []);
  const [maxVotes, setMaxVotes] = useLocalStorage("maxVotes", 0);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    socketController.subscribe("new-remote-operations", (data: any) => {
      console.log('trigger')
      setIsOnline(true);
      const { colors, votes } = data;
      console.log(colors,votes)
      setColors(colors);
      setMaxVotes(votes);
    });
    (async () => {
      if (!isOnline) {
        const { data }: IColor[] | any = await getColors();
        console.log(data);
        const { colors, votes } = data;
        setColors(colors);
        setMaxVotes(votes);
      }
    })();
    return () => {
      socketController.unsubscribe("new-remote-operations");
    };
  }, []);

  let newArr;
  const updateColorOffline = async (id: string) => {
    console.log(colors);
    newArr = [...colors];
    newArr.map((el) => (id === el._id ? (el.votes += 1) : el));
    setColors(newArr);
  };

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
                updateColorOffline,
                isOnline,
                setIsOnline,
              }}
            />
          ))}
      </StyledDivColorsContainer>
    </>
  );
};
