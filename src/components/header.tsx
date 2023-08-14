import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../store/search-slice";

import { resetFilter } from "../store/filter-slice";

export default function Header() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const menuHandler = () => {
    setMenu(!menu);
  };

  // ...

  return (
    <>
      <Main>
        <Description>
          <Logo src="/vite.svg" alt="Website pick up store logo" />
          <Name>Pick Up Store </Name>
          <DestkopMenu>
            <Type
              onClick={() => {
                navigate("/");
              }}
            >
              Shop
            </Type>
            <Type
              onClick={() => {
                navigate("/clothes");
                dispatch(resetFilter());
              }}
            >
              Clothes
            </Type>
            <Type
              onClick={() => {
                navigate("/shoes");
                dispatch(resetFilter());
              }}
            >
              Shoes
            </Type>
            <Type>Sale</Type>
            <Type>New Arrivals</Type>
          </DestkopMenu>
        </Description>

        <Shop>
          <SearchDiv>
            <SearchIcon src="/search-black.png" alt="Search loop icon" />
            <SearchInput
              placeholder="Search"
              onChange={(e) => {
                dispatch(setSearch(e.target.value));
              }}
            />
          </SearchDiv>
          <HeaderIcon src="/heart.svg" alt="Favourite section icon/button" />
          <HeaderIcon src="/user.svg" alt="User icon" />
          <HeaderIcon
            onClick={() => navigate("/cart")}
            src="/cart.svg"
            alt="Shoping cart icon"
          />
          <Menu onClick={menuHandler} src="/menu-white.png" alt="Menu icon" />
        </Shop>
      </Main>
      <ListItem
        style={{
          display: menu ? "flex" : "none",
        }}
      >
        <Choose
          onClick={() => {
            navigate("/shoes");
          }}
          variant="text"
        >
          Men
        </Choose>
        <Choose
          onClick={() => {
            navigate("/clothes");
          }}
          variant="text"
        >
          Women
        </Choose>
        <Choose
          variant="text"
          onClick={() => {
            navigate("/selected");
          }}
        >
          Kids
        </Choose>
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
  background: #d4c9c9;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0.92;
  border-bottom: 1px solid black;
  padding: 10px 18px 10px 18px;
  @media (min-width: 1440px) {
    padding: 32px 100px 32px 100px;
  }
`;

const Description = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled("img")`
  width: 25px;
  height: 25px;
  @media (min-width: 1440px) {
    width: 40px;
    height: 40px;
  }
`;

const Name = styled(Typography)`
  color: #333333;
  text-shadow: 0px 0px 5px #fff;
  font-weight: 400;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
  font-family: "Ysabeau Office", sans-serif;
  @media (min-width: 1440px) {
    font-size: 20px;
  }
`;

const Shop = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchDiv = styled(Box)`
  display: flex;
  padding: 6px 7px 7px 7px;
  align-items: center;
  gap: 6px;
  border-radius: 100%;
  background: #f6f6f6;
  border: 1px solid black;
  margin-right: 10px;
  @media (min-width: 1440px) {
    width: 267px;
    padding: 12px 15px 12px 20px;
    gap: 12px;
    margin-right: 64px;
    border: none;
    border-radius: 8px;
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
    background: #f6f6f6;
  }
`;

const SearchIcon = styled("img")`
  width: 15px;
  height: 15px;
  cursor: pointer;
  @media (min-width: 1440px) {
    width: 20px;
    height: 20px;
  }
`;

const HeaderIcon = styled("img")`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;

  @media (min-width: 1440px) {
    padding: 12px;
    gap: 12px;
    border-radius: 8px;
    background: #f6f6f6;
    margin-left: 12px;
  }
`;

const Menu = styled("img")`
  width: 25px;
  height: 25px;
  margin-left: 10px;
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

const Type = styled(Typography)`
  color: #3c4242;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: "Ysabeau Office", sans-serif;
  margin-left: 40px;
  cursor: pointer;
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
