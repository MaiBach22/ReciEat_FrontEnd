import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  fetchAsyncTagsDetail,
  getAllReciTags,
  getTagsRec,
} from "../../store/recipe/Slices/recipeSlice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

import { Grid, Box, Theme } from "@mui/material";
import { Link } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const hoverStyle = makeStyles((theme: Theme) => ({
  hover: {
    "&:hover": {
      color: "primary.light",
    },
  },
}));

export default function TagsPage() {
  const classes = hoverStyle();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncTagsDetail(id));
  }, [dispatch, id]);
  const reptags = useSelector(getAllReciTags);
  const tags = useSelector(getTagsRec);
  console.log("reptags", reptags);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      item
      xs={12}
      sm={11}
      md={11}
      lg={11}
    >
      <Typography
        sx={{
          fontFamily: "Ubuntu,sans-serif",
          fontWeight: "700",
          color: "secondary.main",
          textAlign: "center",
          marginTop: "60px",
        }}
        variant="h4"
      >
        Here is the result of {tags.title}
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        item
        xs={12}
        sm={11}
        md={11}
        lg={11}
      >
        {reptags.map((rep) => {
          return (
            <Grid
              key={rep.id}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Card
                sx={{
                  width: 300,
                  height: 400,
                  marginTop: "50px",
                  border: "0.25px solid grey ",
                  boxShadow: "7px 8px 4px -3px rgba(0,0,0,0.36)",
                  fontFamily: "Ubuntu, sans-serif",
                  overflowWrap: "break-word",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  width="50"
                  image={rep.imgUrl}
                  alt={rep.title}
                />
                <CardContent>
                  <Typography
                    className={classes.hover}
                    sx={{
                      color: "primary.main",
                    }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    <Link
                      color="inherit"
                      underline="none"
                      href={`/recipes/${rep.id}`}
                    >
                      {rep.title}
                    </Link>
                  </Typography>
                  <CardActions>
                    <Typography gutterBottom variant="h6" component="div">
                      <AccessAlarmOutlinedIcon /> {rep.cooktime}
                    </Typography>
                  </CardActions>
                  <CardActions>
                    <Box sx={{ "& button": { m: 0.5 } }}></Box>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
