import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { setSortType } from "../store/filter-slice";
export default function Sort() {
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortType(event.target.value as string));
  };

  const redux = useSelector((state: RootState) => state.filter);

  return (
    <Box className="sort-box">
      <FormControl className="sort-box">
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={redux.sortType || undefined}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="low">Price - Low to High</MenuItem>
          <MenuItem value="high">Price - High to low</MenuItem>
          <MenuItem value="new">New to old</MenuItem>
          <MenuItem value="old">Old to new</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
