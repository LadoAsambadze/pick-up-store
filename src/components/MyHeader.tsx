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
          <Name
            onClick={() => {
              navigate("/");
            }}
          >
            Pick Up Store
          </Name>

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
            <SearchIcon src="/search-black.avif" alt="Search loop icon" />
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
            src="/admin.avif"
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
          <HeaderIcon
            src="logout.avif"
            style={{ display: logged ? "block" : "none" }}
            onClick={() => {
              deleteCookie("token");
              persistor.pause();
              persistor.flush().then(() => {
                return persistor.purge();
              });
              window.location.reload();
            }}
          />

          <Menu onClick={menuHandler} src="/menu-white.avif" alt="Menu icon" />
        </Shop>
      </Main>
      <SearchAbsolute style={{ display: searchTab ? "block" : "none" }}>
        <SearchSection>
          <SearchDivAbsolute>
            <SearchIcon src="/search-black.avif" alt="Search loop icon" />
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
            <Xdiv
              onClick={() => {
                setSearchTab(false);
              }}
            >
              X
            </Xdiv>
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
                          src={`https://pick-up-store-backend-production.up.railway.app${item.itemList[0].urls[0]}`}
                        />
                      </SmallImageDiv>
                      <DescriptionDiv>
                        <ItemName>Name: {item.name}</ItemName>
                        <ItemPrice>Price: $ {item.price}</ItemPrice>
                      </DescriptionDiv>
                    </LiveSearchItem>
                  ))}
                {data.filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (
                  <h1
                    style={{
                      margin: "auto",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    }}
                  >
                    Item not found
                  </h1>
                )}
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
            setMenu(false);
          }}
          variant="text"
        >
          Shoes
        </Choose>
        <Choose
          onClick={() => {
            navigate("/clothes");
            setMenu(false);
          }}
          variant="text"
        >
          Clothes
        </Choose>
        <Choose
          variant="text"
          onClick={() => {
            navigate("/newarrivals");
            setMenu(false);
          }}
        >
          Arrivals
        </Choose>
        <Line></Line>
        <Choose
          onClick={() => {
            navigate("/login");
            setMenu(false);
          }}
        >
          Login
        </Choose>
      </MenuList>
    </>
  );
}

const Main = styled(Box)`
  background: #d1d4c9;
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

const Name = styled(Typography)`
  @media (min-width: 1440px) {
    display: block;
    color: #333333;
    text-shadow: 0px 0px 5px #fff;
    font-weight: 400;
    font-size: 24px;
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
  position: absolute;
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
`;
const SearchSection = styled(Box)`
  width: 100%;
  background: #cac4c4;
  padding: 15px 20px 15px 20px;

  @media (min-width: 1440px) {
    padding: 32px 60px 35px 60px;
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
  height: 100%;
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
  &:hover {
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
  }
`;

const MenuList = styled(Box)`
  width: 50%;
  height: 300px;
  background: #979991;
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
  background-color: white;
  color: black;
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

const LiveSearch = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  position: absolute;
  left: 0;
  top: 60px;
  border: 1px solid gray;
  background-color: white;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1440px) {
    top: 80px;
  }
`;

const LiveSearchItem = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: 1px solid black;
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
  padding-left: 20px;
  align-items: flex-start;
  justify-content: center;
  background-color: #c0b3b3;
  cursor: pointer;
`;

const Xdiv = styled(Button)`
  position: absolute;
  height: 100%;
  top: 0px;
  right: 0px;
  color: black;
  cursor: pointer;
  &:hover {
    background: #7c7ca6;
  }
`;
const ItemName = styled(Typography)``;

const ItemPrice = styled(Typography)``;
