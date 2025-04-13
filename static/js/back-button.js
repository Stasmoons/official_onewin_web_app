document.addEventListener('DOMContentLoaded', function() {
    // Создаем кнопку
    const homeButton = document.createElement('a');
    homeButton.classList.add("site-nav");  // Для скриптов навигации
    homeButton.setAttribute("href", "index.html");
    homeButton.textContent = '◀';
    homeButton.style.display = 'block';
    homeButton.style.position = 'fixed';
    homeButton.style.top = '10px';
    homeButton.style.left = '10px';
    homeButton.style.zIndex = '1000';
    homeButton.style.padding = '8px 15px';
    homeButton.style.backgroundColor = 'rgba(81, 81, 81, 0.4)';
    homeButton.style.color = 'rgba(255,255,255,0.8)';
    homeButton.style.textDecoration = 'none';
    homeButton.style.border = 'none';
    homeButton.style.borderRadius = '4px';
    homeButton.style.cursor = 'pointer';
    homeButton.style.fontSize = '14px';
    
    // Добавляем кнопку в тело документа
    document.body.appendChild(homeButton);
  });