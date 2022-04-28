import React from "react";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { getInstructions } from "../../store/recipe/Slices/recipeSlice";
import { IndexKind } from "typescript";

export default function Instruction() {
  const instruc = useSelector(getInstructions);
  return (
    <>
      <Typography
        sx={{
          fontFamily: "Ubuntu,sans-serif",
          fontWeight: "700",
        }}
        variant="h5"
      >
        {" "}
        How To Cook{" "}
      </Typography>

      <List sx={{ width: "90%", bgcolor: "background.paper" }}>
        {instruc.map((ins, index) => {
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ textAlign: "justify" }}
                primary={ins.content}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
