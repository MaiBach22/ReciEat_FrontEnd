import { Link } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/auth/loginSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Icon } from "@mui/material";
export default function NavBar() {
  const token = useSelector(selectToken);
  return (
    <div style={{ height: "50px" }}>
      <React.Fragment>
        <AppBar>
          <Toolbar>
            <Typography
              sx={{
                fontFamily: "Ubuntu, sans-serif",
                fontWeight: "700",
                color: "primary.contrastText",
              }}
              variant="h5"
            >
              <Link href="/" underline="none" color="inherit">
                ReciEat.
              </Link>
            </Typography>

            <Button
              href="/signup"
              sx={{ marginLeft: "auto", bgcolor: "primary.light" }}
              variant="contained"
            >
              Sign Up
            </Button>
            {token == null ? (
              <Button
                href="/login"
                sx={{
                  marginLeft: "10px",
                  color: "primary.contrastText",
                }}
                variant="outlined"
                color="inherit"
              >
                Log In
              </Button>
            ) : (
              <Icon fontSize="large" sx={{ marginLeft: "10px" }}>
                <Link href="/user" underline="none" color="inherit">
                  <AccountCircleIcon fontSize="large" />
                </Link>
              </Icon>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}
