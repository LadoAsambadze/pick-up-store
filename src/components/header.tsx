import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

export default function Header() {
  return (
    <>
      <Main>
        <Description>
          <Logo src="/vite.svg" alt="Website pick up store logo" />
          <Name>PickUp</Name>
        </Description>
        <Shop>
          <SearchDiv>
            <SearchIcon src="/search-black.png" alt="Search loop icon" />
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
  background-color: #0e0c0c;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px 20px 15px;
`;

const Description = styled(Box)`
  display: flex;
  flex-direction: row;
`;

const Logo = styled("img")({});

const Name = styled(Typography)`
  color: white;
  font-family: Poppins;
  font-weight: 400;
  font-size: 24px;
  margin-left: 10px;
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
`;

const SearchIcon = styled("img")({
  width: "20px",
  height: "20px",
  cursor: "pointer",
});

const Favourite = styled("img")({
  width: `20px`,
  height: `22px`,
  marginLeft: `10px`,
  cursor: `pointer`,
});

const Cart = styled("img")({
  width: `25px`,
  height: `25px`,
  marginLeft: `10px`,
  cursor: `pointer`,
});

const Menu = styled("img")({
  width: `25px`,
  height: `25px`,
  marginLeft: `10px`,
  cursor: `pointer`,
});
