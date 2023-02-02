export const getBoardLifeCycle = (board) => {
  const now = new Date().getTime();
  const isOnWrite = now - new Date(board.writingStartTime).getTime();
  const isEndWrite = now - new Date(board.writingEndTime).getTime();
  const isOnOpen = now - new Date(board.openStartTime).getTime();
  const isEndOpen = now - new Date(board.openEndTime).getTime();

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
    return "onEnd";
  }
};

export const getBoardDdayStatus = ({ openStartTime, writingStartTime }) => {
  const now = new Date().getTime();
  const dDayBoardOpen = (now - new Date(openStartTime)) / (1000 * 60 * 60 * 24); // 소수점을 제거 하지 않은 남은 일수
  const dDayBoardWriting =
    (now - new Date(writingStartTime)) / (1000 * 60 * 60 * 24); // 소수점을 제거하지 않은 남은 일수

  if (dDayBoardOpen >= 0) {
    return "확인 가능";
  } else if (dDayBoardWriting >= 0 && dDayBoardOpen >= 0) {
    return "작성 가능";
  } else if (dDayBoardWriting < 0 && dDayBoardWriting > -1) {
    const restTime = Math.abs(dDayBoardWriting * (1000 * 60 * 60 * 24)); // 남은시간이 1일 미만일 경우 먼저 rawtime(milliseccond 값)으로 재환산
    if (restTime < 3600000) {
      const miniute = Math.floor(restTime / (1000 * 60)); // 남은시간이 1시간 미만이면 분으로 환산
      return `작성 ${miniute}분 전`;
    } else {
      const hour = Math.floor(Math.abs(restTime / (1000 * 60 * 60))); // 남은시간이 1시간 이상이면 시간으로 환산
      return `작성 ${hour}시간 전`;
    }
  } else if (dDayBoardWriting < 0) {
    const day = Math.floor(Math.abs(dDayBoardWriting)); // 남은시간이 1일 이상일 경우
    return `작성 ${day}일 전`;
  } else if (dDayBoardOpen < 0 && dDayBoardOpen > -1) {
    const restTime = Math.abs(dDayBoardOpen * (1000 * 60 * 60 * 24));
    if (restTime < 3600000) {
      const miniute = Math.floor(restTime / (1000 * 60));
      return `확인 ${miniute}분 전`;
    } else {
      const hour = Math.floor(Math.abs(restTime / (1000 * 60 * 60)));
      return `확인 ${hour}시간 전`;
    }
  } else if (dDayBoardOpen < 0) {
    const day = Math.floor(Math.abs(dDayBoardOpen));
    return `확인 ${day}일 전`;
  }
};

export const parsingFontNumber = (fontNumber) => {
  switch (fontNumber) {
    case "0":
      return "SCDream";
    case "1":
      return "SCDream";
    case "2":
      return "강원교육모두";
    case "3":
      return "KOTRAHOPE";
    default:
      return "Pretendard";
  }
};
