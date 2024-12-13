export const convertToLowerCase = (data) => {
    for (let key in data) {
      if (typeof data[key] == "string") {
        data[key] = data[key].toLowerCase();
      }

      if (data[key] instanceof Array) {
        data[key].map((it) => {
          if (typeof it == "string") {
            it.toLowerCase();
          }
        });
      }
    }
  };

  export const checkInput = (question) => {
    if (question.text == "") {
      return false;
    }
    if (question.correct_answer.length === 0) {
      return false;
    }
    if (question.difficulty_level == "") {
      return false;
    }
    if (question.categories.length === 0) {
      return false;
    }
    return true;
  };