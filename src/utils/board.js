export const getBoardState = (board) => {
  console.log(board);
  const now = new Date().getTime();
  const isOnWrite = now - new Date(board.data.writingStartTime).getTime();
  const isEndWrite = now - new Date(board.data.writingEndTime).getTime();
  const isOnOpen = now - new Date(board.data.openStartTime).getTime();
  const isEndOpen = now - new Date(board.data.openEndTime).getTime();
  console.log(isOnWrite, isEndWrite, isOnOpen, isEndOpen);
  if (isOnWrite < 0) {
    // 현재가 메모 쓰기 시작보다 과거
    return "onWaitWrite";
  } else if (isOnWrite >= 0 && isEndWrite < 0) {
    // 현재가 메모 쓰기 시작보다 미래이고, 메모 쓰기 종료보다 과거
    return "onWrite";
  } else if (isEndWrite >= 0 && isOnOpen < 0) {
    // 현재가 메모 쓰기 종료보다 미래이고, 보드 오픈보다 과거
    return "onWaitOpen";
  } else if (isOnOpen >= 0 && isEndOpen < 0) {
    // 현재가 보드 오픈보다 미래이고 보드 종료보다 과거
    return "onOpen";
  } else if (isEndOpen >= 0) {
    // 현재가 보드 종료보다 미래
    return "endOpen";
  }
};
