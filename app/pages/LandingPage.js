"use client";

import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagic } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage({ onStartChat }) {
  return (
    <Box
      className="fade-in" // Apply the fade-in class for smooth transition
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="#000000"
      color="white"
      sx={{
        backgroundImage: "url('./imgs/Frame 26.png')", // Update the path to your image
        backgroundSize: "cover", // Adjust this depending on your design needs
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navigation Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        borderBottom="1px solid #444654"
        bgcolor="transparent" // Make the navbar background transparent if needed
      >
        <Typography variant="h5" fontWeight="bold">
          Harmony.AI
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#000000",
            borderRadius: "50px",
            paddingX: "20px",
            "&:hover": {
              bgcolor: "#f0f0f0",
            },
          }}
          onClick={onStartChat} // Trigger state change to show chat
        >
          Get Started
        </Button>
      </Box>

      {/* Hero Section */}
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding="0 20px"
      >
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Discover, Curate & Expand your horizons on Autopilot
        </Typography>
        <Typography variant="body1" maxWidth="600px" mb={4}>
          Discover a world of music that resonates with your mood, activities,
          and personal taste. Harmony leverages cutting-edge AI to curate the
          perfect playlist for every moment, whether you’re seeking relaxation,
          motivation, or exploration. Let Harmony tune into your emotions and
          preferences to create a soundtrack that’s uniquely yours.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            borderRadius: "50px",
            paddingX: "30px",
            paddingY: "10px",
            "&:hover": {
              borderColor: "#f0f0f0",
              color: "#f0f0f0",
            },
          }}
          onClick={onStartChat} // Trigger state change to show chat
        >
          Start Generating &nbsp;
          <FontAwesomeIcon icon={faMagic} />
        </Button>
      </Box>
    </Box>
  );
}
