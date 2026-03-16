document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Завдання 1: Зберігання даних (localStorage)
    // ==========================================
    function getSystemInfo() {
        const userAgent = navigator.userAgent;
        let os = "Невідома ОС";
        let browser = "Невідомий браузер";

        // Визначаємо ОС
        if (userAgent.includes("Win")) os = "Windows";
        else if (userAgent.includes("Mac")) os = "MacOS";
        else if (userAgent.includes("Linux")) os = "Linux";

        // Визначаємо браузер
        if (userAgent.includes("Chrome")) browser = "Chrome";
        else if (userAgent.includes("Firefox")) browser = "Firefox";
        else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
        else if (userAgent.includes("Edge")) browser = "Edge";

        return `Операційна система: ${os} | Браузер: ${browser}`;
    }

    // Зберігаємо в localStorage та виводимо у футер
    const sysInfo = getSystemInfo();
    localStorage.setItem("system_info", sysInfo);
    document.getElementById("os-browser-info").innerText = "Дані з localStorage: " + localStorage.getItem("system_info");


    // ==========================================
    // Завдання 4: Перехід на нічний/денний режим
    // ==========================================
    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");
    
    // Автоматичне перемикання (Денна тема: 07:00 - 21:00)
    const currentHour = new Date().getHours();
    if (currentHour < 7 || currentHour >= 21) {
        body.classList.add("dark-mode"); // Вмикаємо нічну тему
    }

    // Ручне перемикання кнопкою
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });


    // ==========================================
    // Завдання 2: Відображення динамічного вмісту (API)
    // ==========================================
    const commentsContainer = document.getElementById("comments-container");
    
    // Використовуємо твій 25 варіант!
    fetch("https://jsonplaceholder.typicode.com/posts/25/comments")
        .then(response => response.json())
        .then(comments => {
            commentsContainer.innerHTML = ""; // Очищаємо текст завантаження
            comments.forEach(comment => {
                const commentBox = document.createElement("div");
                commentBox.classList.add("comment-box");
                // Формуємо HTML для кожного коментаря
                commentBox.innerHTML = `
                    <p class="comment-email">${comment.email}</p>
                    <p><strong>${comment.name}</strong></p>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentBox);
            });
        })
        .catch(error => {
            commentsContainer.innerHTML = "<p>Помилка завантаження коментарів.</p>";
            console.error(error);
        });


    // ==========================================
    // Завдання 3: Модальне вікно та Formspree
    // ==========================================
    const modal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".close-btn");
    
    // Автоматично підставляємо твоє посилання Formspree у форму
    document.getElementById("feedback-form").action = "https://formspree.io/f/xgolgzby";


    setTimeout(() => {
        modal.style.display = "block";
    }, 60000);

    // Закриття модального вікна при кліку на хрестик
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Закриття вікна при кліку поза його межами
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});