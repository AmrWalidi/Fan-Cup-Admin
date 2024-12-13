import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";
import _ from "lodash";
import "./question-list.css";
import DeleteMessage from "../../components/Delete Message/DeleteMessage";
import { toast } from "react-toastify";
import { checkInput, convertToLowerCase } from "../../functions/questions";

export default function QuestionList() {
  const bodyStyle = {
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "0 20px",
  };

  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const [answer, setAnswer] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([
    {
      id: "",
      text: "",
      question_type: 3,
      options: [],
      correct_answer: [],
      difficulty_level: "",
      categories: [],
    },
  ]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [selectDeleteQuestion, setSelectDeleteQuestion] = useState({
    action: false,
    questionId: "",
  });
  const location = useLocation();
  const { name } = location.state;

  const getCategoriesList = async () => {
    try {
      const res = await getDocs(collection(db, "Category"));
      if (!res.empty) {
        const documnets = res.docs.map((doc) => ({
          ...doc.data(),
        }));
        setCategories(documnets);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getQuestions = async (searchedQuestion) => {
    try {
      let res;
      const ref = collection(db, "Questions");
      if (searchedQuestion == "") {
        res = await getDocs(ref);
      } else {
        const q = query(
          ref,
          orderBy("text"),
          startAt(searchedQuestion),
          endAt(searchedQuestion + "\uf8ff")
        );
        res = await getDocs(q);
      }

      const documents = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuestions(documents);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateQuestion = async (question) => {
    const isValid = checkInput(question);

    if (isValid) {
      try {
        const docRef = doc(db, "Questions", question.id);
        convertToLowerCase(question);
        await updateDoc(docRef, question);

        toast.success("Question have been changed succeessfully", {
          position: "top-center",
        });
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    } else {
      toast.error("Fill all fields", {
        position: "top-center",
      });
    }
  };

  const deleteQuestion = async (question) => {
    try {
      const docRef = doc(db, "Questions", question);
      await deleteDoc(docRef);

      toast.success("Question have been deleted succeessfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (selectDeleteQuestion.action) {
      deleteQuestion(selectDeleteQuestion.questionId);
      setDeleteMessage(false);
      setQuestions(
        questions.filter(
          (question) => question.id !== selectDeleteQuestion.questionId
        )
      );
      console.log(questions);
      setSelectDeleteQuestion({ action: false, questionId: "" });
    }
  }, [selectDeleteQuestion, questions]);

  useEffect(() => {
    getQuestions("");
    getCategoriesList();
  }, []);

  const questionDropDown = (index) => {
    const questionDetails = document.getElementsByClassName(
      "editable-question-container"
    )[index].children[1];

    if (questionDetails.style.maxHeight) {
      questionDetails.style.maxHeight = null;
    } else {
      questionDetails.style.maxHeight = questionDetails.scrollHeight + "px";
    }
  };

  return (
    <div>
      <Header name={name} />
      <div className="question-searchbar">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => getQuestions(e.target.value)}
        />
      </div>
      <div className="question-list-section">
        {questions.map((question, index) => {
          return (
            <div className="editable-question-container" key={index}>
              <div
                className="question-header"
                onClick={() => questionDropDown(index)}
              >
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{ color: "#9E9E9E" }}
                />
                <p className="question-header-text">
                  {_.startCase(_.capitalize(question.text))}
                </p>
              </div>
              <div id="question-detail">
                <div className="question-text-container">
                  <textarea
                    value={question.text}
                    name="question"
                    id="question"
                    onChange={(e) =>
                      setQuestions(
                        questions.map((item) =>
                          item.text == question.text
                            ? {
                                ...item,
                                text: e.target.value,
                              }
                            : item
                        )
                      )
                    }
                  />
                </div>

                <Multiselect
                  selectedValues={categories.filter((category) =>
                    question.categories.includes(category.id)
                  )}
                  options={categories}
                  displayValue="name"
                  placeholder="Select categories"
                  onSelect={(selectedList) => {
                    question.categories = selectedList.map(
                      (selectedCategory) => selectedCategory.id
                    );
                  }}
                  onRemove={(selectedList) => {
                    question.categories = selectedList.map(
                      (selectedCategory) => selectedCategory.id
                    );
                  }}
                  style={{
                    searchBox: {
                      background: "#FCFCFC",
                      color: "#4B4B4B",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginTop: "10px",
                      padding: "10px",
                    },
                  }}
                />
                <select
                  className="difficulty-dropdown"
                  value={question.difficulty_level}
                  onChange={(e) =>
                    setQuestions((prevList) =>
                      prevList.map(
                        (item) =>
                          (item.text = question.text
                            ? { ...item, difficulty_level: e.target.value }
                            : item)
                      )
                    )
                  }
                  style={{ width: "245px" }}
                >
                  <option value="" disabled>
                    -- Select question difficulty --
                  </option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Super Hard">Super Hard</option>
                </select>

                {question.question_type == 1 ? (
                  <div className="editable-answer-container">
                    <input
                      type="number"
                      value={question.correct_answer[0]}
                      onChange={(e) =>
                        setQuestions(
                          questions.map((item) =>
                            item.text == question.text
                              ? {
                                  ...item,
                                  correct_answer: [e.target.value],
                                }
                              : item
                          )
                        )
                      }
                    />
                  </div>
                ) : question.question_type == 2 ? (
                  <>
                    {question.options.map((answer, index) =>
                      index != 3 ? (
                        <div
                          key={`option-${index}`}
                          className="editable-answer-container"
                        >
                          <p>option {index + 1}:</p>
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) =>
                              setQuestions(
                                questions.map((item) =>
                                  item.text == question.text
                                    ? {
                                        ...item,
                                        options: item.options.map(
                                          (option, idx) => {
                                            idx == index
                                              ? e.target.value
                                              : option;
                                          }
                                        ),
                                      }
                                    : item
                                )
                              )
                            }
                          />
                        </div>
                      ) : null
                    )}
                    {question.correct_answer.map((answer, index) => (
                      <div
                        key={`correct-${index}`}
                        className="editable-answer-container"
                      >
                        <p>correct answer: </p>
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) =>
                            setQuestions(
                              questions.map((item) =>
                                item.text == question.text
                                  ? {
                                      ...item,
                                      correct_answer: item.correct_answer.map(
                                        (ans, idx) => {
                                          idx == index ? e.target.value : ans;
                                        }
                                      ),
                                    }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        className="answer"
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                      <button
                        className="add-answers-button"
                        onClick={() =>
                          setQuestions(
                            questions.map((it) =>
                              it.text == question.text
                                ? {
                                    ...it,
                                    correct_answer: [
                                      ...it.correct_answer,
                                      answer,
                                    ],
                                  }
                                : it
                            )
                          )
                        }
                      >
                        Add answer
                      </button>
                    </div>
                    {question.correct_answer.map((answer, index) => (
                      <div
                        key={`correct-${index}`}
                        className="editable-answer-container"
                      >
                        <p>correct answer: {index + 1}</p>
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) =>
                            setQuestions(
                              questions.map((item) =>
                                item.text == question.text
                                  ? {
                                      ...item,
                                      correct_answer: item.correct_answer.map(
                                        (ans, idx) => {
                                          idx == index ? e.target.value : ans;
                                        }
                                      ),
                                    }
                                  : item
                              )
                            )
                          }
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#F64F4F", cursor: "pointer" }}
                          onClick={() =>
                            setQuestions(
                              questions.map((item) =>
                                item.text == question.text
                                  ? {
                                      ...item,
                                      correct_answer:
                                        item.correct_answer.filter(
                                          (ans) => ans !== answer
                                        ),
                                    }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
                <div className="button-list">
                  <button
                    className="edit-button"
                    onClick={() => updateQuestion(question)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setDeleteMessage(true);
                      setSelectDeleteQuestion((prev) => ({
                        ...prev,
                        questionId: question.id,
                      }));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {deleteMessage ? (
        <DeleteMessage
          setDeleteMessage={setDeleteMessage}
          setSelectDeleteQuestion={setSelectDeleteQuestion}
        />
      ) : null}
    </div>
  );
}
