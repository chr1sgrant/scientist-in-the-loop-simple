document.addEventListener('DOMContentLoaded', function() {
    // Add a simple animation to header elements
    const header = document.querySelector('header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        header.style.transition = 'opacity 1s ease, transform 1s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 200);
    
    // Animate feature cards sequentially
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });

    // Quiz functionality
    const quiz = document.getElementById('quiz');
    const result = document.getElementById('result');
    const emailForm = document.getElementById('email-form');
    let currentQuestion = 1;
    let score = 0;
    let userAnswers = {};
    const correctAnswers = {1: 1, 2: 3, 3: 2}; // Correct answers for each question
    
    const questionText = {
        1: "Which field was among the first to adopt AI for data analysis?",
        2: "What percentage of scientific papers mentioned AI in 2023?",
        3: "Scientists in the loop refers to:"
    };
    
    const answerOptions = {
        1: {1: "Astronomy", 2: "Medicine", 3: "Geology"},
        2: {1: "Less than 5%", 2: "Around 15%", 3: "Over 25%"},
        3: {1: "AI replacing scientists", 2: "Scientists verifying AI outputs", 3: "Scientists training AI models"}
    };

    // Handle option selection
    quiz.addEventListener('click', function(e) {
        if (e.target.classList.contains('option')) {
            // Remove previous selections for current question
            const currentOptions = document.querySelectorAll(`.quiz-question[data-question="${currentQuestion}"] .option`);
            currentOptions.forEach(option => option.classList.remove('selected'));
            
            // Select clicked option
            e.target.classList.add('selected');
            
            // Store user's answer and check if correct
            const selectedValue = parseInt(e.target.getAttribute('data-value'));
            userAnswers[currentQuestion] = selectedValue;
            
            if (selectedValue === correctAnswers[currentQuestion]) {
                score++;
            }
            
            // Move to next question after a short delay
            setTimeout(() => {
                if (currentQuestion < 3) {
                    // Hide current question
                    document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).style.display = 'none';
                    
                    // Show next question
                    currentQuestion++;
                    document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).style.display = 'block';
                } else {
                    // Show results
                    quiz.style.display = 'none';
                    
                    // Display score
                    const scoreDisplay = document.getElementById('score-display');
                    const scoreMessage = document.querySelector('.score-message');
                    const answersReview = document.getElementById('answers-review');
                    
                    scoreDisplay.innerHTML = `<h2>Your Score: ${score}/3</h2>`;
                    
                    // Show different messages based on score
                    if (score === 3) {
                        scoreMessage.textContent = "Impressive! You're already an AI in science expert!";
                    } else if (score === 2) {
                        scoreMessage.textContent = "Great job! You know your stuff about AI in science.";
                    } else if (score === 1) {
                        scoreMessage.textContent = "Good try! There's more to learn about AI in science.";
                    } else {
                        scoreMessage.textContent = "Thanks for playing! Join our waitlist to learn more about AI in science.";
                    }
                    
                    // Display answers review
                    let reviewHTML = '<div class="answers-container">';
                    
                    for (let i = 1; i <= 3; i++) {
                        const isCorrect = userAnswers[i] === correctAnswers[i];
                        const userAnswer = answerOptions[i][userAnswers[i]];
                        const correctAnswer = answerOptions[i][correctAnswers[i]];
                        
                        reviewHTML += `
                            <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
                                <h4>Question ${i}: ${questionText[i]}</h4>
                                <p>Your answer: ${userAnswer} ${isCorrect ? '✓' : '✗'}</p>
                                ${!isCorrect ? `<p>Correct answer: ${correctAnswer}</p>` : ''}
                            </div>
                        `;
                    }
                    
                    reviewHTML += '</div>';
                    answersReview.innerHTML = reviewHTML;
                    
                    result.style.display = 'block';
                }
            }, 500);
        }
    });

    // Handle email form submission
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        // Here you would typically send this to your backend
        console.log('Email submitted:', email, 'Score:', score);
        
        // Show thank you message
        emailForm.innerHTML = `<p>Thanks! We'll be in touch soon.</p>`;
    });
});