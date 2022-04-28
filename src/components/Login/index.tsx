import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertError from "../AlertError";
import { fetchAsyncLogIn, selectUser } from "../../store/auth/loginSlice";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Button, Grid, keyframes } from "@mui/material";
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

export default function Login() {
  //Animation

  const [pop, setPop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPop(true);
    }, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { error, token } = user;

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const dispatch = useAppDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(fetchAsyncLogIn({ email, password }));
    setEmail("");
    setPassword("");
  };

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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Holder>
    </>
  );
}
