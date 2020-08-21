import React from "react";
import { AnsObj } from "../App";
import { ButtContainer } from "./Butt.styles";

type Props = {
  question: string;
  answers: string[];
  questionnr: number;
  totalquestions: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  useranswer: AnsObj | undefined;
};
const QuizCard: React.FC<Props> = ({
  question,
  answers,
  questionnr,
  totalquestions,
  callback,
  useranswer,
}) => {
  return (
    <div className="card-div">
      <p
        style={{
          color: "#f5f1da",
          fontSize: "1rem",
          backgroundColor: "#595238",
          padding: "5px",
        }}
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <p style={{ color: "#3251f44", fontSize: "1.2rem" }}>
        QuestionNumber:&nbsp;{questionnr}/{totalquestions}
      </p>
      <div>
        {answers.map((answer) => {
          return (
            <ButtContainer
              key={answer}
              correct={useranswer?.correct_answer === answer}
              isClicked={useranswer?.answer == answer}
            >
              <button
                id="ren-but"
                value={answer}
                className="btn btn-md btn-info btn-block"
                disabled={!!useranswer}
                onClick={(e) => {
                  callback(e);
             
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
              <br />
            </ButtContainer>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
