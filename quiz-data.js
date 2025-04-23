// Quiz data with each question paired with its options and correct answer
const quizQuestions = [
    // {
    //   id: 1,
    //   text: "Which field was among the first to adopt AI for data analysis?",
    //   options: [
    //     { id: 1, text: "Astronomy" },
    //     { id: 2, text: "Medicine" },
    //     { id: 3, text: "Geology" }
    //   ],
    //   correctAnswerId: 1
    // },
    {
        id: 1,
        text: "What percentage of scientific papers mentioned AI in 2023?",
        options: [
            { id: 1, text: "Less than 1%" },
            { id: 2, text: "Around 8%" },
            { id: 3, text: "Over 25%" }
        ],
        correctAnswerId: 2,
        citation: "https://www.nature.com/articles/d41586-023-02988-6",
        explanation: "The number of research fields touched by artificial intelligence (AI) is rising all the time. From protein folding to weather forecasting, and from medical diagnostics to science communication, the list seems to grow by the day. The proportion of papers in the Scopus database that mention AI or AI-related keywords in the title or abstract now stands at 8%, up from 2% a decade ago, according to an analysis by Nature."
    },
    {
        id: 2,
        text: "Which of these words are disproportionately used by AI?",
        options: [
            { id: 1, text: "disproportionately" },
            { id: 2, text: "meticulously" },
            { id: 3, text: "furthermore" }
        ],
        correctAnswerId: 2,
        citation: "https://www.scientificamerican.com/article/chatbots-have-thoroughly-infiltrated-scientific-publishing",
        explanation: "The number of publications showing signs of AI involvement is reapidly increasing. One way of detecting this is to look for the change in prevalence of words which are disproportionatley used by AI."
    },
    {
        id: 3,
        text: "Which type of machine learning model is at the core of AlphaFold, the AI system awarded the 2024 Nobel Prize in Chemistry for protein structure prediction?",
        options: [
            { id: 1, text: "Decision Tree" },
            { id: 2, text: "Support Vector Machine" },
            { id: 3, text: "Deep Neural Network (Transformer-based)" }
        ],
        correctAnswerId: 3,
        citation: "https://onlinelibrary.wiley.com/doi/10.1002/prot.25834",
        explanation: "AlphaFold relies on advanced deep learning techniques, specifically a neural network architecture that incorporates attention mechanisms and is based on transformer models."
    },
    {
        id: 4,
        text: "Scientist in the loop refers to:",
        options: [
            { id: 1, text: "AI replacing scientists" },
            { id: 2, text: "Scientists verifying AI outputs" },
            { id: 3, text: "Scientists training AI models" }
        ],
        correctAnswerId: 2,
        citation: "https://www.scientistintheloop.com",
        explanation: "AI is still very flawed and gets things wrong all the time... but in collaboration with human experts, we can be empowered to perform better science, far quicker than ever."
    }
];
export default quizQuestions;
//# sourceMappingURL=quiz-data.js.map