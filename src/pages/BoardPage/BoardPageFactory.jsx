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
  isAccessble,
  setIsAccessble,
  setBoardLifeCycle,
}) => {
  switch (boardLifeCycle) {
    case "onWaitWrite":
      return (
        <BoardOnWaitWrite
          boardCode={boardCode}
          boardInfo={boardInfo}
          setBoardLifeCycle={setBoardLifeCycle}
        />
      );
    case "onWrite":
      return <BoardOnWrite boardCode={boardCode} boardInfo={boardInfo} />;
    case "onWaitOpen":
      return (
        <BoardOnWaitOpen
          boardCode={boardCode}
          setBoardLifeCycle={setBoardLifeCycle}
        />
      );
    case "onOpen":
      return (
        <BoardOnOpen
          boardCode={boardCode}
          headerState={headerState}
          setHeaderState={setHeaderState}
          searchResults={searchResults}
          isAccessble={isAccessble}
          setIsAccessble={setIsAccessble}
        />
      );
    case "onEnd":
      return <BoardOnEnd boardCode={boardCode} />;
    default:
      return <Board404 />;
  }
};

export default BoardPageFactory;
