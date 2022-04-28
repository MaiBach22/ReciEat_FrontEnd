import { Grid } from "@material-ui/core";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Icon } from "@mui/material";
import AddRecipe from "../AddRecipeForm";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="right"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 224,
            marginTop: "50px",
            width: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", marginLeft: "30px" }}
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Saved Recipe" {...a11yProps(1)} />
            <Tab label="Add Recipe" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                width: "100%",

                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Icon sx={{ fontSize: 200 }}>
                  <AccountCircleIcon
                    color="secondary"
                    sx={{
                      fontSize: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      display: "flex",
                    }}
                  />
                </Icon>
                <Box>
                  <Typography>username</Typography>
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography>email:</Typography>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            Saved Recipe
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddRecipe />
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
}
