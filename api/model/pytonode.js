const { spawn } = require("child_process");
const path = require("path");

function runPythonScriptAndGetRelatedData(inputProblem, filename) {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(__dirname, filename);

    const pythonProcess = spawn("python", [pythonScriptPath, inputProblem]);
    let pythonData = "";

    // Listen for data from the Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      pythonData += data.toString(); // Append the data to pythonData
    });

    // Listen for any errors that occur while running the Python script
    pythonProcess.stderr.on("data", (data) => {
      // console.log("****************");
      reject(`Error: ${data.toString()}`);
    });

    // Handle the Python script's exit event
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        console.log("Python script executed successfully.");
        try {
          // console.log("Python script data:", pythonData);
          const relatedData = JSON.parse(pythonData);
          // Parse the JSON data
          resolve(relatedData);
        } catch (error) {
          reject(`Error parsing JSON: ${error}`);
        }
      } else {
        reject(`Python script exited with code ${code}.`);
      }
    });
  });
}

// const inputProblem1 = "How does the college engage with the local community?";
// const filename = "main.py"; // Replace with the actual path

const run = async (inputProblem, filename) => {
  const response = await runPythonScriptAndGetRelatedData(
    inputProblem,
    filename
  );
  // console.log(response);
  return response;
};

// run(inputProblem1, filename);
module.exports = { run };
