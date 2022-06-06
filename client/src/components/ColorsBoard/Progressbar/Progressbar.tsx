import React, { useEffect } from "react";
import {
  StyledDivProgressbar,
  StyledDivProgressbarContainer,
  StyledSpanProgressbarStatus,
} from "./Progressbar.styled";

type ProgressbarProps = {
  votes: number;
  maxVotes: number;
};
const Progressbar: React.FC<ProgressbarProps> = ({ votes, maxVotes }) => {
  return (
    <>
      {votes && maxVotes && (
        <StyledDivProgressbarContainer
          style={{ width: `${200 * (votes / maxVotes)}px` }}
        >
          <StyledDivProgressbar>
            <StyledSpanProgressbarStatus>{`${votes}`}</StyledSpanProgressbarStatus>
          </StyledDivProgressbar>
        </StyledDivProgressbarContainer>
      )}
    </>
  );
};

export default Progressbar;
