const patterns = ['?', 'ajuda', 'help'];
let botTimeout = null;

// list chat history
// status
// 0 - null - clock
// 1 - sending - 1 visto cinza
// 2 - delivered - 2 vistos cinza
// 3 - read - 2 vistos azuis
// 4 - error - clock

const onSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector('.chat__input');
  const message = input.value;

  input.value = '';

  postMessage(message);
  botMessage(message);
}

const botMessage = (text) => {
  // for each pattern
  /* not needed
  let match = false;
  for(keyword of patterns) {
    match = text.includes(keyword);
    match = text.indexOf(keyword)
    if(match ) {
      break;
    }
  }*/

  const match = patterns.includes(text.toLowerCase());
  // 1. css fix overflow of parent and create scroll
  // 2. on post send scroll to bottom
  // 3. clear timeout to prevent multiple bot messages

  if(match) {
    // update user messages state
    const messages = document.querySelectorAll('.chat-message--user');
    for( msg of messages) {
      msg.setAttribute('status', 'read');
    }

    // random timeout to write answer
    const randomTime = Math.floor(Math.random() * 5000) + 1000;
    const randomPost = Math.floor(Math.random() * 100) + 1;

    if(botTimeout) {
      clearTimeout(botTimeout);
    }
    botTimeout = setTimeout(() => {
      // bot message
      //postMessage(text, true);
      //fetch('https://jsonplaceholder.typicode.com/posts/' + randomPost)
      fetch(`https://jsonplaceholder.typicode.com/posts/${randomPost}`)
        .then(response => response.json())
        .then(json => {
          postMessage(json.body, true);
        });

    }, randomTime);
  } 

  
}

const postMessage = (text, isBot) => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('chat-message');

  if(isBot) {
    divContainer.classList.add('chat-message--bot');
  } else {
    divContainer.classList.add('chat-message--user');
    divContainer.setAttribute('status', 'sending');
  }

  // ternary condition
  //divContainer.classList.add( (isBot) ? 'chat-message--bot' : 'chat-message--user');

  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if(hours < 10) {
    hours = '0' + hours;
  }

  if(minutes < 10) {
    minutes = '0' + minutes;
  }

  //divContainer.innerHTML = '<p class="chat-message__text">' + text + '</p><span class="chat-message__date">' + hours + ':' + minutes + '</span>';
  if(isBot) {
    divContainer.innerHTML = `<p class="chat-message__text">${text}</p>
<div class="chat-message__info">
  <span class="chat-message__date">${hours}:${minutes}</span>
</div>`;
  } else {
    divContainer.innerHTML = `<p class="chat-message__text">${text}</p>
<div class="chat-message__info">
  <span class="chat-message__date">${hours}:${minutes}</span>
  <div class="chat-message__icons">
    
  </div>
</div>`;

    setTimeout(() => {
      const messages = document.querySelectorAll('.chat-message--user[status="sending"]');
      for(message of messages) {
        message.setAttribute('status', 'delivered');
      }
    }, 500);
  }

  const messagesParent = document.querySelector('.chat__messages');
  messagesParent.appendChild(divContainer);
}

document.querySelector('.chat__form').addEventListener('submit', onSubmit);