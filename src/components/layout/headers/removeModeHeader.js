import styled from "styled-components";
import { ReactComponent as Close } from "../../../assets/close.svg";
import { ReactComponent as Remove } from "../../../assets/remove.svg";

const RemoveModeHeader = ({ onClickCancel, onClickRemove }) => {
  return (
    <ComponentWrapper>
      <RemoveModeHeaderContainer>
        <RemoveModeHeaderTitle>
          삭제할 메모를 선택해주세요.
        </RemoveModeHeaderTitle>
        <RemoveModeHeaderButtonGroup>
          <CancelButton onClick={onClickCancel}>
            <Close />
            <p>취소</p>
          </CancelButton>
          <RemoveButton onClick={onClickRemove}>
            <Remove />
            <p>삭제</p>
          </RemoveButton>
        </RemoveModeHeaderButtonGroup>
      </RemoveModeHeaderContainer>
    </ComponentWrapper>
  );
};

export default RemoveModeHeader;

const ComponentWrapper = styled.div`
  width: 100vw;
  max-width: 700px;
  height: 4rem;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  background-color: white;
`;

const RemoveModeHeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const RemoveModeHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RemoveModeHeaderButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const CancelButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
