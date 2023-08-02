import { Typography, styled } from "@mui/material";
import Header from "../components/header";
import { Box } from "@mui/material";
import Sort from "../components/sort";
import FilterComponent from "../components/filter";
import { useState } from "react";

export default function Section() {
  const [filter, setFilter] = useState(false);
  return (
    <>
      <Header />
      <Main>
        <FindBy>
          <FilterDiv
            onClick={() => {
              setFilter(true);
            }}
          >
            <Filter>Filter</Filter>
            <FilterIcon src="/filter.png" />
          </FilterDiv>
          <FilterComponent />
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

const FilterDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  padding: 8px 15px 8px 15px;
  cursor: pointer;
`;
const Filter = styled(Typography)`
  font-size: 20px;
`;

const FilterIcon = styled("img")`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;
