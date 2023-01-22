import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import TextLengthValidator from "../../../components/textLengthValidator";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import { boardState } from "../../../store";
const maxLength = 20;

const CreateBoardStep1 = ({ setDisabledFooterButton }) => {
  const inputRef = useRef();

  const [board, setBoard] = useRecoilState(boardState);
  const [isValidLength, setIsValidLength] = useState(true);
  const [toggleTagInput, setToggleTagInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChangeBoardName = (e) => {
    const currentBoardState = { ...board, boardName: e.target.value };
    setBoard(currentBoardState);
  };

  const toggleAddTagInput = () => {
    setToggleTagInput((prev) => !prev);
  };

  const handleTagInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleonKeyDownEnter = (e) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      setBoard({ ...board, boardTags: [...board.boardTags, inputValue] });
      setInputValue("");
    }
  };

  const handleDeleteTag = (index) => {
    const newBoardTags = board.boardTags.filter((_, idx) => idx !== index);
    setBoard({ ...board, boardTags: newBoardTags });
  };

  useEffect(() => {
    board.boardName.length >= 1 && board.boardName.length < maxLength + 1
      ? setDisabledFooterButton(false)
      : setDisabledFooterButton(true);
  }, [board.boardName, setDisabledFooterButton]);

  useEffect(() => {
    if (board.boardName.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [board.boardName, setIsValidLength]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <CreateBoardStepContainer>
      <TextInput
        value={board.boardName}
        commonSize={true}
        placeholder="ex. 김땡땡 생일 축하해~!"
        type="text"
        onChange={handleChangeBoardName}
        inputMaxLength={maxLength + 1}
        onClickDelete={() => setBoard({ ...board, boardName: "" })}
        isValidLength={isValidLength}
        ref={inputRef}
      />
      <CreateBoardGuide>
        <TextLengthValidator
          maxLength={maxLength}
          text={board.boardName}
          isValidLength={isValidLength}
        />
      </CreateBoardGuide>
      <TagArea>
        <AddTagButton onClick={toggleAddTagInput}>+ 태그 추가</AddTagButton>
        {toggleTagInput && (
          <AddTagInput
            onChange={handleTagInput}
            onKeyDown={handleonKeyDownEnter}
            value={inputValue}
          />
        )}
        {board.boardTags?.map((val, idx) => {
          return (
            <React.Fragment key={`${val}${idx}`}>
              <Tag>
                {val}
                <CloseButton onClick={() => handleDeleteTag(idx)} value={idx}>
                  <Close />
                </CloseButton>
              </Tag>
            </React.Fragment>
          );
        })}
      </TagArea>
    </CreateBoardStepContainer>
  );
};

export default CreateBoardStep1;

const CreateBoardStepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 0 1.25rem;
`;

const CreateBoardGuide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
`;

const TagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2rem;
`;

const AddTagButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border: none;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.grey_35};
  border-radius: 20px;
  color: ${(props) => props.theme.colors.grey_30};
  margin-right: 0.75rem;
  margin-bottom: 0.75em;
  cursor: pointer;
`;

const AddTagInput = styled.input`
  padding: 1rem;
  width: 6rem;
  height: 2.5rem;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.colors.grey_50};
  color: ${(props) => props.theme.colors.black};
  margin-right: 0.75rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 2.5rem;
  padding: 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.theme.colors.grey_50};
  color: ${(props) => props.theme.colors.black};
  margin-right: 0.75rem;
  margin-bottom: 0.75em;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
  padding: 0;
`;
