import { Button, Grid, Theme, keyframes } from "@mui/material";
import { Typography, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import { experimentalStyled as styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllRecipes,
  listingResult,
} from "../../store/recipe/Slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";

const popup = keyframes`

  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }

`;

interface HolderProps {
  popU: any;
}

const Holder = styled(Box)(({ popU }: HolderProps) => ({
  bgcolor: "primary.main",
  height: "90vh",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  color: "primary.contrastText",
  flexDirection: "column",
  animation: popU && `${popup} 0.6s ease-out both`,
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  width: "30%",
  borderRadius: "20px",
  padding: "2px 0",
  marginTop: "30px",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    backgroundImage:
      "url('https://i.ibb.co/dbq3zXB/pexels-pixabay-326281-1.jpg')",
    objectFit: "cover",
  },
}));

const SearchComponent = () => {
  //Animation

  const [pop, setPop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPop(true);
    }, 0);
  }, []);

  const [term, setTerm] = useState("");
  const recipes = useSelector(getAllRecipes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(term);
    navigate(`/result/${term}`);
  };
  const imgBG = useStyle();

  const filterSearchTerm = [...recipes].filter((search) =>
    search.title.toLowerCase().includes(term.toLowerCase())
  );

  console.log(filterSearchTerm);

  useEffect(() => {
    dispatch(listingResult(filterSearchTerm));
  }, [submitHandler]);

  return (
    <Grid
      sx={{ textAlign: "center" }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Holder popU={pop} className={imgBG.root} component={"div"}>
        <Typography color="primary.contrastText" variant="h4">
          What do you want to eat today?
        </Typography>

        <Search>
          <InputBase
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            sx={{
              width: "90%",
            }}
            placeholder="search here my lord "
          ></InputBase>
        </Search>

        <Button
          type="submit"
          onClick={submitHandler}
          sx={{
            marginTop: "20px",
            bgcolor: "secondary.main",
            ":hover": {
              bgcolor: "secondary.light",
              color: "secondary.contrastText",
            },
          }}
          variant="contained"
        >
          {" "}
          Get Recipe
        </Button>
      </Holder>
    </Grid>
  );
};

export default SearchComponent;
