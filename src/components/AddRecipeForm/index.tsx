import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Grid } from "@material-ui/core";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../store";
import {
  fetchAsyncNewRecipe,
  fetchAsyncTags,
  getAllTags,
} from "../../store/recipe/Slices/recipeSlice";

import { generate } from "shortid";

import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const steps = [" Introduction", "Add Ingredients", "Add Instructions"];

export interface Ingredient {
  id: string;
  amount: string;
  measure: string;
  text: string;
}

export interface Instruction {
  id: string;
  content: string;
}

export interface Tag {
  tagId: string;
}

export interface Recipe {
  title: string;
  imgUrl: string;
  preptime: string;
  cooktime: string;
  serving: string;
  likes: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  recipetags: Tag[];
}

export default function AddRecipe() {
  const dispatch = useAppDispatch();

  const tags = useSelector(getAllTags);

  useEffect(() => {
    dispatch(fetchAsyncTags());
  }, [dispatch]);

  const [recipetags, setRecipeTags] = useState<Tag[]>([]);

  const handleToggle = (tagId: any) => () => {
    const currentIndex = recipetags.indexOf(tagId);
    // console.log("currentIndex", currentIndex);
    var newChecked = [...recipetags];

    if (currentIndex === -1) {
      //setRecipeTags([...recipetags, { tagId: tagId }]);
      newChecked.push(tagId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setRecipeTags(newChecked);
  };

  console.log("tagId", recipetags);

  const [activeStep, setActiveStep] = useState(0);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: generate(), amount: "", measure: "", text: "" },
  ]);

  const [instructions, setInstructions] = useState<Instruction[]>([
    { id: generate(), content: "" },
  ]);

  // const [recipetags, setRecipeTags] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [preptime, setPreptime] = useState("");
  const [cooktime, setCooktime] = useState("");
  const [serving, setServing] = useState("");

  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    imgUrl: "",
    preptime: "",
    cooktime: "",
    serving: "",
    likes: 0,
    ingredients: [],
    instructions: [],
    recipetags: [],
  });

  console.log(title);
  const handleNext = (e: any) => {
    e.preventDefault();

    if (activeStep === 0) {
      if (
        !recipe.title ||
        !recipe.imgUrl ||
        !recipe.preptime ||
        !recipe.cooktime ||
        !recipe.serving
      ) {
        console.log("false");
        return false;
      } else {
        console.log("ttr");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      recipe.ingredients.map((ing) => {
        if (!ing.text) {
          console.log("false1");
          return false;
        }
        return true;
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      recipe.instructions.map((ins) => {
        if (!ins.content) {
          return false;
        }
        return true;
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: generate(), amount: "", measure: "", text: "" },
    ]);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, { id: generate(), content: "" }]);
  };

  const handleSubmitRepcipe = (e: any) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    console.log("fini");
    console.log("re", recipe);
    dispatch(
      fetchAsyncNewRecipe({
        title,
        imgUrl,
        preptime,
        cooktime,
        serving,
        ingredients,
        instructions,
        recipetags,
      })
    );
  };
  useEffect(() => {
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    setTitle(recipe.title);
    setImgUrl(recipe.imgUrl);
    setPreptime(recipe.preptime);
    setCooktime(recipe.cooktime);
    setServing(recipe.serving);
    recipe.recipetags = recipetags;
  }, [handleSubmitRepcipe]);

  console.log(recipe);
  console.log("activeStep", activeStep);
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
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length + 1 ? (
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
                    onChange={(e) =>
                      setRecipe({ ...recipe, title: e.target.value })
                    }
                    value={recipe.title}
                  />
                  <TextField
                    sx={{ marginTop: "10px" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Link Image"
                    onChange={(e) =>
                      setRecipe({ ...recipe, imgUrl: e.target.value })
                    }
                    value={recipe.imgUrl}
                  />
                  <TextField
                    sx={{ marginRight: "10px", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Prepare Time"
                    onChange={(e) =>
                      setRecipe({ ...recipe, preptime: e.target.value })
                    }
                    value={recipe.preptime}
                  />
                  <TextField
                    sx={{ marginRight: "10px", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Cook Time"
                    onChange={(e) =>
                      setRecipe({ ...recipe, cooktime: e.target.value })
                    }
                    value={recipe.cooktime}
                  />
                  <TextField
                    sx={{ marginRight: "10px", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Serving for (people)"
                    onChange={(e) =>
                      setRecipe({ ...recipe, serving: e.target.value })
                    }
                    value={recipe.serving}
                  />
                </Grid>
                <Grid container spacing={1} item xs={11} md={12}>
                  <Box sx={{ marginTop: "30px" }}>
                    <Typography variant="subtitle1">
                      Add Tags To Your Recipe{" "}
                    </Typography>
                  </Box>
                  <Grid container spacing={1} item xs={11} md={12}>
                    <Box>
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
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
                                    checked={recipetags.indexOf(tag.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  id={labelId}
                                  primary={` ${tag.title}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : activeStep === 1 ? (
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
                      Add the ingredients to your recipe
                    </Typography>
                    <Box>
                      {ingredients.map((ing) => {
                        return (
                          <Box
                            key={ing.id}
                            sx={{
                              marginBottom: "20px",
                              marginTop: "20px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <TextField
                              sx={{ marginRight: "10px" }}
                              id="outlined-required"
                              label="Amount"
                              onChange={(e) => {
                                const amount = e.target.value;
                                setIngredients((currentIngredient) =>
                                  currentIngredient.map((x) =>
                                    x.id === ing.id
                                      ? {
                                          ...x,
                                          amount,
                                        }
                                      : x
                                  )
                                );
                              }}
                              value={ing.amount}
                            />
                            <TextField
                              sx={{ marginRight: "10px" }}
                              id="outlined-required"
                              label="Unit"
                              onChange={(e) => {
                                const measure = e.target.value;
                                setIngredients((currentIngredient) =>
                                  currentIngredient.map((x) =>
                                    x.id === ing.id
                                      ? {
                                          ...x,
                                          measure,
                                        }
                                      : x
                                  )
                                );
                              }}
                              value={ing.measure}
                            />
                            <TextField
                              sx={{ marginRight: "10px" }}
                              inputProps={{ maxLength: "100" }}
                              required
                              id="outlined-required"
                              label="Text"
                              onChange={(e) => {
                                const text = e.target.value;
                                setIngredients((currentIngredient) =>
                                  currentIngredient.map((x) =>
                                    x.id === ing.id
                                      ? {
                                          ...x,
                                          text,
                                        }
                                      : x
                                  )
                                );
                              }}
                              value={ing.text}
                            />
                            <Button
                              onClick={() => {
                                setIngredients((currentIngredient) =>
                                  currentIngredient.filter(
                                    (x) => x.id !== ing.id
                                  )
                                );
                              }}
                            >
                              x
                            </Button>
                          </Box>
                        );
                      })}

                      <Button
                        sx={{
                          marginLeft: "auto",
                          bgcolor: "primary.light",
                        }}
                        variant="contained"
                        type="button"
                        onClick={handleAddIngredient}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            ) : activeStep === 2 ? (
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
                      Add the instruction to your recipe
                    </Typography>
                    <Box>
                      {instructions.map((ins) => {
                        return (
                          <Box
                            key={ins.id}
                            sx={{
                              marginBottom: "20px",
                              marginTop: "20px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <TextField
                              required
                              fullWidth
                              sx={{ marginRight: "10px" }}
                              id="outlined-required"
                              label="Content"
                              onChange={(e) => {
                                const content = e.target.value;
                                setInstructions((currentInstruction) =>
                                  currentInstruction.map((x) =>
                                    x.id === ins.id
                                      ? {
                                          ...x,
                                          content,
                                        }
                                      : x
                                  )
                                );
                              }}
                              value={ins.content}
                            />

                            <Button
                              onClick={() => {
                                setInstructions((currentInstruction) =>
                                  currentInstruction.filter(
                                    (x) => x.id !== ins.id
                                  )
                                );
                              }}
                            >
                              x
                            </Button>
                          </Box>
                        );
                      })}

                      <Button
                        sx={{
                          marginLeft: "auto",
                          bgcolor: "primary.light",
                        }}
                        variant="contained"
                        type="button"
                        onClick={handleAddInstruction}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            ) : null}

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

              {activeStep === steps.length ? (
                <>
                  <Typography variant="h5">
                    Are you sure you want to post it?
                  </Typography>
                  <Button onClick={handleSubmitRepcipe}>Finish</Button>
                </>
              ) : (
                <Button onClick={handleNext}> Next </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
