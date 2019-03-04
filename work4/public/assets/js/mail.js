function sendMail (e) {
  e.preventDefault();

  const data = {
    name: formMail.name.value,
    email: formMail.email.value,
    message: formMail.message.value
  };

  statusMail.innerHTML = 'Отсылка сообщения...';
  sendJson('/', data, 'POST', data => {
    statusMail.innerHTML = data.msg;
    // if (data.status === 'Error') {
    //   statusMail.innerHTML = 'Извините, при отсылке сообщения на сервер произошла ошибка.';
    // } else {
    //   statusMail.innerHTML = 'Ваше сообщение отправлено.';
    // }
  });
}

function sendJson (url, data, method, callback) {
  // eslint-disable-next-line no-undef
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    let result;
    try {
      result = JSON.parse(xhr.responseText);
      // console.log(result);
    } catch (err) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({ msg: 'Извините, при отсылке сообщения на сервер произошла ошибка.', status: 'Error' });
    }
    callback(result);
  };
  xhr.send(JSON.stringify(data));
}

const formMail = document.querySelector('#mail');
const statusMail = document.querySelector('#status_mail');
formMail.addEventListener('submit', sendMail);
