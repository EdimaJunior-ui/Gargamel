document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startMenu = document.getElementById('start-menu');
    const quizSection = document.getElementById('quiz-section');
    const resultsSection = document.getElementById('results-section');
    const collaboratorsSection = document.getElementById('collaborators-section');
    
    const startButton = document.getElementById('start-button');
    const collaboratorsButton = document.getElementById('collaborators-button');
    const nextButton = document.getElementById('next-button');
    const finishButton = document.getElementById('finish-button');
    const restartButton = document.getElementById('restart-button');
    const backToMenuButton = document.getElementById('back-to-menu-button');
    const backButton = document.getElementById('back-button');
    
    const questionText = document.getElementById('question-text');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    const scoreElements = {
        main: document.getElementById('score'),
        quiz: document.getElementById('quiz-score'),
        final: document.getElementById('final-score'),
        collab: document.getElementById('collab-score')
    };
    
    const correctAnswersSpan = document.getElementById('correct-answers');
    const resultMessageDiv = document.getElementById('result-message');
    
    // Citações do Filme
    const movieQuotes = [
        'Não importa o que os outros façam. Importa o que você faz. - Erin Gruwell',
        'Somos todos diferentes. Somos todos humanos. - Erin Gruwell',
        'É preciso dar voz para que eles possam ser ouvidos. - Erin Gruwell',
        'A dor é temporária, mas a educação é para sempre. - Erin Gruwell',
        'Tudo começa com um pequeno passo. Um diário... - Erin Gruwell',
        'Um professor faz diferença. - Erin Gruwell',
        'A tolerância é uma lição que vale a pena ser ensinada. - Erin Gruwell',
        'Você não pode mudar o mundo, mas pode começar a mudá-lo. - Erin Gruwell'
    ];
    
    // Flashbacks
    const flashbacks = {
        2: 'Flashback: Erin distribui diários para que os alunos escrevam suas histórias pessoais, usando a escrita como forma de expressão e libertação.',
        5: 'Flashback: A professora descobre que o nome "Wilson" (da escola) causa conflito por estar ligado a um presidente americano com ideais considerados racistas.',
        8: 'Flashback: Erin usa o Holocausto como comparação para mostrar como o preconceito pode levar a consequências devastadoras, ajudando os alunos a verem além de suas próprias experiências.'
    };
    
    // Quiz Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let questionsAnswered = 0;
    let hintsLeft = 3;
    
    // Quiz Questions
    const questions = [
        {
            question: "Qual é o nome da professora protagonista do filme?",
            options: [
                "Erin Gruwell", 
                "Jane Smith", 
                "Margaret Davis", 
                "Sandra Thompson"
            ],
            correctAnswer: 0,
            hint: "Dica: O personagem é interpretado por Hilary Swank."
        },
        {
            question: "Em que escola os eventos do filme acontecem?",
            options: [
                "Wilson High School", 
                "Woodrow Wilson High School", 
                "Washington High School", 
                "West High School"
            ],
            correctAnswer: 1,
            hint: "Dica: O nome completo inclui o de um presidente americano."
        },
        {
            question: "Qual livro a professora Erin dá aos alunos que inspira o título do filme?",
            options: [
                "O Diário de Anne Frank", 
                "Romeu e Julieta", 
                "A Lista de Schindler", 
                "Os Miseráveis"
            ],
            correctAnswer: 0,
            hint: "Dica: É um diário escrito durante o Holocausto."
        },
        {
            question: "No início do filme, como os alunos eram divididos dentro da sala de aula?",
            options: [
                "Por notas", 
                "Aleatoriamente", 
                "Por grupos raciais", 
                "Por idade"
            ],
            correctAnswer: 2,
            hint: "Dica: A divisão refletia tensões sociais e étnicas."
        },
        {
            question: "O que a professora pede para os alunos fazerem como projeto principal?",
            options: [
                "Criar uma peça de teatro", 
                "Escrever em diários pessoais", 
                "Debater sobre questões sociais", 
                "Fazer trabalho voluntário"
            ],
            correctAnswer: 1,
            hint: "Dica: Uma forma pessoal de expressar seus pensamentos diariamente."
        },
        {
            question: "Qual sobrenome aparece na parede de honra da escola que causa conflito?",
            options: [
                "Washington", 
                "Jefferson", 
                "Lincoln", 
                "Wilson"
            ],
            correctAnswer: 3,
            hint: "Dica: É o nome da escola."
        },
        {
            question: "Que trabalho extra Erin pega para poder comprar livros para seus alunos?",
            options: [
                "Garçonete e vendedora de roupas", 
                "Recepcionista e garçonete", 
                "Tutora e garçonete", 
                "Faxineira e vendedora"
            ],
            correctAnswer: 0,
            hint: "Dica: Dois trabalhos, um deles servindo pessoas em um restaurante."
        },
        {
            question: "Qual jogo é usado pela professora para mostrar como os alunos têm mais em comum do que pensam?",
            options: [
                "Verdade ou consequência", 
                "Jogo da memória", 
                "Jogo de perguntas", 
                "Linha do limite"
            ],
            correctAnswer: 3,
            hint: "Dica: Envolve dar passos adiante quando certos fatos são verdadeiros para você."
        },
        {
            question: "Qual evento histórico é comparado com as experiências dos alunos no filme?",
            options: [
                "Guerra Civil Americana", 
                "Holocausto", 
                "Guerra do Vietnã", 
                "Movimento dos Direitos Civis"
            ],
            correctAnswer: 1,
            hint: "Dica: Perseguição aos judeus durante a Segunda Guerra Mundial."
        },
        {
            question: "O filme é baseado em uma história real?",
            options: [
                "Não, é completamente fictício", 
                "Sim, baseado no livro 'The Freedom Writers Diary'", 
                "Parcialmente, personagens são fictícios", 
                "Sim, mas com muitas adaptações"
            ],
            correctAnswer: 1,
            hint: "Dica: O título do filme se relaciona com um livro que compila escritos reais."
        }
    ];
    
    // Initialize
    function initializeQuiz() {
        // Adiciona botão de modo noturno
        addDarkModeToggle();
        
        // Adiciona botão de dica
        addHintButton();
        
        // Adiciona botões adicionais ao menu
        addExtraMenuButtons();
        
        // Event Listeners
        startButton.addEventListener('click', startQuiz);
        collaboratorsButton.addEventListener('click', showCollaborators);
        nextButton.addEventListener('click', nextQuestion);
        finishButton.addEventListener('click', showResults);
        restartButton.addEventListener('click', restartQuiz);
        backToMenuButton.addEventListener('click', backToMenu);
        backButton.addEventListener('click', backToMenu);
        
        optionButtons.forEach(button => {
            button.addEventListener('click', () => selectOption(button));
        });
        
        // Set initial score
        updateScore(0);
        
        // Inicializa animações
        animateInterface();
    }
    
    // Adicionar botão de modo noturno
    function addDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'dark-mode-toggle';
        darkModeToggle.className = 'btn dark-mode-btn';
        darkModeToggle.innerHTML = `
            <span class="sun-icon">☀️</span>
            <span class="moon-icon">🌙</span>
        `;
        
        document.querySelector('.container').prepend(darkModeToggle);
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.querySelector('.container').classList.toggle('dark-mode');
            
            // Adicione dark-mode a todos os botões
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => btn.classList.toggle('dark-mode'));
            
            // Adicione dark-mode a todos os botões de opção
            const optionButtons = document.querySelectorAll('.option-btn');
            optionButtons.forEach(btn => btn.classList.toggle('dark-mode'));
            
            // Adicione dark-mode à citação
            const quotes = document.querySelectorAll('.quote');
            quotes.forEach(quote => quote.classList.toggle('dark-mode'));
        });
    }
    
    // Adicionar botão de dica
    function addHintButton() {
        const hintButton = document.createElement('button');
        hintButton.id = 'hint-button';
        hintButton.className = 'btn hint-btn';
        hintButton.textContent = `Dica (${hintsLeft} restantes)`;
        
        // Adiciona ao quiz-section antes da question-container
        const questionContainer = document.querySelector('.question-container');
        if (questionContainer && questionContainer.parentNode) {
            questionContainer.parentNode.insertBefore(hintButton, questionContainer);
        }
        
        hintButton.addEventListener('click', () => {
            if (hintsLeft > 0) {
                const hint = questions[currentQuestionIndex].hint || 'Sem dica disponível para esta pergunta.';
                
                const hintElement = document.createElement('div');
                hintElement.className = 'hint-popup';
                hintElement.textContent = hint;
                document.body.appendChild(hintElement);
                
                setTimeout(() => {
                    hintElement.classList.add('show');
                    setTimeout(() => {
                        hintElement.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(hintElement);
                        }, 500);
                    }, 3000);
                }, 100);
                
                hintsLeft--;
                hintButton.textContent = `Dica (${hintsLeft} restantes)`;
                if (hintsLeft === 0) {
                    hintButton.disabled = true;
                }
            }
        });
    }
    
    // Adicionar botões extras ao menu inicial
    function addExtraMenuButtons() {
        const buttonsContainer = document.querySelector('.buttons');
        
        // Botão de galeria
        const galleryButton = document.createElement('button');
        galleryButton.textContent = 'Galeria dos Personagens';
        galleryButton.className = 'btn';
        galleryButton.addEventListener('click', showGallery);
        buttonsContainer.appendChild(galleryButton);
        
        // Botão saiba mais
        const learnMoreButton = document.createElement('button');
        learnMoreButton.textContent = 'Saiba Mais';
        learnMoreButton.className = 'btn';
        learnMoreButton.addEventListener('click', showLearnMore);
        buttonsContainer.appendChild(learnMoreButton);
    }
    
    // Mostrar galeria de personagens
    function showGallery() {
        // Cria a seção de galeria se não existir
        let gallerySection = document.getElementById('gallery-section');
        
        if (!gallerySection) {
            gallerySection = document.createElement('section');
            gallerySection.id = 'gallery-section';
            gallerySection.className = 'hidden';
            
            gallerySection.innerHTML = `
                <div class="score-display">
                    <span id="gallery-score">${score}</span> pontos
                </div>
                <h2>Galeria dos Personagens</h2>
                <div class="gallery-container">
                    <div class="character">
                        <img src="https://i.ibb.co/yF7PT4S4/images-1.jpg" alt="Erin Gruwell">
                        <h3>Erin Gruwell</h3>
                        <p>Professora dedicada que transforma a vida de seus alunos através da escrita e educação.</p>
                    </div>
                    <div class="character">
                        <img src="https://i.ibb.co/xqZqTJc1/tumblr-n4t0dm7zm-W1smit15o3-1280.png" alt="Eva">
                        <h3>Eva</h3>
                        <p>Aluna que enfrenta dilemas morais e encontra sua voz através da escrita.</p>
                    </div>
                    <div class="character">
                        <img src="https://i.ibb.co/PGHpKnYZ/MV5-BNDA1-Nz-U0-NDQ1-Ml5-BMl5-Ban-Bn-Xk-Ft-ZTYw-Nj-Qy-Mz-M3-V1-QL75-UX328.jpg" alt="Andre">
                        <h3>Andre</h3>
                        <p>Aluno que descobre seu talento para escrita apesar das dificuldades.</p>
                    </div>
                    <div class="character">
                        <img src="https://i.ibb.co/35JnbZfF/2007-freedom-writers-0131.jpg" alt="Marcus">
                        <h3>Marcus</h3>
                        <p>Aluno cujas experiências difíceis são canalizadas em poderosas reflexões.</p>
                    </div>
                </div>
                <button id="back-from-gallery" class="btn">Voltar ao Menu</button>
            `;
            
            document.querySelector('.container').appendChild(gallerySection);
            
            // Adiciona listener ao botão de voltar
            const backFromGalleryBtn = document.getElementById('back-from-gallery');
            backFromGalleryBtn.addEventListener('click', backToMenu);
        } else {
            // Atualiza pontuação
            const galleryScoreElement = document.getElementById('gallery-score');
            if (galleryScoreElement) {
                galleryScoreElement.textContent = score;
            }
        }
        
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            startMenu.classList.add('hidden');
            startMenu.classList.remove('active');
            gallerySection.classList.remove('hidden');
            gallerySection.classList.add('active');
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Mostrar seção saiba mais
    function showLearnMore() {
        // Cria a seção saiba mais se não existir
        let learnMoreSection = document.getElementById('learn-more-section');
        
        if (!learnMoreSection) {
            learnMoreSection = document.createElement('section');
            learnMoreSection.id = 'learn-more-section';
            learnMoreSection.className = 'hidden';
            
            learnMoreSection.innerHTML = `
                <div class="score-display">
                    <span id="learn-more-score">${score}</span> pontos
                </div>
                <h2>Saiba Mais</h2>
                <div class="learn-more-content">
                    <div class="movie-info">
                        <img src="https://i.ibb.co/C57kx7DL/br-11134201-7r98o-lwnr5z79oid520.jpg" alt="Pôster do filme Os Escritores da Liberdade" class="movie-poster">
                        <div class="movie-details">
                            <h3>Os Escritores da Liberdade</h3>
                            <p><strong>Ano:</strong> 2007</p>
                            <p><strong>Direção:</strong> Richard LaGravenese</p>
                            <p><strong>Estrelando:</strong> Hilary Swank, Patrick Dempsey, Scott Glenn</p>
                        </div>
                    </div>
                    <h3>História Real</h3>
                    <p>O filme "Os Escritores da Liberdade" é baseado na história real da professora Erin Gruwell e seus alunos na Woodrow Wilson High School em Long Beach, Califórnia, durante os anos 1990.</p>
                    <p>Enfrentando preconceitos, violência de gangues e um sistema educacional falho, Erin utilizou diários pessoais para incentivar seus alunos a expressarem suas experiências. Através da leitura de "O Diário de Anne Frank" e de textos sobre o Holocausto, ela ajudou os estudantes a verem paralelos com suas próprias vidas e a desenvolverem empatia.</p>
                    <p>Os diários foram posteriormente publicados como o livro "The Freedom Writers Diary", que se tornou um best-seller e inspirou este filme.</p>
                    <h3>Impacto</h3>
                    <p>Após o sucesso de sua experiência pedagógica, Erin Gruwell fundou a Freedom Writers Foundation, uma organização sem fins lucrativos que trabalha para reproduzir seu método de ensino em outras escolas e comunidades.</p>
                </div>
                <button id="back-from-learn-more" class="btn">Voltar ao Menu</button>
            `;
            
            document.querySelector('.container').appendChild(learnMoreSection);
            
            // Adiciona listener ao botão de voltar
            const backFromLearnMoreBtn = document.getElementById('back-from-learn-more');
            backFromLearnMoreBtn.addEventListener('click', backToMenu);
        } else {
            // Atualiza pontuação
            const learnMoreScoreElement = document.getElementById('learn-more-score');
            if (learnMoreScoreElement) {
                learnMoreScoreElement.textContent = score;
            }
        }
        
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            startMenu.classList.add('hidden');
            startMenu.classList.remove('active');
            learnMoreSection.classList.remove('hidden');
            learnMoreSection.classList.add('active');
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Mostrar citação aleatória
    function showRandomQuote() {
        const quoteIndex = Math.floor(Math.random() * movieQuotes.length);
        
        // Cria um elemento de citação temporário
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote-popup';
        quoteElement.textContent = movieQuotes[quoteIndex];
        document.body.appendChild(quoteElement);
        
        // Anima e remove após alguns segundos
        setTimeout(() => {
            quoteElement.classList.add('show');
            setTimeout(() => {
                quoteElement.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(quoteElement);
                }, 500);
            }, 3000);
        }, 100);
    }
    
    // Mostrar flashback
    function showFlashback(questionIndex) {
        if (flashbacks[questionIndex]) {
            const flashbackElement = document.createElement('div');
            flashbackElement.className = 'flashback-popup';
            flashbackElement.innerHTML = `
                <h3>Flashback Desbloqueado!</h3>
                <p>${flashbacks[questionIndex]}</p>
                <button class="btn close-flashback">Fechar</button>
            `;
            document.body.appendChild(flashbackElement);
            
            setTimeout(() => {
                flashbackElement.classList.add('show');
            }, 100);
            
            const closeButton = flashbackElement.querySelector('.close-flashback');
            closeButton.addEventListener('click', () => {
                flashbackElement.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(flashbackElement);
                }, 500);
            });
        }
    }
    
    // Animar elementos da interface
    function animateInterface() {
        // Animar silhuetas
        const silhouettes = document.querySelectorAll('.silhouette');
        silhouettes.forEach((silhouette, index) => {
            silhouette.style.animation = `floatAnimation 8s ease-in-out infinite ${index * 2}s`;
        });
        
        // Animar caneta
        const pen = document.querySelector('.pen');
        if (pen) {
            pen.style.animation = 'writingMotion 8s ease-in-out infinite';
        }
    }
    
    // Update Score
    function updateScore(newScore) {
        score = newScore;
        for (const key in scoreElements) {
            if (scoreElements[key]) {
                scoreElements[key].textContent = score;
            }
        }
    }
    
    // Atualizar a barra de progresso com animação de lápis
    function updateProgressBar() {
        const progressBar = document.querySelector('.progress');
        const pencilIcon = document.querySelector('.pencil-icon');
        const currentQuestionSpan = document.getElementById('current-question');
        
        if (progressBar && pencilIcon && currentQuestionSpan) {
            const progress = ((currentQuestionIndex) / questions.length) * 100;
            
            // Atualiza a largura da barra de progresso
            progressBar.style.width = `${progress}%`;
            
            // Move o ícone do lápis
            pencilIcon.style.left = `${progress}%`;
            
            // Atualiza o texto de progresso
            currentQuestionSpan.textContent = currentQuestionIndex + 1;
        }
    }
    
    // Função aprimorada para animação de aumento de pontuação
    function animateScoreIncrease() {
        for (const key in scoreElements) {
            if (scoreElements[key]) {
                scoreElements[key].classList.add('score-increase');
                setTimeout(() => {
                    scoreElements[key].classList.remove('score-increase');
                }, 1000);
            }
        }
    }
    
    // Função para iniciar o quiz com animações
    function startQuiz() {
        // Embaralhar perguntas para ordem aleatória
        shuffleArray(questions);
        
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            startMenu.classList.add('hidden');
            startMenu.classList.remove('active');
            quizSection.classList.remove('hidden');
            quizSection.classList.add('active');
            
            currentQuestionIndex = 0;
            questionsAnswered = 0;
            loadQuestion(currentQuestionIndex);
            updateProgressBar();
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Embaralhar array (para perguntas aleatórias)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Adicionar efeito de escrita nas perguntas
    function loadQuestion(index) {
        const question = questions[index];
        
        // Primeiro esconde o texto da pergunta
        questionText.style.opacity = 0;
        
        setTimeout(() => {
            // Depois atualiza o texto
            questionText.textContent = question.question;
            
            // E faz a animação de aparecer
            questionText.style.opacity = 1;
            questionText.style.animation = 'none';
            void questionText.offsetWidth; // Força reflow
            questionText.style.animation = 'writeText 1s ease-out';
            
            // Configura as opções
            optionButtons.forEach((button, i) => {
                button.textContent = question.options[i];
                button.classList.remove('selected', 'correct', 'incorrect');
                button.disabled = false;
                
                // Adiciona delay para cada opção aparecer sequencialmente
                button.style.opacity = 0;
                setTimeout(() => {
                    button.style.opacity = 1;
                    button.style.animation = 'fadeInOptions 0.5s ease forwards';
                }, 300 + (i * 100));
            });
            
            nextButton.disabled = true;
            selectedOption = null;
            
            // Show finish button on last question
            if (index === questions.length - 1) {
                nextButton.classList.add('hidden');
                finishButton.classList.remove('hidden');
            } else {
                nextButton.classList.remove('hidden');
                finishButton.classList.add('hidden');
            }
        }, 300);
    }
    
    // Select Option
    function selectOption(button) {
        // Remove previous selection
        optionButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add new selection
        button.classList.add('selected');
        selectedOption = parseInt(button.dataset.index);
        
        // Enable next button
        nextButton.disabled = false;
        finishButton.disabled = false;
        
        // Check answer
        checkAnswer();
    }
    
    // Modificar a função de verificação de resposta para melhorar a animação
    function checkAnswer() {
        if (selectedOption === null) return;
        
        questionsAnswered++;
        const correctIndex = questions[currentQuestionIndex].correctAnswer;
        
        // Disable all options
        optionButtons.forEach(button => {
            button.disabled = true;
        });
        
        // Mark correct and incorrect answers with delay for efeito
        setTimeout(() => {
            if (selectedOption === correctIndex) {
                optionButtons[selectedOption].classList.add('correct');
                updateScore(score + 10);
                animateScoreIncrease();
                showRandomQuote();
                showFlashback(currentQuestionIndex);
            } else {
                optionButtons[selectedOption].classList.add('incorrect');
                
                // Espera um pouco antes de mostrar a resposta correta
                setTimeout(() => {
                    optionButtons[correctIndex].classList.add('correct');
                }, 500);
            }
        }, 300);
    }
    
    // Atualizar para incluir efeito de virar página e animações adicionais
    function nextQuestion() {
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
                updateProgressBar();
            }
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Show Results
    function showResults() {
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            quizSection.classList.add('hidden');
            quizSection.classList.remove('active');
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('active');
            
            const correctAnswers = score / 10;
            correctAnswersSpan.textContent = correctAnswers;
            
            // Generate result message
            let message = '';
            if (correctAnswers === 10) {
                message = "Excelente! Você é um verdadeiro especialista no filme Os Escritores da Liberdade!";
            } else if (correctAnswers >= 7) {
                message = "Muito bom! Você conhece bastante sobre o filme!";
            } else if (correctAnswers >= 5) {
                message = "Bom trabalho! Você tem um conhecimento razoável sobre o filme.";
            } else {
                message = "Continue tentando! Talvez seja hora de assistir ao filme novamente.";
            }
            
            resultMessageDiv.textContent = message;
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Show Collaborators
    function showCollaborators() {
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            startMenu.classList.add('hidden');
            startMenu.classList.remove('active');
            collaboratorsSection.classList.remove('hidden');
            collaboratorsSection.classList.add('active');
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Back to Menu
    function backToMenu() {
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            // Hide all sections
            quizSection.classList.add('hidden');
            quizSection.classList.remove('active');
            resultsSection.classList.add('hidden');
            resultsSection.classList.remove('active');
            collaboratorsSection.classList.add('hidden');
            collaboratorsSection.classList.remove('active');
            
            // Hide additional sections if they exist
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) {
                gallerySection.classList.add('hidden');
                gallerySection.classList.remove('active');
            }
            
            const learnMoreSection = document.getElementById('learn-more-section');
            if (learnMoreSection) {
                learnMoreSection.classList.add('hidden');
                learnMoreSection.classList.remove('active');
            }
            
            // Show start menu
            startMenu.classList.remove('hidden');
            startMenu.classList.add('active');
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Restart Quiz
    function restartQuiz() {
        // Ativa animação de virar página
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            pageTransition.classList.add('page-turn');
        }
        
        setTimeout(() => {
            resultsSection.classList.add('hidden');
            resultsSection.classList.remove('active');
            quizSection.classList.remove('hidden');
            quizSection.classList.add('active');
            
            // Reinicia as dicas
            hintsLeft = 3;
            const hintButton = document.getElementById('hint-button');
            if (hintButton) {
                hintButton.textContent = `Dica (${hintsLeft} restantes)`;
                hintButton.disabled = false;
            }
            
            // Embaralha as perguntas novamente
            shuffleArray(questions);
            
            currentQuestionIndex = 0;
            updateScore(0);
            questionsAnswered = 0;
            loadQuestion(currentQuestionIndex);
            updateProgressBar();
            
            if (pageTransition) {
                setTimeout(() => {
                    pageTransition.classList.remove('page-turn');
                }, 1200);
            }
        }, 600);
    }
    
    // Initialize the quiz
    initializeQuiz();
});
