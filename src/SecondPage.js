import React, { useState, useEffect } from "react";
import Question from "./Question";
import GoodAnswer from "./GoodAnswer.js";
import data from "./data.js";
import BadAnswers from "./BadAnswers.js";

const shuffledArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);

export default function SecondPage(props) {
  // const [answerData, setAnswerData] = useState(creatArrOfData());
  const [onFinalClick, setOnFinalClick] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [dispCorrAns, setDispCorrAns] = useState();
  const [markCorrAns, setMarkCorrAns] = useState(true);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setApiData((prevState) => {
          return data.results.map((item, index) => {
            return {
              ...item,
              id: [index * 4, index * 4 + 1, index * 4 + 2, index * 4 + 3],
              isHeld: [false, false, false, false],
              goodAnswerIndex: Math.floor(Math.random() * 4),
            };
          });
        })
      );
  }, []);

  const elementsQuestion = apiData.map((question, index) => {
    return (
      <div>
        <Question question={question} />
      </div>
    );
  });

  function showId(id) {
    setApiData((prevState) => {
      return prevState.map((item) => {
        return {
          ...item,
          isHeld: item.id.map((insideItem, index) => {
            if (insideItem === id) {
              return (item.isHeld[index] = !item.isHeld[index]);
            }
            return item.isHeld[index];
          }),
        };
      });
    });
  }

  // const elementsAnswers = apiData.map((item) => {
  //   let counter = 0;
  //   const answers = item.incorrect_answers.concat(item.correct_answer);
  //   const badIndices = [0, 1, 2].sort(() => Math.random() - 0.5);

  //   return answers.map((answer, index) => {
  //     if (index === item.goodAnswerIndex) {
  //       return (
  //         <GoodAnswer
  //           key={index}
  //           goodAnswer={answers[3]}
  //           id={item.id[index]}
  //           showId={showId}
  //           isHeld={item.isHeld[index]}
  //           markCorrAns={markCorrAns}
  //         />
  //       );
  //     } else {
  //       const badAnswerIndex = badIndices[counter];
  //       console.log("skokot", badAnswerIndex);
  //       counter = counter < 2 ? counter + 1 : (counter = 0);

  //       return (
  //         <BadAnswers
  //           key={item.id[index]}
  //           badAnswers={answers[badAnswerIndex]}
  //           id={item.id[index]}
  //           isHeld={item.isHeld[index]}
  //           showId={showId}
  //           markCorrAns={markCorrAns}
  //         />
  //       );
  //     }
  //   });
  // });

  const elementsBadAnswers = apiData.map((item) => {
    return item.incorrect_answers.map((insideItem, index) => {
      return (
        <BadAnswers
          badAnswers={insideItem}
          id={item.id[index + 1]}
          isHeld={item.isHeld[index + 1]}
          showId={showId}
          markCorrAns={markCorrAns}
        />
      );
    });
  });

  const elementsGoodAnswers = apiData.map((item, index) => {
    return (
      <GoodAnswer
        goodAnswer={item.correct_answer}
        id={index * 4}
        showId={showId}
        isHeld={item.isHeld[0]}
        markCorrAns={markCorrAns}
      />
    );
  });

  function getGoodAnswersCount() {
    let counter = 0;
    const result = apiData.map((item) => {
      return item.isHeld.map((insideItem, insideIndex) => {
        if (insideItem === true && insideIndex === 0) {
          return counter++;
        }
      });
    });
    return counter;
  }

  function handleFinalClick() {
    setOnFinalClick((prevState) => {
      return !prevState;
    });
    setDispCorrAns(getGoodAnswersCount());
    setMarkCorrAns((prevState) => !prevState);
  }

  let jebo = elementsBadAnswers.map((item, index) => {
    return item.concat(elementsGoodAnswers[[index]]);
  });

  jebo.map((item) => {
    return item.sort(() => Math.random() - 0.5);
  });

  return (
    <div className="card-with-question">
      {elementsQuestion.map((item, index) => {
        const questionIndex = shuffledArray[index];
        return (
          <div>
            {elementsQuestion[shuffledArray[index]]}
            {jebo[shuffledArray[index]]}
          </div>
        );
      })}

      <button
        id="checkButton"
        className="btn-check-answers"
        onClick={handleFinalClick}
      >
        Check answers
      </button>
      {onFinalClick && (
        <div>
          <h2>You have got {dispCorrAns} correct answers</h2>
        </div>
      )}
    </div>
  );
}
