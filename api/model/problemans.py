from sklearn.linear_model import LogisticRegression

import pandas as pd

import random
from sklearn.feature_extraction.text import TfidfVectorizer
from trainingData.collage_info import college_info


def preprocess_data(data):
    # Convert the data to a DataFrame
    df = pd.DataFrame(
        data, columns=['question', 'answer'])

    # Preprocess text data
    df['question'] = df['question'].str.lower()

    # Specify the dummy value

    df.dropna(inplace=True)

    # Print the DataFrame after filling NaN values
    # print(df)

    return df


def train_models(df):
    # Define features and target columns
    X = df['question']
    y = df[['answer']]  # Include all fields in y
    # Convert text data to TF-IDF features
    vectorizer = TfidfVectorizer(max_features=5000)
    X_tfidf = vectorizer.fit_transform(X)

    # Define and train the models (Logistic Regression) for all fields in y simultaneously
    models = {}
    for field in y.columns:

        model = LogisticRegression()
        model.fit(X_tfidf, y[field])
        models[field] = model
    return vectorizer, models


def predict_attributes(vectorizer, models, input_problem, df, num_random_questions=5):
    input_problem = input_problem.lower()
    input_tfidf = vectorizer.transform([input_problem])

    # Initialize predicted_values_dict
    predicted_values_dict = {}

    if input_problem not in df['question'].values:
        predicted_values_dict["answer"] = f"Sorry, the answer for the provided question is not available. However, you can select another question below to start the conversation."
    else:
        for field, model in models.items():
            predicted_values_dict[field] = model.predict(input_tfidf)[0]

    # Include random questions from the dataframe in the predicted_values_dict
    random_questions = random.sample(
        list(df['question']), min(num_random_questions, len(df)))

    # Add the array of random questions to the predicted_values_dict
    predicted_values_dict['questions'] = random_questions

    return predicted_values_dict


def index(input_problem):
    df = preprocess_data(college_info)
    result = calculate_word_presence_percentage(df, input_problem)
    if result:
        vectorizer, models = train_models(df)
        predictions = predict_attributes(vectorizer, models, input_problem, df)
        return predictions


def calculate_word_presence_percentage(dataframe, sentence):
    """
    Calculate the percentage of words from the given sentence that are present in the 'problem' column of the DataFrame.

    Args:
    dataframe (pandas.DataFrame): DataFrame containing 'problem' column.
    sentence (str): The sentence to calculate word presence percentage from.

    Returns:
    float: Percentage of words from the sentence present in 'problem' fields.
    """
    # Split the input sentence into words
    words_in_sentence = set(sentence.lower().split())

    # Count how many words from the sentence are present in any 'problem' field
    total_words_in_sentence = len(words_in_sentence)
    matching_words_count = 0
    for problem in dataframe['question']:
        problem_words = set(problem.lower().split())
        matching_words_count += len(
            words_in_sentence.intersection(problem_words))

    # Calculate the percentage of words present in 'problem' fields
    if total_words_in_sentence > 0:
        percentage = (matching_words_count / total_words_in_sentence) * 100
    else:
        percentage = 0

    return percentage


# Example Usage
# input_problem = "How does the college engage with the local community?"
# predictions = index(input_problem)
# print(predictions)
