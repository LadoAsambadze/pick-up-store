import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/search-slice";
import { resetFilter } from "../store/filter-slice";
import { RootState } from "../store/redux";
import { deleteCookie } from "cookies-next";
import { persistor } from "../store/redux";

export default function Header() {
  const dispatch = useDispatch();
  const logged = useSelector((state: RootState) => state.extra.auth);
  const search = useSelector((state: RootState) => state.search.search);
  const user = useSelector((state: RootState) => state.user);
  const data = useSelector((state: RootState) => state.data.data);
  const [searchTab, setSearchTab] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
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
            <Type
              onClick={() => {
                navigate("/NewArrivals");
              }}
            >
              New Arrivals
            </Type>
          </DestkopMenu>
        </Description>

        <Shop>
          <SearchDiv
            style={{ position: "relative" }}
            onClick={() => {
              setSearchTab(true);
            }}
          >
            <SearchIcon src="/search-black.png" alt="Search loop icon" />
            <SearchLabel>Search</SearchLabel>
          </SearchDiv>

          <HeaderIcon
            src="/heart.svg"
            alt="Favourite section icon/button"
            onClick={() => navigate("/Favourites")}
          />

          <HeaderIcon
            onClick={() => navigate("/cart")}
            src="/cart.svg"
            alt="Shoping cart icon"
          />
          <HeaderIcon
            style={{
              display:
                user.userinfo && user.userinfo.isAdmin ? "block" : "none",
              padding: 0,
            }}
            src="/admin.png"
            alt="Admin"
            onClick={() => {
              navigate("/Admin");
            }}
          />

          <HeaderIcon
            style={{ display: logged ? "none" : "block" }}
            onClick={() => {
              if (!logged) {
                navigate("/login");
              }
            }}
            src="/user.svg"
            alt="User icon"
          />
          <Logout
            style={{ display: logged ? "block" : "none" }}
            onClick={() => {
              deleteCookie("token");
              persistor.pause();
              persistor.flush().then(() => {
                return persistor.purge();
              });
              window.location.reload();
            }}
          >
            Log out
          </Logout>

          <Menu onClick={menuHandler} src="/menu-white.png" alt="Menu icon" />
        </Shop>
      </Main>
      <SearchAbsolute style={{ display: searchTab ? "block" : "none" }}>
        <SearchSection>
          <SearchDivAbsolute>
            <SearchIcon src="/search-black.png" alt="Search loop icon" />
            <SearchInput
              style={{
                display: "block",
                border: "none",
                outline: "none",
              }}
              placeholder="Search"
              onChange={(e) => {
                dispatch(setSearch(e.target.value));
              }}
            />
            <div
              style={{ position: "absolute", top: "-20px", right: "-20px" }}
              onClick={() => {
                setSearchTab(false);
              }}
            >
              X
            </div>
            {search !== "" && (
              <LiveSearch>
                {data
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <LiveSearchItem
                      key={index}
                      onClick={() => {
                        const id = item._id;
                        if (item.type === "shoes") {
                          window.location.href = `/shoes/${id}`;
                        } else {
                          window.location.href = `/clothes/${id}`;
                        }
                      }}
                    >
                      <SmallImageDiv>
                        <SmallImage
                          src={`http://localhost:3000${item.itemList[0].urls[0]}`}
                        />
                      </SmallImageDiv>
                      <DescriptionDiv>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price}</ItemPrice>
                      </DescriptionDiv>
                    </LiveSearchItem>
                  ))}
                {data.filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && <h1>Item not found</h1>}
              </LiveSearch>
            )}
          </SearchDivAbsolute>
        </SearchSection>
      </SearchAbsolute>
      <MenuList
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
          Shoes
        </Choose>
        <Choose
          onClick={() => {
            navigate("/clothes");
          }}
          variant="text"
        >
          Clothes
        </Choose>
        <Choose variant="text">Sales</Choose>
        <Line></Line>
        <Login
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Login>
        <IconsDiv>
          <Icon src="/vite.svg" />
          <Icon src="/vite.svg" />
          <Icon src="/vite.svg" />
        </IconsDiv>
      </MenuList>
    </>
  );
}

const Main = styled(Box)`
  background: #d4d4c9;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0.92;
  border-bottom: 1px solid #169c89;
  padding: 15px 20px 12px 20px;
  position: relative;
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
  display: none;
  @media (min-width: 1440px) {
    display: block;
    font-size: 20px;
    color: #333333;
    text-shadow: 0px 0px 5px #fff;
    font-weight: 400;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
    font-family: "Ysabeau Office", sans-serif;
  }
`;

const Shop = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchDiv = styled(Box)`
  display: flex;
  padding: 5px;
  align-items: center;
  gap: 6px;
  border-radius: 100%;
  background: white;
  border: 1px solid #7c7a77;
  margin-right: 10px;
  cursor: pointer;
  @media (min-width: 1440px) {
    width: 267px;
    padding: 12px 15px 12px 20px;
    gap: 12px;
    margin-right: 64px;
    border: none;
    border-radius: 8px;
  }
`;
const SearchLabel = styled(Typography)`
  display: none;
  @media (min-width: 1440px) {
    font-family: "Ysabeau Office", sans-serif;
    font-size: 16px;
    display: block;
    margin-left: 10px;
  }
`;

const SearchAbsolute = styled(Box)`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const SearchDivAbsolute = styled(Box)`
  display: flex;
  padding: 12px 15px 12px 20px;
  width: 100%;
  background: white;
  border: 1px solid #7c7a77;
  position: relative;
  border-radius: 8px;
  border: none;
`;
const SearchSection = styled(Box)`
  width: 100%;
  background: #cac4c4;
  padding: 20px 50px 20px 50px;
  @media (min-width: 768px) {
    padding: 20px 50px 20px 50px;
  }
`;

const SearchInput = styled("input")`
  display: block;
  width: 100%;
  outline: none;
  margin-left: 5px;
  border: none;
  background: white;
`;
const SearchIcon = styled("img")`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const HeaderIcon = styled("img")`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30px;
  margin-left: 4px;
  @media (min-width: 1440px) {
    width: 45px;
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
  @media (min-width: 900px) {
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

const MenuList = styled(Box)`
  width: 270px;
  height: 360px;
  background: linear-gradient(to top, black, #2c282c);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  top: 58px;
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
const Logout = styled(Box)`
  background: white;
  font-size: 17px;
  margin-left: 15px;
  cursor: pointer;
`;

const LiveSearch = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  position: absolute;
  left: 0;
  top: 63px;
  border: 1px solid gray;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LiveSearchItem = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const SmallImageDiv = styled(Box)`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
`;
const SmallImage = styled("img")`
  cursor: pointer;
  max-width: 100%;
`;

const DescriptionDiv = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: gray;
`;

const ItemName = styled(Typography)``;

const ItemPrice = styled(Typography)``;
