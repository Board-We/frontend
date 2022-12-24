import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import { ReactComponent as Lock } from "../../../assets/lock.svg";
import { useState } from "react";
import PasswordModal from "../BoardPageModal/PasswordModal";

const BlockAccessBoard = () => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);

  const handleClickPasswordButton = () => {
    setIsOpenPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setIsOpenPasswordModal(false);
  };
  return (
    <ComponentWrapper>
      <BlockDescription>
        <Lock />
        <p>해당보드는 비공개 보드입니다.</p>
      </BlockDescription>
      <ButtonContainer>
        <ChipButton
          text="비밀번호 입력하기"
          flat
          width="80%"
          onClick={handleClickPasswordButton}
        />
      </ButtonContainer>
      <PasswordModal
        open={isOpenPasswordModal}
        onClose={handleClosePasswordModal}
        onValid={() => {}}
      />
    </ComponentWrapper>
  );
};

export default BlockAccessBoard;

const ComponentWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 9999;
`;

const BlockDescription = styled.div`
  height: 15vh;
  background-color: ${(props) => props.theme.dimmed.opacity_w};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: ${(props) => props.theme.colors.black};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 10vh;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;
