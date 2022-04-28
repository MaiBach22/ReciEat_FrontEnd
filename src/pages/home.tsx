import axios from "axios";
import { useEffect } from "react";

import RecipesComponents from "../components/RecipesComponents";
import { fetchAsyncRecipes } from "../store/recipe/Slices/recipeSlice";
import SearchComponent from "../components/SearchComponent";

// Material UI 5
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { useAppDispatch } from "../store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncRecipes());
  }, [dispatch]);

  return (
    <>
      <div>
        <SearchComponent />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Typography
            sx={{
              fontFamily: "Ubuntu, sans-serif",
              marginTop: "50px",
              color: "secondary.main",
              width: "100%",
              textAlign: "center",
            }}
            variant="h4"
          >
            All Recipes
          </Typography>
          <RecipesComponents />
        </Grid>
      </div>
    </>
  );
};

export default Home;
