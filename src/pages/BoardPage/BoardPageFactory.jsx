import Board404 from "./mode/Board404";
import BoardOnEnd from "./mode/BoardOnEnd";
import BoardOnOpen from "./mode/BoardOnOpen";
import BoardOnWaitOpen from "./mode/BoardOnWaitOpen";
import BoardOnWaitWrite from "./mode/BoardOnWaitWrite";
import BoardOnWrite from "./mode/BoardOnWrite";

const BoardPageFactory = ({
  boardInfo,
  boardLifeCycle,
  boardCode,
  headerState,
  setHeaderState,
  searchResults,
}) => {
  switch (boardLifeCycle) {
    case "onWaitWrite":
      return <BoardOnWaitWrite boardCode={boardCode} boardInfo={boardInfo} />;
    case "onWrite":
      return <BoardOnWrite boardCode={boardCode} boardInfo={boardInfo} />;
    case "onWaitOpen":
      return <BoardOnWaitOpen boardCode={boardCode} />;
    case "onOpen":
      return (
        <BoardOnOpen
          boardCode={boardCode}
          headerState={headerState}
          setHeaderState={setHeaderState}
          searchResults={searchResults}
        />
      );
    case "onEnd":
      return <BoardOnEnd boardCode={boardCode} />;
    default:
      return <Board404 />;
  }
};

export default BoardPageFactory;
