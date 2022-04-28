import { useSelector } from "react-redux";
import { getAllRecipes } from "../../store/recipe/Slices/recipeSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

import styled from "@mui/material/styles/styled";
import { Grid, Box } from "@mui/material";
import { Link } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import SpaIcon from "@mui/icons-material/Spa";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

const Holder = styled(Card)(() => ({
  width: 300,
  height: 400,
  padding: "20px",
  marginTop: "50px",
  marginBottom: "50px",
  border: "1px solid grey",
  boxShadow: "7px 8px 4px -3px rgba(0,0,0,0.36)",
  fontFamily: "Ubuntu, sans-serif",
  overflowWrap: "break-word",
}));

const hoverStyle = makeStyles(() => ({
  text: {
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
  },
  hover: {
    "&:hover": {
      fontSize: "20.5px",
      transition: "0.5s ease-in-out",
    },
  },
}));

const RecipesComponents = () => {
  const recipes = useSelector(getAllRecipes);
  const classes = hoverStyle();
  console.log("recipe", recipes);

  //Animation

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

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
      {recipes.map((rep) => {
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
            <Holder data-aos="fade-up">
              <CardMedia
                component="img"
                height="200"
                width="100%"
                image={rep.imgUrl}
                alt={rep.title}
              />
              <CardContent>
                <Typography
                  className={classes.text}
                  sx={{
                    color: "primary.main",
                  }}
                  variant="h6"
                  gutterBottom
                >
                  <Link
                    className={classes.hover}
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
                  <Box sx={{ "& button": { m: 0.5 } }}>
                    {rep.tags.map((tag) => {
                      return (
                        <IconButton
                          aria-label={tag.title}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            "&:hover": {
                              backgroundColor: "secondary.main",
                            },
                          }}
                        >
                          {tag.title === "Most-liked" ? (
                            <Link
                              href="/tags/6"
                              underline="none"
                              color="inherit"
                            >
                              <ThumbUpAltOutlinedIcon />
                            </Link>
                          ) : tag.title === "Quick Meal" ? (
                            <Link
                              href="/tags/4"
                              underline="none"
                              color="inherit"
                            >
                              <AccessAlarmOutlinedIcon />
                            </Link>
                          ) : tag.title === "Low-Carb" ? (
                            <Link
                              href="/tags/5"
                              underline="none"
                              color="inherit"
                            >
                              <SpaIcon />
                            </Link>
                          ) : tag.title === "Dinner" ? (
                            <Link
                              href="/tags/2"
                              underline="none"
                              color="inherit"
                            >
                              {" "}
                              <DinnerDiningIcon />
                            </Link>
                          ) : tag.title === "Breakfast" ? (
                            <Link
                              href="/tags/1"
                              underline="none"
                              color="inherit"
                            >
                              <BreakfastDiningOutlinedIcon />
                            </Link>
                          ) : (
                            <Link
                              href="/tags/3"
                              underline="none"
                              color="inherit"
                            >
                              <OutdoorGrillOutlinedIcon />
                            </Link>
                          )}
                        </IconButton>
                      );
                    })}
                  </Box>
                </CardActions>
              </CardContent>
            </Holder>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RecipesComponents;
