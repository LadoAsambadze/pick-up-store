import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useState } from "react";

export default function Header() {
  const [menu, setMenu] = useState(false);

  const menuHandler = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Main>
        <Description>
          <Logo src="/vite.svg" alt="Website pick up store logo" />
          <Name>Pick Up Store </Name>
          <DestkopMenu>
            <Type variant="outlined">Men</Type>
            <Type variant="outlined">Women</Type>
            <Type variant="outlined">Kids</Type>
            <Type variant="outlined">Sale</Type>
            <Type variant="outlined">New Arrivals</Type>
          </DestkopMenu>
        </Description>

        <Shop>
          <SearchDiv>
            <SearchIcon src="/search-black.png" alt="Search loop icon" />
            <SearchInput placeholder="Search" />
          </SearchDiv>
          <Favourite
            src="/heart-white.png"
            alt="Favourite section icon/button"
          />
          <Cart src="/cart-white.png" alt="Shoping cart icon" />
          <Menu onClick={menuHandler} src="/menu-white.png" alt="Menu icon" />
        </Shop>
      </Main>
      <ListItem
        style={{
          display: menu ? "flex" : "none",
        }}
      >
        <Choose variant="text">Men</Choose>
        <Choose variant="text">Women</Choose>
        <Choose variant="text">Kids</Choose>
        <Choose variant="text">Sale</Choose>
        <Line></Line>
        <Login>Login</Login>
        <IconsDiv>
          <Icon src="/vite.svg" />
          <Icon src="/vite.svg" />
          <Icon src="/vite.svg" />
        </IconsDiv>
      </ListItem>
    </>
  );
}

const Main = styled(Box)`
  background: linear-gradient(to bottom, black, #151315);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px 20px 15px;
  opacity: 0.92;

  @media (min-width: 1440px) {
    padding: 25px 20px 25px 35px;
  }
`;

const Description = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled("img")`
  @media (min-width: 1440px) {
    width: 40px;
    height: 40px;
  }
`;

const Name = styled(Typography)`
  color: lightgreen;
  text-shadow: 0px 0px 5px #fff;
  font-family: Poppins;
  font-weight: 400;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
  font-family: "Ysabeau Office", sans-serif;
  @media (min-width: 1440px) {
    font-size: 28px;
    margin-left: 15px;
  }
`;

const Shop = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchDiv = styled(Box)`
  background-color: white;
  border-radius: 100%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 4px solid #61e399;
  @media (min-width: 1440px) {
    border: none;
    border-radius: 10px;
    padding: 6px 8px 6px 10px;
    border: 3px solid gray;
    &:hover {
      border-color: #76c676;
    }
  }
`;

const SearchInput = styled("input")`
  display: none;
  @media (min-width: 1440px) {
    display: block;
    width: 150px;
    outline: none;
    margin-left: 5px;
    border: none;
  }
`;

const SearchIcon = styled("img")`
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media (min-width: 1440px) {
    width: 23px;
    height: 23px;
  }
`;

const Favourite = styled("img")`
  width: 20px;
  height: 22px;
  margin-left: 15px;
  cursor: pointer;
  @media (min-width: 1440px) {
    width: 30px;
    height: 33px;
    margin-left: 20px;
  }
`;

const Cart = styled("img")`
  width: 25px;
  height: 25px;
  margin-left: 15px;
  cursor: pointer;
  @media (min-width: 1440px) {
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
`;

const Menu = styled("img")`
  width: 25px;
  height: 25px;
  margin-left: 15px;
  cursor: pointer;
  @media (min-width: 1440px) {
    display: none;
  }
`;

const DestkopMenu = styled(Box)`
  display: none;
  @media (min-width: 1440px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;
  }
`;

const Type = styled(Button)`
  color: white;
  margin-left: 15px;
  margin-right: 15px;
  border-color: white;
  padding: 2px 15px 2px 15px;
  font-family: "Ysabeau Office", sans-serif;
  &:hover {
    border-color: #a8eca8;
  }
`;

const ListItem = styled(Box)`
  width: 270px;
  height: 360px;
  background: linear-gradient(to top, black, #2c282c);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  top: 78px;
  z-index: 2000;
  padding: 15px 0px 0px 0px;
  border: 1px solid lightgreen;
  @media (min-width: 1440px) {
    display: none;
  }
`;

const Choose = styled(Button)`
  color: white;
  font-family: "Ysabeau Office", sans-serif;
  border: 1px solid lightgreen;
  background-color: black;
  width: 50%;
  margin-top: 12px;
`;

const Line = styled(Box)`
  height: 1px;
  width: 100%;
  background-color: white;
  margin-top: 20px;
  left: 0;
`;

const Login = styled(Button)`
  color: white;
  font-family: "Ysabeau Office", sans-serif;
  border: 1px solid white;
  background-color: black;
  width: 50%;
  margin-top: 16px;
`;

const IconsDiv = styled(Box)`
  width: 100%;
  padding: 20px 55px 10px 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled("img")`
  width: 20px;
  height: 20px;
`;
