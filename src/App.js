import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardText,
} from "reactstrap"; // Import Bootstrap components

const PasswordMaker = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characters = lowercase + uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const calculateStrength = () => {
    const strength =
      password.length < 6 ? "Weak" : password.length < 10 ? "Medium" : "Strong";
    return strength;
  };

  const containerStyle = {
    marginTop: "5%",
    textAlign: "center",
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#333",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: darkMode
      ? "0 4px 8px rgba(0, 0, 0, 0.6)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#666" : "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <Container className="pt-5">
      <Card body className="text-center" style={containerStyle}>
        <h1>Password Maker</h1>
        <Form>
          <FormGroup>
            <Label for="lengthInput">Password Length:</Label>
            <Input
              type="number"
              id="lengthInput"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="numbersCheck"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              Include Numbers
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="symbolsCheck"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              Include Symbols
            </Label>
          </FormGroup>
          <Button style={buttonStyle} onClick={generatePassword}>
            Generate Password
          </Button>
        </Form>
        <div className="mt-3">
          <h2>Your Password:</h2>
          <Input type="text" readOnly value={password} />
          <Button style={buttonStyle} onClick={copyPassword}>
            Copy Password
          </Button>
        </div>
        <div>
          <h3>Password Strength: {calculateStrength()}</h3>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "12px",
          }}
        >
          Created by vici
        </div>
        <CardText
          style={{ fontSize: "12px", textAlign: "left", marginTop: "20px" }}
        >
          <i>
            * We do not store any data related to your password. This tool is
            for generating passwords locally on your device.
          </i>
        </CardText>
      </Card>
    </Container>
  );
};

export default PasswordMaker;
