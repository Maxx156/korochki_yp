// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Экран загрузки
const pageLoader = document.querySelector('.page-loader');

if (pageLoader) {
    document.body.classList.add('loading');
    const progressBar = pageLoader.querySelector('.loader-progress span');
    const loaderText = pageLoader.querySelector('.loader-text');
    const loaderPhrases = [
        'Подготавливаем лаборатории...',
        'Синхронизируем расписание...',
        'Собираем наставников в эфир...',
        'Загружаем тренажёры...',
        'Собираем портфолио студентов...'
    ];

    const updateText = () => {
        loaderText.textContent = loaderPhrases[Math.floor(Math.random() * loaderPhrases.length)];
    };

    let progress = 0;
    const fakeLoading = setInterval(() => {
        progress = Math.min(progress + Math.random() * 15, 95);
        progressBar.style.width = `${progress}%`;
    }, 250);

    const textInterval = setInterval(updateText, 1500);

    window.addEventListener('load', () => {
        setTimeout(() => {
            progress = 100;
            progressBar.style.width = '100%';
            updateText();
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                document.body.classList.remove('loading');
                clearInterval(fakeLoading);
                clearInterval(textInterval);
            }, 400);
        }, 500);
    });
}

// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Применяем анимацию к элементам
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .course-card, .staff-card, .review-card, .service-card, .stat-card, .module-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Анимация счетчиков на странице "О нас"
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Запуск анимации счетчиков при появлении в viewport
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Обработка формы обратной связи
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Получаем данные формы
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Валидация
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }

        // Имитация отправки (в реальном проекте здесь был бы AJAX запрос)
        showFormMessage('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.', 'success');
        contactForm.reset();

        // Скрыть сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Добавление эффекта при наведении на карточки курсов
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Переключение этапов обучения
const journeySteps = document.querySelectorAll('.journey-step');
const journeyDetails = document.querySelectorAll('.journey-detail');

const activateJourneyStep = (step) => {
    journeySteps.forEach(btn => btn.classList.toggle('active', btn.dataset.step === step));
    journeyDetails.forEach(detail => {
        detail.classList.toggle('active', detail.dataset.stepDetail === step);
    });
};

journeySteps.forEach(step => {
    step.addEventListener('click', () => activateJourneyStep(step.dataset.step));
});

if (journeySteps.length) {
    activateJourneyStep(journeySteps[0].dataset.step);
}

// Эффект подсветки для интерактивных модулей
const moduleCards = document.querySelectorAll('.module-card');

moduleCards.forEach(card => {
    card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--cursor-x', `${x}%`);
        card.style.setProperty('--cursor-y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--cursor-x');
        card.style.removeProperty('--cursor-y');
    });
});

// Добавление активного класса к текущей странице в навигации
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const shapes = hero.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Анимация звезд в отзывах
document.querySelectorAll('.review-rating .star').forEach((star, index) => {
    star.style.animationDelay = `${index * 0.1}s`;
    star.style.animation = 'twinkle 2s infinite';
});

// Добавление CSS анимации для звезд
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);



