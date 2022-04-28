import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  fetchAsyncRecipeDetail,
  getRecipeDetail,
  getTags,
  removeListing,
} from "../../store/recipe/Slices/recipeSlice";

import Ingredients from "../ListIngredients";
import Comments from "../Comments";
import { Grid, Button, Typography, Box, Theme } from "@mui/material";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import Instruction from "../Instruction";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";

import FloatingActionButtons from "../FloatingAcionButton";

// const Hero = styled("div")(({ theme }) => ({
//   width: "80%",
//   height: "auto",
//   marginTop: "30px",
//   textAlign: "center",
//   alignItems: "center",
//   justifyContent: "center",
//   display: "flex",
// }));

const imgStyle = makeStyles((theme: Theme) => ({
  root: {
    objectFit: "cover",
    marginBottom: "40px",
    marginRight: "30px",
  },
}));

const styleGrid = makeStyles((theme: Theme) => ({
  grid: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cook: {
    width: "100%",
    justifyContent: "center",
  },
  tag: {
    width: "100",
    justifyContent: "center",
  },
  info: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    border: "0.25px solid grey",
  },
}));

export default function DetailRecipe() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const rep = useSelector(getRecipeDetail);

  const tags = useSelector(getTags);

  console.log(tags);

  useEffect(() => {
    if (id && id !== "") {
      dispatch(fetchAsyncRecipeDetail(id));
    }
    return () => {
      dispatch(removeListing());
    };
  }, [dispatch, id]);

  const img = imgStyle();
  const classes = styleGrid();

  return (
    <>
      <FloatingActionButtons />
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={12}>
          <Typography
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: "700",
              color: "secondary.main",
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "40px",
            }}
            variant="h4"
          >
            {rep.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={6}>
          <img
            className={img.root}
            width="100%"
            src={rep.imgUrl}
            alt={rep.title}
          />
        </Grid>
        <Grid
          sx={{ marginLeft: "30px", marginBottom: "40px" }}
          container
          spacing={1}
          item
          xs={9}
          md={4}
          className={classes.info}
        >
          <Grid item xs={3} md={4}>
            <PeopleAltIcon /> Serving:
          </Grid>
          <Grid item xs={3} md={7}>
            {rep.serving} people
          </Grid>
          <Grid item xs={3} md={4}>
            <RoomServiceOutlinedIcon /> Prepare time:
          </Grid>
          <Grid item xs={3} md={7}>
            {rep.preptime}
          </Grid>
          <Grid item xs={3} md={4}>
            <WatchLaterOutlinedIcon /> Cooking time:
          </Grid>
          <Grid item xs={3} md={7}>
            {rep.cooktime}
          </Grid>
          <Grid item xs={3} md={4}>
            <ThumbUpAltOutlinedIcon /> Likes:
          </Grid>
          <Grid item xs={3} md={7}>
            {rep.likes}
          </Grid>
          <Grid item xs={3} md={4}>
            <TagOutlinedIcon />
            Tags:
          </Grid>
          <Grid item xs={12} md={7} className={classes.grid}>
            <Grid container item xs={12} md={12} className={classes.tag}>
              <Box sx={{ "& button": { m: 1 } }}>
                {!tags
                  ? "loading"
                  : tags.map((tag) => {
                      return (
                        <Button variant="contained" size="medium">
                          {tag.title}
                        </Button>
                      );
                    })}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} item xs={11} md={12} className={classes.cook}>
        <Grid item xs={11} md={4}>
          <Ingredients />
        </Grid>
        <Grid item xs={11} md={6}>
          <Instruction />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={12}>
          <Comments />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={12}>
          6
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={12}>
          7
        </Grid>
      </Grid>
    </>
  );
}
