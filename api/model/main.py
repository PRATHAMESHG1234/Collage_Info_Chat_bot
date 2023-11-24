import sys
import json
from meaning import is_meaningful_sentence

from problemans import index

# input_problem = "How does the college engage with the local community? hiiii"
# problem = index(
#     input_problem)
# print(problem)
# print(is_meaningful_sentence(inputProblem))
# df = load_data()
# related_data = find_related_data(inputProblem, df)
# print(related_data)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_problem = sys.argv[1]
    if is_meaningful_sentence(input_problem):

        related_data = index(input_problem)
        # print(related_data)
        if related_data:
            related_data_json = json.dumps(related_data)
            print(related_data_json)
        else:
            error_message = {
                "error": "Data not found",
                "message": "Please check your query or input."
            }
            print(json.dumps(error_message))
    else:
        error_message = {
            "error": "Invalid input",
            "message": "Please enter a meaningful sentence."
        }
        print(json.dumps(error_message))
