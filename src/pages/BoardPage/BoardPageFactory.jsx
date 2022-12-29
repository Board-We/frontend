import Board404 from "./mode/Board404";
import BoardOnEnd from "./mode/BoardOnEnd";
import BoardOnOpen from "./mode/BoardOnOpen";
import BoardOnWaitOpen from "./mode/BoardOnWaitOpen";
import BoardOnWaitWrite from "./mode/BoardOnWaitWrite";
import BoardOnWrite from "./mode/BoardOnWrite";

const BoardPageFactory = ({ boardState, boardCode, ...args }) => {
  switch (boardState) {
    case "onWaitWrite":
      return <BoardOnWaitWrite />;
    case "onWrite":
      return <BoardOnWrite />;
    case "onWaitOpen":
      return <BoardOnWaitOpen />;
    case "onOpen":
      return <BoardOnOpen boardCode={boardCode} {...args} />;
    case "onEnd":
      return <BoardOnEnd />;
    default:
      return <Board404 />;
  }
};

export default BoardPageFactory;
