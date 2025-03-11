const DoQuiz = ({ quiz }: { quiz: QuizResponse }) => {

    return (
        <div>
            {quiz.questions.map(question => {
                return (
                    <p key={question.title + "_" + question.questionId}>
                        {question.title}
                    </p>
                )
            })}
        </div>
    )
}

export default DoQuiz