const urlParams = new URLSearchParams(window.location.search);

const SUB1 = urlParams.get('sub1') || ''; 
const API_URL = urlParams.get("api_url");
const LOCALE_CODE = urlParams.get('locale_code') || 'en';
const isAdm = urlParams.get('adm') || false;


// Запрет на нажатия клавиш
if (!isAdm) {
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
    });
}


// Дублируем параметры для ссылок  
document.querySelectorAll(".site-nav").forEach(navElement => {
    let url = navElement.getAttribute('href')
    url += "?";
            
    // Добавляем параметры, если они есть
    url += `&sub1=${SUB1}`;
    url += `&locale_code=${LOCALE_CODE}`;
    url += `&api_url=${API_URL}`;

    // Меняем ссылку на элементе
    navElement.setAttribute("href", url.toString());
});
