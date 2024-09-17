"use client";

import { Box, Stack, TextField, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";

export default function ChatPage({ onHeaderClick }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Harmony, your music companion. How can I help you today? You can ask me to recommend music based on your mood, activity, or even discover new tunes!",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage(""); // Clear the input field
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message }, // Add the user's message to the chat
      { role: "assistant", content: "" }, // Add a placeholder for the assistant's response
    ]);

    // Send the message to the server
    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader(); // Get a reader to read the response body
      const decoder = new TextDecoder(); // Create a decoder to decode the response text

      let result = "";
      // Function to process the text from the response
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        }); // Decode the text
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]; // Get the last message (assistant's placeholder)
          let otherMessages = messages.slice(0, messages.length - 1); // Get all other messages
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text }, // Append the decoded text to the assistant's message
          ];
        });
        return reader.read().then(processText); // Continue reading the next chunk of the response
      });
    });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="#000000"
      sx={{
        "&::-webkit-scrollbar": {
          width: "12px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#000000", // Background color of the track
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#444654", // Color of the scrollbar thumb
          borderRadius: "10px",
        },
      }}
    >
      {/* Header Section */}
      <Box
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottom="1px solid #444654"
        bgcolor="#1a1a1a"
        onClick={onHeaderClick} // Handle click event to redirect to landing page
        sx={{ cursor: "pointer" }} // Change cursor to pointer to indicate clickability
      >
        <img
          src="./imgs/hrmnlogo.jpg"
          alt="Harmony Icon"
          style={{
            width: "32px",
            height: "32px",
            marginRight: "10px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Typography variant="h6" color="white">
          Harmony.AI
        </Typography>
      </Box>

      {/* Chat Area */}
      <Box
        flexGrow={1}
        overflow="auto"
        p={3}
        color="white"
        sx={{
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#000000",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#444654",
            borderRadius: "10px",
          },
        }}
      >
        <Stack spacing={2}>
          {messages.map((message, index) => (
            <Box key={index}>
              <Box
                display="flex"
                alignItems="flex-start" // Aligns items to the top
                justifyContent="flex-start" // Align both user and AI messages to the left
                bgcolor={
                  message.role === "assistant" ? "#000000" : "transparent"
                }
                color="white"
                p={2}
                borderRadius={message.role === "assistant" ? "8px" : "0"}
                maxWidth="100%"
                wordBreak="break-word"
              >
                {message.role === "assistant" ? (
                  <img
                    src="./imgs/hrmnlogo.jpg"
                    alt="Harmony Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "10px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "10px", color: "#ffffff" }}
                  />
                )}
                <Box whiteSpace="pre-wrap" flexGrow={1}>
                  {message.content}
                </Box>
              </Box>

              {/* Add divider below every message (user and AI) */}
              <Box height="1px" bgcolor="#444654" my={2} />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Input Section */}
      <Box
        p={2}
        borderTop="1px solid #444654"
        bgcolor="#000000"
        display="flex"
        alignItems="center"
        position="sticky"
        bottom={0}
        left={0}
        right={0}
      >
        <TextField
          label="Type a message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            style: { backgroundColor: "#444654", color: "white" },
          }}
          variant="filled"
        />
        <IconButton
          onClick={sendMessage}
          style={{ color: "white", marginLeft: "10px" }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
      </Box>
    </Box>
  );
}
