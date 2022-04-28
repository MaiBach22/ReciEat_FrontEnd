import React from "react";
import { useSelector } from "react-redux";
import { getComments } from "../../store/recipe/Slices/recipeSlice";
import { Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CommentForm } from "../CommentForm";
import { selectToken } from "../../store/auth/loginSlice";

const paperStyle = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    border: "1px solid grey",
  },
  grid: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Comments() {
  const coms = useSelector(getComments);
  const classes = paperStyle();
  const token = useSelector(selectToken);
  return (
    <>
      <Grid container item xs={12} md={12} className={classes.grid}>
        <Typography
          sx={{
            fontFamily: "Ubuntu,sans-serif",
            fontWeight: "700",
          }}
          variant="h5"
        >
          {" "}
          Comments{" "}
        </Typography>
      </Grid>
      <Grid container item xs={12} md={12} className={classes.grid}>
        <List sx={{ width: "90%", bgcolor: "background.paper" }}>
          {coms.map((com) => {
            return (
              <ListItem>
                <Paper className={classes.paper}>
                  <ListItemText
                    sx={{ textAlign: "justify" }}
                    primary={com.username}
                    secondary={com.content}
                  />
                </Paper>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid container item xs={12} md={12} className={classes.grid}>
        {/* <Button variant="contained">Load More</Button> */}
      </Grid>
      {token !== null ? (
        <Grid container item xs={12} md={12} className={classes.grid}>
          <CommentForm />
        </Grid>
      ) : null}
    </>
  );
}
