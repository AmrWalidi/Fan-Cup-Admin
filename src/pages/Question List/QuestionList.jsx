import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPen } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";
import _ from "lodash";
import "./question-list.css";
import DeleteMessage from "../../components/Delete Message/DeleteMessage";

export default function QuestionList() {
  const bodyStyle = {
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "0 20px",
  };

  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);
  const [questions, setQuestions] = useState([
    {
      text: "",
      question_type: 3,
      options: [],
      correct_answer: [],
      difficulty_level: "",
      categories: [],
    },
  ]);
  const location = useLocation();
  const { name } = location.state;

  const getCategories = async (categoriesId) => {
    let categories = [];
    for (let id in categoriesId) {
      try {
        const ref = collection(db, "Category");
        const q = query(ref, where("id", "==", id));
        const docs = await getDocs(q);

        if (!docs.empty) {
          categories.push(docs[0].data());
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    return categories;
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
      }));
      //   documnets.map((doc) => {
      //     doc.categories = getCategories(doc.categories);
      //   });
      setQuestions(documents);
      console.log(documents);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getQuestions("");
  }, []);

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
              <div id="question-header">
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{ color: "#9E9E9E" }}
                />
                <p id="question-header-text">
                  {_.startCase(_.capitalize(question.text))}
                </p>
              </div>
              <div id="question-detail">
                <div className="question-text-container">
                  <textarea
                    value={question.text}
                    name="question"
                    id="question"
                    disabled
                  />
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{
                      cursor: "pointer",
                      color: "#3A3A3A",
                    }}
                  />
                </div>
                <Multiselect
                  options={question.categories}
                  displayValue="name"
                  placeholder="Select categories"
                  onSelect={(selectedList) => {
                    question.categories = selectedList;
                  }}
                  onRemove={(selectedList) => {
                    question.categories = selectedList;
                  }}
                  style={{
                    searchBox: {
                      background: "#FCFCFC",
                      color: "#4B4B4B",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginTop: "10px",
                      padding: "10px",
                      width: "625px",
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
                      disabled
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{
                        cursor: "pointer",
                        color: "#3A3A3A",
                      }}
                    />
                  </div>
                ) : question.question_type == 2 ? (
                  <>
                    {question.options.map((answer, index) =>
                      index != 3 ? (
                        <div key={index} className="editable-answer-container">
                          <input type="text" value={answer} disabled />
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{
                              cursor: "pointer",
                              color: "#3A3A3A",
                            }}
                          />
                        </div>
                      ) : null
                    )}
                    {question.correct_answer.map((answer, index) => (
                      <div
                        key={`correct-${index}`}
                        className="editable-answer-container"
                      >
                        <input type="text" value={answer} disabled />
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{
                            cursor: "pointer",
                            color: "#3A3A3A",
                          }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {question.correct_answer.map((answer, index) => (
                      <div
                        key={`correct-${index}`}
                        className="editable-answer-container"
                      >
                        <input type="text" value={answer} disabled />
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{
                            cursor: "pointer",
                            color: "#3A3A3A",
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}

                <div className="button-list">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <DeleteMessage />
    </div>
  );
}
