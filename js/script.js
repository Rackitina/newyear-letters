// Основной JavaScript файл для функционала сайта

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initLetterGenerator();
    initFilterButtons();
    initFAQ();
    initContactForm();
    initBlogSearch();
});

// ========== ФУНКЦИИ ДЛЯ ГЕНЕРАТОРА ПИСЕМ (index.html) ==========

function initLetterGenerator() {
    const recipientInput = document.getElementById('recipient');
    const senderInput = document.getElementById('sender');
    const messageInput = document.getElementById('message');
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const styleButtons = document.querySelectorAll('.style-btn');
    const letterPreview = document.getElementById('letter-preview');
    
    if (!recipientInput) return; // Проверяем, что мы на главной странице
    
    // Обновление предпросмотра при вводе текста
    function updatePreview() {
        const recipient = recipientInput.value || 'Дорогой друг';
        const sender = senderInput.value || 'С наилучшими пожеланиями';
        const message = messageInput.value || 'Пусть новый год принесет вам счастье, здоровье и удачу!';
        
        document.getElementById('preview-recipient').textContent = recipient + '!';
        document.getElementById('preview-message').textContent = message;
        document.getElementById('preview-sender').textContent = `С любовью, ${sender}`;
    }
    
    // Обработчики событий для полей ввода
    recipientInput.addEventListener('input', updatePreview);
    senderInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
    
    // Смена стиля письма
    styleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            styleButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Получаем выбранный стиль
            const style = this.getAttribute('data-style');
            applyLetterStyle(style);
        });
    });
    
    // Применение стиля к письму
    function applyLetterStyle(style) {
        // Удаляем все стилевые классы
        letterPreview.classList.remove('classic-style', 'modern-style', 'elegant-style');
        
        // Добавляем выбранный стиль
        letterPreview.classList.add(`${style}-style`);
        
        // Применяем дополнительные стили в зависимости от выбора
        switch(style) {
            case 'modern':
                letterPreview.style.fontFamily = "'PT Sans', sans-serif";
                letterPreview.style.backgroundColor = '#ffffff';
                letterPreview.style.borderLeft = '5px solid #FFD700';
                break;
            case 'elegant':
                letterPreview.style.fontFamily = "'Georgia', serif";
                letterPreview.style.backgroundColor = '#f9f3e9';
                letterPreview.style.borderTop = '3px solid #8B4513';
                break;
            default: // classic
                letterPreview.style.fontFamily = "'Mountains of Christmas', cursive";
                letterPreview.style.backgroundColor = '#ffffff';
                letterPreview.style.border = '2px dashed #2E8B57';
        }
    }
    
    // Генерация письма
    generateBtn.addEventListener('click', function() {
        updatePreview();
        
        // Анимация кнопки
        this.innerHTML = '<i class="fas fa-check"></i> Письмо создано!';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-magic"></i> Создать письмо';
            this.style.backgroundColor = '';
        }, 2000);
        
        // Показать сообщение об успехе
        showNotification('Письмо успешно создано! Теперь вы можете сохранить его.', 'success');
    });
    
    // Сохранение письма (эмуляция)
    saveBtn.addEventListener('click', function() {
        // В реальном проекте здесь бы использовалась библиотека для создания изображений,
        // например, html2canvas
        
        // Эмуляция процесса сохранения
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-download"></i> Сохранить как картинку';
            this.disabled = false;
            
            // Показать сообщение об успешном сохранении
            showNotification('Письмо сохранено как изображение! Проверьте папку "Загрузки".', 'success');
            
            // Эмуляция скачивания
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'новогоднее-письмо.png';
            link.click();
        }, 1500);
    });
    
    // Инициализация предпросмотра
    updatePreview();
}

// ========== ФУНКЦИИ ДЛЯ ФИЛЬТРАЦИИ (portfolio.html) ==========

function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length) return; // Проверяем, что мы на странице портфолио
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Получаем выбранную категорию
            const filter = this.getAttribute('data-filter');
            
            // Фильтрация элементов
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========== ФУНКЦИИ ДЛЯ FAQ (contacts.html) ==========

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) return; // Проверяем, что мы на странице контактов
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Закрываем все открытые ответы
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.display = 'none';
                    item.querySelector('i').className = 'fas fa-chevron-down';
                }
            });
            
            // Переключаем текущий элемент
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
            } else {
                answer.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });
    });
}

// ========== ФУНКЦИИ ДЛЯ ФОРМЫ КОНТАКТОВ (contacts.html) ==========

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return; // Проверяем, что мы на странице контактов
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const formMessage = document.getElementById('form-message');
        
        // Простая валидация
        let isValid = true;
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || name.trim().length < 2) {
            isValid = false;
            showFormError('Пожалуйста, введите ваше имя (минимум 2 символа)');
        }
        
        if (!email || !isValidEmail(email)) {
            isValid = false;
            showFormError('Пожалуйста, введите корректный email');
        }
        
        if (!message || message.trim().length < 10) {
            isValid = false;
            showFormError('Сообщение должно содержать минимум 10 символов');
        }
        
        if (isValid) {
            // Эмуляция отправки формы
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Показать сообщение об успехе
                formMessage.textContent = 'Спасибо! Ваше сообщение успешно отправлено. Мы ответим вам в течение 24 часов.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Очистить форму
                contactForm.reset();
                
                // Скрыть сообщение через 5 секунд
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        }
        
        function showFormError(message) {
            formMessage.textContent = message;
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// ========== ФУНКЦИИ ДЛЯ БЛОГА (blog.html) ==========

function initBlogSearch() {
    const searchBox = document.querySelector('.search-box');
    
    if (!searchBox) return; // Проверяем, что мы на странице блога
    
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (query) {
            // Эмуляция поиска
            showNotification(`Поиск: "${query}". В реальном приложении здесь бы отображались результаты.`, 'info');
            
            // Можно добавить реальную логику поиска по статьям
            // highlightSearchResults(query);
        } else {
            showNotification('Введите поисковый запрос', 'warning');
        }
    }
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

// Проверка email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Показать уведомление
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Стили для уведомления
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    notification.style.display = 'flex';
    notification.style.justifyContent = 'space-between';
    notification.style.alignItems = 'center';
    notification.style.animation = 'slideIn 0.3s ease';
    
    // Цвета в зависимости от типа
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#d4edda';
            notification.style.color = '#155724';
            notification.style.borderLeft = '4px solid #28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#f8d7da';
            notification.style.color = '#721c24';
            notification.style.borderLeft = '4px solid #dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#fff3cd';
            notification.style.color = '#856404';
            notification.style.borderLeft = '4px solid #ffc107';
            break;
        default: // info
            notification.style.backgroundColor = '#d1ecf1';
            notification.style.color = '#0c5460';
            notification.style.borderLeft = '4px solid #17a2b8';
    }
    
    // Добавляем в тело документа
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
    
    // Анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            color: inherit;
        }
    `;
    document.head.appendChild(style);
}

// ========== ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ ==========

// Эффект параллакса для снежинок
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const snowflakes = document.querySelectorAll('.snowflake');
    
    if (snowflakes.length) {
        snowflakes.forEach((flake, index) => {
            const speed = 0.5 + (index * 0.1);
            flake.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с классом "animate-on-scroll"
document.querySelectorAll('.feature, .portfolio-item, .testimonial, .blog-post').forEach(el => {
    observer.observe(el);
});

// Добавляем стили для анимации
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .feature, .portfolio-item, .testimonial, .blog-post {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature.animated, 
    .portfolio-item.animated, 
    .testimonial.animated, 
    .blog-post.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyle);