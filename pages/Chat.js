import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Placeholder, Form, Container } from "semantic-ui-react";

import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { MdSend } from "react-icons/md";
import responseFormats from "./ResponseFormats";
import CustomText from "./CoustomText";
// ... (previous imports)

function Chat({ user, token }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isBotTypingButton, setIsBotTypingButton] = useState(false);

  const typingRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setIsBotTypingButton(true);
      setIsBotTyping(true);

      try {
        const { data } = await axios.post(`${baseUrl}/api/chat`, {
          headers: { Authorization: token },
          input: inputValue,
        });
        console.log(data);

        typeBotResponse(data.response);
      } catch (error) {
        console.error("Error:", error);
        setIsBotTyping(false);
        setIsBotTypingButton(false);
      }
    }
  };

  const typeBotResponse = async (response) => {
    const responseFormatsWithData = responseFormats(response, setInputValue);

    const selectedResponse =
      responseFormatsWithData[
        Math.floor(Math.random() * responseFormatsWithData.length)
      ];

    const botMessage = {
      id: Date.now(),
      sender: "bot",
      text: (
        <>
          <CustomText
            response={response}
            selectedResponse={selectedResponse}
            setInputValue={setInputValue}
          />
        </>
      ),
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);

    if (typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const answer = response.answer && response.answer.split(" ").length;
    const animationDuration = answer * 200 + 20;

    setIsBotTyping(false);
    setTimeout(() => {
      setIsBotTypingButton(false);
    }, animationDuration);
  };

  return (
    <>
      <div className="chat-container">
        <Container textAlign="center">
          <p
            style={{
              color: "grey",
              fontFamily: "Hanuman",
              fontSize: " 42px",
              color: "Light Gray",
            }}
          >
            <strong>Welocome To Mini-Chat-Bot.</strong>
          </p>
        </Container>
        <div id="chat-messages" className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.sender === "user" ? "user" : "bot"
              }`}
            >
              {message.sender === "user" && (
                <div className="user-details">
                  <img
                    src={user.profilePicUrl}
                    alt="User Profile"
                    className="user-profile-pic"
                  />
                </div>
              )}

              {message.sender === "bot" && (
                <div className="message-text">{message.text}</div>
              )}
              {message.sender === "user" && (
                <>
                  <div className="message-text">{message.text}</div>
                </>
              )}
            </div>
          ))}

          {isBotTyping && (
            <div className="chat-message bot typing">
              <Placeholder fluid>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </div>
          )}
          <div ref={typingRef} />
        </div>
      </div>
      <div className="chat-input">
        <Form onSubmit={handleSendMessage}>
          <Input
            fluid
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            action={
              <Button type="submit" disabled={isBotTypingButton}>
                {isBotTypingButton ? (
                  <div className="loading-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                ) : (
                  <MdSend style={{ fontSize: "24px", color: "green" }} />
                )}
              </Button>
            }
          />
        </Form>
      </div>
    </>
  );
}

export default Chat;
