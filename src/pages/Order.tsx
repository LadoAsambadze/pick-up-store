import { Box, styled } from "@mui/system";

export default function Order() {
  return (
    <>
      <Main></Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;

  min-height: 100vh;
  padding: 10px 20px 10px 20px;
  @media (min-width: 500px) {
    padding: 10px 35px 10px 35px;
  }
  @media (min-width: 768px) {
    padding: 10px 50px 10px 50px;
  }
  @media (min-width: 1200px) {
    padding: 10px 100px 10px 100px;
  }
`;
