const express = require("express");
const { generateResponse } = require("./functions");
const authMiddleware = require("../middleware/authMiddleware");
const runPythonScriptAndGetRelatedData = require("./model/pytonode");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const requestBody = req.body;
    const userInput = requestBody.input;
    // const response = await generateResponse(userInput);

    // Example usage:
    const inputProblem = userInput;

    const filename = "main.py";

    const response = await runPythonScriptAndGetRelatedData.run(
      inputProblem,
      filename
    );
    // console.log("response:", response);

    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
