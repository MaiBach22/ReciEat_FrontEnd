import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Grid } from "@material-ui/core";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [" Introduction", "Add Ingredients", "Add Instructions"];

export default function AddRecipe() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(activeStep);
  return (
    <Container component="div" maxWidth="lg">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              //   <Typography sx={{ mt: 2, mb: 1 }}>

              //   </Typography>
              <Box
                component="form"
                sx={{
                  mt: 1,
                }}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={1} item xs={11} md={12}>
                  <Box sx={{ marginBottom: "20px", marginTop: "20px" }}>
                    <Typography variant="subtitle1">
                      First let we know what recipe you want to create
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Title"
                  />
                  <TextField
                    sx={{ marginTop: "10px" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Link Image"
                  />
                  <TextField
                    sx={{ marginRight: "10px", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Prepare Time"
                  />
                  <TextField
                    sx={{ marginRight: "10px", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Cook Time"
                  />
                  <TextField
                    sx={{ marginRight: "10px", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Serving for (people)"
                  />
                </Grid>
                {/* <Button
          sx={{
            marginTop: "20px",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
          variant="contained"
          color="inherit"
        >
          Continue
        </Button> */}
              </Box>
            ) : activeStep === 1 ? (
              <Typography sx={{ mt: 2, mb: 1 }}>Something </Typography>
            ) : (
              <Typography sx={{ mt: 2, mb: 1 }}>Something 3 </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
