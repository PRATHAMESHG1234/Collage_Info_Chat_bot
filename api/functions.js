const natural = require("natural");
const axios = require("axios");
const { removeStopwords } = require("stopword");
const data = require("./data");

function extractImportantWords(userInput) {
  // Remove stopwords and non-alphabetic characters
  const importantWords = removeStopwords(userInput.split(" "));

  // console.log('importantWords:', importantWords);

  // Join the important words back into a single string
  const extractedWords = importantWords.join(" ");
  // console.log('extractedWords:', extractedWords);
  return extractedWords;
}

async function getSimilarWords(word) {
  const endpoint = `https://api.datamuse.com/words?ml=${word}`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    const similarWords = data.map((item) => item.word).join(" ");

    return similarWords;
  } catch (error) {
    return [];
  }
}
async function getSimilarDiscreptionWords(question) {
  const endpoint = `https://api.datamuse.com/words?ml=${question}`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    const similardescription = data.map((item) => item.word).join(" ");
    return similardescription;
  } catch (error) {
    return [];
  }
}
// Example usage

async function appendSimilarWordsToCategoriesAndDescreption(data) {
  for (const entry of data) {
    const similarCategory = await getSimilarWords(entry.problem_category);
    entry.problem_category = entry.problem_category + " " + similarCategory;

    const similardescription = await getSimilarDiscreptionWords(
      entry.problem_description
    );
    entry.problem_description =
      entry.problem_description + " " + similardescription;
  }
  // console.log(data);
  return data;
}

function preprocessDataset(dataset) {
  // console.log(dataset);
  const preprocessedDataset = dataset.map((entry) => {
    const insights = entry.philosophical_insights.map(
      (insight) => `${insight.sloka}: ${insight.translation}`
    );
    return {
      problem_category: entry.problem_category,
      problem_description: entry.problem_description,
      philosophical_insights: insights.join(" "),
    };
  });
  return preprocessedDataset;
}

function trainModel(preprocessedDataset) {
  // console.log(preprocessedDataset);
  const classifier = new natural.BayesClassifier();

  preprocessedDataset.forEach((entry) => {
    classifier.addDocument(
      entry.philosophical_insights,
      entry.problem_category
    );
  });

  classifier.train();

  return classifier;
}

function calculateAdjustedProbability(probability, oneWordMatches) {
  const adjustmentFactor = 0.1;
  const adjustedProbability = probability + adjustmentFactor * oneWordMatches;
  return adjustedProbability;
}

function findMatchedEntry(input) {
  const tokenizer = new natural.WordTokenizer();
  const stopWords = ["a", "an", "the", "can", "my", "i"];

  // Extract important words from input
  const inputWords = tokenizer
    .tokenize(input.toLowerCase())
    .filter((word) => !stopWords.includes(word));
  // console.log('inputWords:', input);
  const matchedEntries = [];

  for (const entry of data) {
    const problemCategoryWords = tokenizer.tokenize(
      entry.problem_category.toLowerCase()
    );
    const problemDescriptionWords = tokenizer.tokenize(
      entry.problem_description.toLowerCase()
    );
    const oneWordMatches = inputWords.filter(
      (word) =>
        problemCategoryWords.includes(word) ||
        problemDescriptionWords.includes(word)
    );
    // console.log('oneWordMatches:', oneWordMatches, 'inputwords:', inputWords);
    const matchPercentage = (oneWordMatches.length / inputWords.length) * 100;

    matchedEntries.push({
      problemCategory: entry.problem_category,
      problemDescription: entry.problem_description,
      matchPercentage: matchPercentage,
      philosophicalInsights: entry.philosophical_insights,
    });
  }

  // Find the entry with the maximum match percentage
  let maxMatchPercentage = 0;
  let maxMatchedEntry = [];

  // console.log('maxMatchedEntry:', matchedEntries);
  for (const entry of matchedEntries) {
    if (entry.matchPercentage > maxMatchPercentage) {
      maxMatchPercentage = entry.matchPercentage;
      maxMatchedEntry = entry;
    }
  }
  if (maxMatchedEntry.length !== 0) {
    console.log("i get call if");
    return maxMatchedEntry;
  } else {
    console.log("i get call else");
    return;
  }
}

async function generateResponse(userInput) {
  const importantWords = await extractImportantWords(userInput);
  // console.log(importantWords); // Function to extract important words

  const classifier = await trainClassifier();

  const classifications = classifier.getClassifications(importantWords);
  const sortedClassifications = classifications.sort(
    (a, b) => b.value - a.value
  );
  // console.log('sortedClassifications:', sortedClassifications);
  const category = sortedClassifications[0].label;
  const response = {
    category,
    insights: [],
  };

  const similarInput = await getSimilarDiscreptionWords(importantWords); // Function to get similar words based on important words

  const input = importantWords + " " + similarInput;
  // console.log('input:', input);
  const matchedEntry = await findMatchedEntry(input);
  console.log("matchedEntry:", matchedEntry);
  if (matchedEntry) {
    const problemDescription = `${matchedEntry.problemDescription} ${matchedEntry.problemCategory}`;
    const userInputWords = userInput.split(" ");

    const oneWordMatches = userInputWords.filter((word) =>
      problemDescription.includes(word)
    ).length;
    response.category = matchedEntry.problemCategory;
    // Find the most relevant insight based on similarity
    const insights = matchedEntry.philosophicalInsights;

    // console.log(
    //   "matchedEntry.philosophicalInsights.speaker",
    //   matchedEntry.philosophicalInsights
    // );
    if (insights.length >= 2) {
      const sortedInsights = insights.sort((a, b) => {
        const similarityA = natural.JaroWinklerDistance(
          userInput,
          a.translation
        );
        const similarityB = natural.JaroWinklerDistance(
          userInput,
          b.translation
        );
        // console.log(
        //   'similarityB - similarityA:',
        //   a.translation,
        //   'similarityAb',
        //   b.translation
        // );
        return similarityB - similarityA;
      });
      // console.log('sortedInsights:', sortedInsights);

      sortedInsights.forEach((insight) => {
        const probability = classifications.find(
          (classification) => classification.label === category
        ).value;

        const adjustedProbability =
          calculateAdjustedProbability(probability, oneWordMatches) +
          Math.random();
        const userMessage = `You asked me about ${response.category}. Here is what ${insight.speaker} say's`;
        if (matchedEntry.matchPercentage > 0) {
          response.insights.push({
            sloka: insight.sloka,
            userMessage,
            speaker: insight.speaker,
            sanskrit: insight.sanskrit,
            translation: insight.translation,
            probability: adjustedProbability,
          });
        }
      });
    }
  }

  // Handle the case when no relevant insight is found
  console.log("***********", response);
  return response;
}
let preprocessedData;
const updateAndPreprocessdata = async (data) => {
  // const updatedData = await appendSimilarWordsToCategoriesAndDescreption(data);

  preprocessedData = await preprocessDataset(data);
  return;
};
const trainClassifier = async () => {
  try {
    return trainModel(preprocessedData);
    // Train the classifier
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Example usage
// const userInput = 'How can I overcome conflicts in relationships?';
// const response = generateResponse(userInput);
// console.log(response);
module.exports = {
  generateResponse,
  updateAndPreprocessdata,
};
