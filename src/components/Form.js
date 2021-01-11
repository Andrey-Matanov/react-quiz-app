import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const Form = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=10'
            );

            const data = await response.json();

            setQuizData(data.results);
        };

        fetchData();
    }, []);

    const correctAnswerWasChosen = () => {
        setResult(result + 1);
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    };

    const incorrectAnswerWasChosen = () => {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    };

    if (currentQuestionNumber === 10) {
        return (
            <p>
                Final Result: {result}/{currentQuestionNumber}
            </p>
        );
    } else if (quizData.length) {
        const currentQuestion = quizData[currentQuestionNumber];
        console.log(currentQuestion);
        const { question, correct_answer, incorrect_answers } = currentQuestion;

        let answers = [{ text: correct_answer, isCorrect: true }];
        incorrect_answers.forEach((answer) => {
            answers.push({
                text: answer,
                isCorrect: false,
            });
        });
        answers.sort(() => Math.random() - 0.5);

        return (
            <div>
                <p className='result'>
                    Result: {result}/{currentQuestionNumber}
                </p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                            `${currentQuestionNumber + 1}. ${question}`
                        ),
                    }}
                />
                <div className='answers'>
                    {answers.map(({ text, isCorrect }, key) => (
                        <button
                            key={key}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(text),
                            }}
                            onClick={
                                isCorrect
                                    ? correctAnswerWasChosen
                                    : incorrectAnswerWasChosen
                            }
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return <p>Loading data...</p>;
    }
};

export default Form;
