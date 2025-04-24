import quizQuestions from './quiz-data.js';
document.addEventListener('DOMContentLoaded', function () {
    // Add a simple animation to header elements
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'opacity 1s ease, transform 1s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
    // Animate feature cards sequentially
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        const featureElement = feature;
        featureElement.style.opacity = '0';
        featureElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            featureElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            featureElement.style.opacity = '1';
            featureElement.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    // Generate quiz questions from data
    const quizContainer = document.getElementById('quiz');
    if (quizContainer) {
        quizQuestions.forEach((question, index) => {
            const isFirstQuestion = index === 0;
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.dataset.question = question.id.toString();
            if (!isFirstQuestion) {
                questionDiv.style.display = 'none';
            }
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `Question ${question.id}: ${question.text}`;
            questionDiv.appendChild(questionTitle);
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';
            question.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.dataset.value = option.id.toString();
                optionDiv.textContent = option.text;
                optionsDiv.appendChild(optionDiv);
            });
            questionDiv.appendChild(optionsDiv);
            quizContainer.appendChild(questionDiv);
        });
    }
    // Quiz functionality
    const quiz = document.getElementById('quiz');
    const result = document.getElementById('result');
    const emailForm = document.getElementById('email-form');
    if (!quiz || !result || !emailForm)
        return;
    let currentQuestion = 1;
    let score = 0;
    let userAnswers = {};
    // Handle option selection
    quiz.addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('option')) {
            // Remove previous selections for current question
            const currentOptions = document.querySelectorAll(`.quiz-question[data-question="${currentQuestion}"] .option`);
            currentOptions.forEach(option => option.classList.remove('selected'));
            // Select clicked option
            target.classList.add('selected');
            // Store user's answer and check if correct
            const selectedValue = parseInt(target.getAttribute('data-value') || '0');
            userAnswers[currentQuestion] = selectedValue;
            const question = quizQuestions.find(q => q.id === currentQuestion);
            if (question && selectedValue === question.correctAnswerId) {
                score++;
            }
            // Move to next question after a short delay
            setTimeout(() => {
                if (currentQuestion < quizQuestions.length) {
                    // Hide current question
                    const currentQuestionElement = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
                    if (currentQuestionElement) {
                        currentQuestionElement.style.display = 'none';
                    }
                    // Show next question
                    currentQuestion++;
                    const nextQuestionElement = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
                    if (nextQuestionElement) {
                        nextQuestionElement.style.display = 'block';
                    }
                }
                else {
                    // Show results
                    quiz.style.display = 'none';
                    // Display score
                    const scoreDisplay = document.getElementById('score-display');
                    const scoreMessage = document.querySelector('.score-message');
                    const answersReview = document.getElementById('answers-review');
                    if (scoreDisplay) {
                        scoreDisplay.innerHTML = `<h2>Your Score: ${score}/${quizQuestions.length}</h2>`;
                    }
                    // Show different messages based on score
                    if (scoreMessage) {
                        if (score === quizQuestions.length) {
                            scoreMessage.textContent = "Impressive! You're already an AI in science expert!";
                        }
                        else if (score === 2) {
                            scoreMessage.textContent = "Great job! You know your stuff about AI in science.";
                        }
                        else if (score === 1) {
                            scoreMessage.textContent = "Good try! There's more to learn about AI in science.";
                        }
                        else {
                            scoreMessage.textContent = "Thanks for playing! Join our waitlist to learn more about AI in science.";
                        }
                    }
                    // Display answers review
                    if (answersReview) {
                        let reviewHTML = '<div class="answers-container">';
                        quizQuestions.forEach(question => {
                            const userAnswer = userAnswers[question.id];
                            const userAnswerText = question.options.find(opt => opt.id === userAnswer)?.text || "No answer";
                            const correctAnswerText = question.options.find(opt => opt.id === question.correctAnswerId)?.text || "";
                            const isCorrect = userAnswer === question.correctAnswerId;
                            reviewHTML += `
                                <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
                                    <h4>Question ${question.id}: ${question.text}</h4>
                                    <p>Your answer: ${userAnswerText} ${isCorrect ? '✓' : '✗'}</p>
                                    ${!isCorrect ? `<p>Correct answer: ${correctAnswerText}</p>` : ''}
                                    <div class="explanation">
                                        <p><strong>Explanation:</strong> ${question.explanation}</p>
                                        <p><strong>Citation:</strong> <a href="${question.citation}" target="_blank">${question.citation}</a></p>
                                    </div>
                                </div>
                            `;
                        });
                        reviewHTML += '</div>';
                        answersReview.innerHTML = reviewHTML;
                    }
                    result.style.display = 'block';
                }
            }, 500);
        }
    });
    // Handle email form submission
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        const requiredConsent = document.getElementById('consent-required');
        const marketingConsent = document.getElementById('consent-marketing');
        const thirdPartyConsent = document.getElementById('consent-thirdparty');
        if (!emailInput || !requiredConsent)
            return;
        const email = emailInput.value;
        // Prepare data to send to backend
        const formData = {
            email,
            consent: {
                required: requiredConsent.checked,
                marketing: marketingConsent ? marketingConsent.checked : false,
                thirdParty: thirdPartyConsent ? thirdPartyConsent.checked : false,
                timestamp: new Date().toISOString()
            },
            quizData: {
                score,
                totalQuestions: quizQuestions.length,
                userAnswers
            }
        };
        // Send data to the backend API
        fetch('/api/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
            if (data.success) {
                // Show thank you message
                emailForm.innerHTML = `<p>Thanks! We'll be in touch soon.</p>`;
            }
            else {
                // Show error message
                emailForm.innerHTML += `<p class="error">Sorry, there was an error. Please try again later.</p>`;
            }
        })
            .catch(error => {
            console.error('Error submitting form:', error);
            emailForm.innerHTML += `<p class="error">Sorry, there was an error. Please try again later.</p>`;
        });
    });
});
//# sourceMappingURL=script.js.map