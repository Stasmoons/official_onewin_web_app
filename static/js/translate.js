
const translations = {
    en: {
      "select-game": 'Select a game <br/>to <span class="accent-purple-text">receive</span> signals',
    },
    ru: {
      "select-game": 'Выберите игру, <br/>чтобы <span class="accent-purple-text">получить</span> сигналы',
    },
    es: {
      "select-game": 'Seleccione un juego <br/>para <span class="accent-purple-text">recibir</span> señales',
    }
  };


// Применяем переводы ко всем элементам
function applyTranslations() {
    const keyAttr = "i18n-key";
    const elements = document.querySelectorAll(`[${keyAttr}]`);
    
    elements.forEach(el => {
        const key = el.getAttribute(keyAttr);
        if (translations[LOCALE_CODE] && translations[LOCALE_CODE][key]) {
            el.innerHTML = translations[LOCALE_CODE][key];
        }
    });
    
    // Обновляем lang атрибут html
    document.documentElement.lang = LOCALE_CODE;
}  
document.addEventListener('DOMContentLoaded', applyTranslations);