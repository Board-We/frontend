import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { useState } from "react";
import PasswordModal from "../BoardPageModal/PasswordModal";

const BlockAccessBoard = ({ setIsAccessble }) => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <ComponentWrapper>
      <BlockDescription>
        <Lock />
        <p>해당보드는 비공개 보드입니다.</p>
      </BlockDescription>
      <ButtonContainer>
        <ChipButton onClick={() => setIsOpenPasswordModal(true)}>
          비밀번호 입력하기
        </ChipButton>
      </ButtonContainer>
      <PasswordModal
        password={password}
        setPassword={setPassword}
        open={isOpenPasswordModal}
        onClose={() => setIsOpenPasswordModal(false)}
        onValid={() => setIsAccessble(true)}
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
