import styled from "styled-components";

const DropDownMenu = ({ menuArray, menuHandlerArray }) => {
  return (
    <DropDownMenuContainer>
      {menuArray.map((menu, i) => (
        <Menu key={menuHandlerArray[i]} onClick={menuHandlerArray[i]}>
          {menu}
        </Menu>
      ))}
    </DropDownMenuContainer>
  );
};

export default DropDownMenu;

const DropDownMenuContainer = styled.div`
  background-color: white;
  width: 500%;
  position: absolute;
  z-index: 9999;
  box-shadow: 0px 2px 12px rgba(73, 72, 72, 0.25);
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const Menu = styled.div`
  text-align: end;
  padding: 0.5rem;
  &:hover {
    background-color: #d2d2d2;
  }
`;
