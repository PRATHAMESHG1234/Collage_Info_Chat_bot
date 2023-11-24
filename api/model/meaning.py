import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


# Initialize lemmatizer and stopwords
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))


def is_meaningful_word(word):
    # Lemmatize the word before checking WordNet synsets
    lemma = lemmatizer.lemmatize(word)

    return len(wordnet.synsets(lemma)) > 0


def is_meaningful_sentence(sentence):
    words = word_tokenize(sentence)
    # Remove stopwords and punctuation
    words = [lemmatizer.lemmatize(
        word) for word in words if word.isalnum() and word not in stop_words]

    meaningful_word_count = sum(
        1 for word in words if is_meaningful_word(word))
    # Consider the sentence meaningful if at least 50% of non-stopwords have meanings in WordNet
    return meaningful_word_count / len(words) >= 0.5


# Example usage
# sentence = "The importance of faith and devotion. emcknje ewewjewnjew"
# if is_meaningful_sentence(sentence):
#     print("The sentence is meaningful.")
# else:
#     print("The sentence is not meaningful.")
