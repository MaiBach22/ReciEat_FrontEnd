import React from "react";
import { Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { useSelector } from "react-redux";
import { getResult } from "../../store/recipe/Slices/recipeSlice";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => ({
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
}));

export default function SearchResult() {
  const classes = useStyles();

  const results = useSelector(getResult);

  return (
    <Grid container spacing={1} className={classes.grid}>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{
            fontFamily: "Ubuntu,sans-serif",
            fontWeight: "700",
            color: "secondary.main",
            textAlign: "center",
            marginTop: "50px",
          }}
          variant="h4"
        >
          Today you will eat ...
        </Typography>
      </Grid>
      {results.map((result, index) => {
        return (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            sm={5}
            md={5}
            lg={4}
            xl={3}
            key={index}
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
                image={result.imgUrl}
                alt={result.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <Link to={`/recipes/${result.id}`}>{result.title}</Link>
                </Typography>
                <CardActions>
                  <Typography gutterBottom variant="h6" component="div">
                    <AccessAlarmOutlinedIcon /> {result.cooktime}
                  </Typography>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
