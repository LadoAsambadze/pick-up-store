import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../index.css";
export default function Sort() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box className="sort-box">
      <FormControl className="sort-box">
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value={10}>Price - Low to High</MenuItem>
          <MenuItem value={20}>Price - High to low</MenuItem>
          <MenuItem value={30}>New to old</MenuItem>
          <MenuItem value={30}>Old to new</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
