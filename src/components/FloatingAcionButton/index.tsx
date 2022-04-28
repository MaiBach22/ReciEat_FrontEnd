import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Theme } from "@mui/material";
import { ClickAwayListener } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAsyncLikes,
  getLikes,
} from "../../store/recipe/Slices/recipeSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../store";

export default function FloatingActionButtons() {
  const [clicked, setClicked] = useState(true);

  const dispatch = useAppDispatch();

  const handleAddLike = () => {
    console.log("down");
    setClicked(!clicked);
    dispatch(fetchAsyncLikes(1));
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: "0",
        bottom: "10px",
        zIndex: "1",
      }}
    >
      <Fab color="primary" aria-label="add" size="small">
        <AddIcon />
      </Fab>

      <Fab
        color={clicked ? "primary" : "secondary"}
        onClick={handleAddLike}
        aria-label="like"
        size="small"
      >
        <FavoriteIcon />
      </Fab>
    </Box>
  );
}
