import { styled } from "@mui/material";
import Header from "../components/header";
import { Box } from "@mui/material";
import Sort from "../components/sort";


export default function Section() {
  return (
    <>
      <Header />
      <Main>
        <FindBy>
          <Sort />
        </FindBy>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 40px 10px 40px;
`;

const FindBy = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;
