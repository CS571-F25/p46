export default function Home() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-body text-start">
                    <h1 className="card-title">Quizzer</h1>
                    <p className="card-text">Quizzer is a simple, interactive web application that lets users take fun quizzes on different topics. The goal is to make it quick and easy for anyone to test their knowledge. Users can select a quiz, answer multiple-choice questions, and get instant feedback on their answers. Each answer indicates whether it was correct, and at the end the app displays the total score along with a short message about the user's performance.</p>

                    <h2>Quiz types</h2>
                    <ul>
                        <li>Auto-generated quizzes: a set of built-in quizzes (for example: math, science, and history).</li>
                        <li>User-generated quizzes: users can create their own quizzes on any topic (no user quizzes exist on first load).</li>
                    </ul>

                    <p>Common features include progress bars, instant on-screen feedback, and small animations shown when the user answers correctly. The interactive element of this project focuses on letting users create and take quizzes with immediate feedback.</p>
                </div>
            </div>
        </div>
    )
}