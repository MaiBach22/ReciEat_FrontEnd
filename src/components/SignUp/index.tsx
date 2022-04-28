import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";

import { fetchAsyncSignUp, getError } from "../../store/auth/signupSlice";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { experimentalStyled as styled } from "@mui/material/styles";
import AlertError from "../AlertError";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@mui/material";

const popup = keyframes`

  0% {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }

`;

interface HolderProps {
  popU: any;
}

const Holder = styled(Box)(({ popU }: HolderProps) => ({
  animation: popU && `${popup} 0.6s ease-out both`,
}));

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ReciEat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function SignUp() {
  //Animation

  const [pop, setPop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPop(true);
    }, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const user = useSelector(getError);
  const navigate = useNavigate();

  const { error, token } = user;

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(fetchAsyncSignUp({ email, password, username }));
  };

  useEffect(() => {
    if (token !== "") {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Holder popU={pop}>
        <div>
          <h3>{error ? <AlertError error={error} /> : null}</h3>
        </div>

        <Container component="div" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="username"
                    value={username}
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    autoFocus
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="email"
                    value={email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    value={password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Holder>
    </>
  );
}
