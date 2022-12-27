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
  const [boardName, setBoardName] = useState("");
  const [isValidLength, setIsValidLength] = useState(true);
  const [toggleTagInput, setToggleTagInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  console.log(board.name);

  const handleChangeBoardName = (e) => {
    setBoardName(e.target.value);
    const currentBoardState = { ...board, name: e.target.value };
    setBoard(currentBoardState);
  };

  const toggleAddTagInput = () => {
    setToggleTagInput((prev) => !prev);
  };

  const handleTagInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleonKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      setInputValue("");

      let copyTag = [...board.tags];
      copyTag.push(inputValue);

      let boardState = { ...board, tags: copyTag };
      setBoard(boardState);
    }
  };

  const handleDeleteTag = (index) => {
    let copyTag = [...board.tags];
    const newTagArray = copyTag.filter((_, idx) => {
      return idx !== index;
    });

    let boardState = { ...board, tags: newTagArray };
    setBoard(boardState);
  };

  useEffect(() => {
    boardName.length >= 1 && boardName.length < maxLength + 1
      ? setDisabledFooterButton(false)
      : setDisabledFooterButton(true);
  }, [boardName, setDisabledFooterButton]);

  useEffect(() => {
    if (boardName.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [boardName, setIsValidLength]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <CreateBoardStepContainer>
      <TextInput
        value={boardName}
        commonSize={true}
        placeholder="ex. 김땡땡 생일 축하해~!"
        type="text"
        onChange={handleChangeBoardName}
        inputMaxLength={maxLength + 1}
        setTextState={setBoardName}
        isValidLength={isValidLength}
        ref={inputRef}
      />
      <CreateBoardGuide>
        <TextLengthValidator
          maxLength={maxLength}
          text={boardName}
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
        {board.tags?.map((val, idx) => {
          return (
            <React.Fragment key={`${val}${idx}`}>
              <Tag>
                {val}
                <CloseButton onClick={() => handleDeleteTag(idx)} value={idx}>
                  <Close />{" "}
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
