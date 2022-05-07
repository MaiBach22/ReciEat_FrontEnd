import { Grid, Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch } from "../../store";
import {
  fetchAsyncTags,
  getAllTags,
} from "../../store/recipe/Slices/recipeSlice";
import { useSelector } from "react-redux";

export default function AddTags() {
  const dispatch = useAppDispatch();

  const tags = useSelector(getAllTags);

  useEffect(() => {
    dispatch(fetchAsyncTags());
  }, [dispatch]);

  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log("tagId", checked);
  return (
    <Grid container spacing={1} item xs={11} md={12}>
      <Box sx={{ marginTop: "30px" }}>
        <Typography variant="subtitle1">Add Tags To Your Recipe </Typography>
      </Box>
      <Grid container spacing={1} item xs={11} md={12}>
        <Box>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {tags.map((tag) => {
              const labelId = `checkbox-list-label-${tag.title}`;

              return (
                <ListItem key={tag.id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(tag.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(tag.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={` ${tag.title}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}
