import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";

export default function Header() {
  return (
    <>
      <Main>
        <Description>
          <Logo src="/vite.svg" alt="Website pick up store logo" />
          <Name>Pick Up </Name>
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
          <Menu src="/menu-white.png" alt="Menu icon" />
        </Shop>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px 20px 15px;
  opacity: 0.95;
  @media (min-width: 1440px) {
    padding: 30px 25px 30px 45px;
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
  color: white;
  font-family: Poppins;
  font-weight: 400;
  font-size: 24px;
  margin-left: 10px;
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
    border-radius: 15px;
    padding: 6px 8px 6px 10px;
    border: 3px solid gray;
    &:hover {
      border-color: green;
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
  border-color: black;
  padding: 2px 15px 2px 15px;

  &:hover {
    border-color: green;
  }
`;
