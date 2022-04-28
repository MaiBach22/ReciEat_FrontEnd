import React from "react";
import { Typography, Box, Grid } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { getIngredients } from "../../store/recipe/Slices/recipeSlice";

export default function Ingredients() {
  const ing = useSelector(getIngredients);

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
        Ingredients{" "}
      </Typography>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {ing.map((ingr) => {
          const labelId = `checkbox-list-label-${ingr.id}`;

          return (
            <ListItem key={ingr.id} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                {ingr.amount == null ? (
                  <ListItemText
                    id={labelId}
                    primary={`${ingr.measure} ${ingr.text}`}
                    sx={{
                      fontFamily: "Ubuntu,sans-serif",
                      fontWeight: "700",
                      fontSize: "25px",
                    }}
                  />
                ) : (
                  <ListItemText
                    id={labelId}
                    primary={`${ingr.amount} ${ingr.measure} ${ingr.text}`}
                    sx={{
                      fontFamily: "Ubuntu,sans-serif",
                      fontWeight: "700",
                      fontSize: "25px",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
