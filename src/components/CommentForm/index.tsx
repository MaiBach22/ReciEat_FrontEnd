import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Grid, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch } from "../../store";

import { fetchAsyncComments } from "../../store/recipe/Slices/recipeSlice";

export const CommentForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();

  const handleComment = (e: any) => {
    e.preventDefault();
    console.log("change");
    dispatch(fetchAsyncComments(content));
  };

  return (
    <Grid sx={{ marginTop: "30px" }} container item xs={11} md={11}>
      <Paper
        component="form"
        sx={{
          p: "20px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          multiline
          fullWidth
          id="outlined-multiline-static"
          label="what do you think about this recipe?"
          variant="outlined"
          rows={4}
          onChange={(e) => setContent(e.target.value)}
        />
        <IconButton
          type="submit"
          onClick={(e) => handleComment(e)}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
};
