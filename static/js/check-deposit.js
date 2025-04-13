let depositLink;

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Проверяем подписку при загрузке страницы
document.querySelector(".check-deposit-get-signal").addEventListener("click", checkDeposit);


async function getDepositLink(localeCode = 'en') {
    try {
      const url = `${API_URL}/deposit-link?locale_code=${localeCode}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 1,  // Чтобы ngrok не показывал свою страницу, а давал результат
        }
      });  
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }  
      return data.result;
    } 
    catch (error) {
      console.error('Ошибка при получении ссылки:', error);
      throw error; // Перебрасываем ошибку для обработки в вызывающем коде
    }
  }
  
  // Пример использования с обработкой ошибок
  async function init() {
    try {    
      depositLink = await getDepositLink(LOCALE_CODE);
      console.log('Ссылка на депозит:', depositLink);

      if (!modal) {
        createModalElements();
      }
    } catch (error) {
      console.error('Финальная ошибка:', error.message);
      // Показать сообщение об ошибке пользователю
    }
  }
  

// Флаг для отслеживания подписки
let hasDeposit = false;

// Элементы модального окна
let modal, modalContent, modalSubscribeBtn;

async function checkDeposit(e) {
    // Если уже есть подписка, ничего не делаем
    if (hasDeposit) return;
    
    try {
        const url = `${API_URL}/check-deposit?sub1=${SUB1}`;
        console.log(url);

        const response = await fetch(url, {
            headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 1,  // Чтобы ngrok не показывал свою страницу, а давал результат
            }
        });  
        const data = await response.json();
        console.log(url);


        if (data.result) {
            hasDeposit = true;
        } else {
            showSubscribeModal();
        }
    } catch (error) {
        console.error('Ошибка при проверке депозита:', error);
        // В случае ошибки тоже показываем окно подписки
        showSubscribeModal();
    }
}

function showSubscribeModal() {
    // Создаем элементы модального окна, если их еще нет
    if (!modal) {
        createModalElements();
    }
    
    // Показываем модальное окно
    modal.style.display = 'flex';
}

function createModalElements() {
    // Создаем модальное окно
    modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.zIndex = '1000';
    // modal.style.display = 'none';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.flexDirection = 'column';
    
    // Создаем контент модального окна
    modalContent = document.createElement('div');
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';
    modalContent.style.justifyContent = 'space-around';
    modalContent.style.backgroundColor = '#1a1a2e';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.width = '80%';
    modalContent.style.minHeight = '40%';
    modalContent.style.maxWidth = '400px';
    modalContent.style.textAlign = 'center';
    modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';

    translations = {
        "error": {
            "ru": "Ошибка!",
            "en": "Error!",
            "es": "Error!",
            "pt": "Erro!",
        },
        "make_deposit": {
            "ru": "Для работы приложения с сигналами, Вам необходимо иметь минимум 10-20 USD на балансе в Вашей валюте аккаунта.  Пополните аккаунт в 1WIN и повторите попытку!",
            "en": "To use the application with signals, you need to have at least 10-20 USD in your account currency on your balance. Top up your account in 1WIN and try again!",
            "es": "Para usar la aplicación con señales, necesitas tener al menos entre 10 y 20 USD en tu cuenta. Recarga tu cuenta en 1WIN y vuelve a intentarlo.",
            "pt": "Para usar o aplicativo com sinais, você precisa ter pelo menos 10-20USD na moeda da sua conta no seu saldo. Recarregue sua conta no 1WIN e tente novamente",
        },
        "deposit_button": {
            "ru": "Сделать депозит",
            "en": "Make deposit",
            "es": "Hacer un depósito",
            "pt": "Faça um depósito",
        }
    }
    
    // Заголовок
    const title = document.createElement('h2');
    title.textContent = translations.error[LOCALE_CODE];
    title.style.color = '#ffffff';
    title.style.margin = '0';
    
    // Текст сообщения
    const message = document.createElement('p');
    message.textContent = translations.make_deposit[LOCALE_CODE];
    message.style.color = '#cccccc';
    message.style.textAlign = 'center';
    message.style.margin = '0';
    
    // Кнопка подписки
    modalSubscribeBtn = document.createElement('a');
    modalSubscribeBtn.setAttribute("href", depositLink);  // Вставляем ссылку на 1Win
    modalSubscribeBtn.textContent = translations["deposit_button"][LOCALE_CODE] + " ↗️";
    modalSubscribeBtn.style.backgroundColor = '#6e45e2';
    modalSubscribeBtn.style.color = 'white';
    modalSubscribeBtn.style.textDecoration = 'none';
    modalSubscribeBtn.style.border = 'none';
    modalSubscribeBtn.style.padding = '10px 30px';
    modalSubscribeBtn.style.borderRadius = '5px';
    modalSubscribeBtn.style.cursor = 'pointer';
    modalSubscribeBtn.style.fontSize = '16px';

    // Собираем модальное окно
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(modalSubscribeBtn);
    modal.appendChild(modalContent);
    
    // Добавляем модальное окно в DOM
    document.body.appendChild(modal);
}