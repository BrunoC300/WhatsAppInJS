// chat history data
const chats = [
  {
    id: 1,
    profile_pic: "https://placeimg.com/640/480/people",
    name: "Augusto Costa",
    message: "Ok",
    date: "11:33",
    status: 2,
  },
  {
    id: 2,
    profile_pic: "https://placeimg.com/640/480/people",
    name: "David Quinta",
    message: "Posso",
    date: "yesterday",
    status: 3,
  },
  {
    id: 3,
    profile_pic: "https://placeimg.com/640/480/people",
    name: "Cláudio Lins",
    message: "Nuno, quando puder liga-me sff, estou a...",
    date: "yesterday",
    status: 0,
  },
];

// see profile
// refresh content
// new chat
// options

// search chat w/ arrow function
document.querySelector("[js-history-input]").addEventListener("keyup", (event) => {
  const label = event.target.value;
  
  filterChats(label.toLowerCase());
});

/* // search chat w/out arrow function
document.querySelector("[js-history-input]").addEventListener("keyup", function(event) {
  console.log(event.target.value);
  //or
  console.log(this.value);
}); */

// loops
// for
// for in
// for of
// while
// do while
// forEach
// map
// filter

function filterChats(value) {
  chats.map( (chat, index) => {
    if( chat.name.toLowerCase().includes(value) || chat.message.toLowerCase().includes(value) ) {
      document.querySelectorAll('.history-chat')[index].classList.remove('hide');
    } else {
      document.querySelectorAll('.history-chat')[index].classList.add('hide');
    }
  });

  // fetch api - messages
}

// create chat template
function createHistoryChat(info) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("history-chat");

  const divProfile = document.createElement("div");
  divProfile.classList.add("history-chat__profile");

  const pic = document.createElement("img");
  pic.classList.add("history-chat__pic", "avatar");
  pic.setAttribute("src", "https://placeimg.com/640/480/people");
  pic.setAttribute("alt", info.name);

  const divInfo = document.createElement("div");
  divInfo.classList.add("history-chat__info");

  const pName = document.createElement("p");
  pName.classList.add("history-chat__name");
  pName.textContent = info.name;

  const pMessage = document.createElement("p");
  pMessage.classList.add("history-chat__message");
  pMessage.textContent = info.message;

  const divDate = document.createElement("div");
  divDate.classList.add("history-chat__date");
  divDate.textContent = info.date;

  divInfo.appendChild(pName);
  divInfo.appendChild(pMessage);

  divProfile.appendChild(pic);
  divProfile.appendChild(divInfo);
  divProfile.appendChild(divDate);

  divContainer.appendChild(divProfile);

  const chatsContainer = document.querySelector(".history__talks");
  chatsContainer.appendChild(divContainer);
}

// loop to create
for (let item of chats) {
  createHistoryChat(item);
}