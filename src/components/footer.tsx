import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

export default function Footer() {
  return (
    <>
      <MainDiv>
        <Description>
          <Name>Pick up store</Name>
          <LittleText>
            "qkegjqjgqejg qqeng qegpi qe kkk k ll jgp qge qgq egq gi qepig
            nqepng pqeingi qeng nqepign q"
          </LittleText>
          <SectionStore>
            <Kind>About Us</Kind>
            <Arrow src="/arrow-down.png" />
          </SectionStore>
          <SectionStore>
            <Kind>Legacy</Kind>
            <Arrow src="/arrow-down.png" />
          </SectionStore>
          <SectionStore>
            <Kind>Follow</Kind>
            <Arrow src="/arrow-down.png" />
          </SectionStore>
        </Description>
      </MainDiv>
    </>
  );
}

const MainDiv = styled("div")`
  width: 100%;
  background: linear-gradient(to top, black, #2e2829);
  display: flex;
  flex-direction: column;
  padding: 40px 60px 60px 60px;
`;
const Description = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled(Typography)`
  color: white;
  font-size: 24px;
`;

const LittleText = styled(Typography)`
  color: white;
  font-size: 12px;
  margin-top: 10px;
`;

const SectionStore = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid white;
  margin-top: 15px;
`;

const Kind = styled(Typography)`
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const Arrow = styled("img")`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
