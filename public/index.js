
// const myUsername = prompt("Please enter your name") || "Anonymous";
const myUsername  = "Anomoly";
const socket = new WebSocket(
  `ws://localhost:8080/start_web_socket?username=${myUsername}`
);

socket.onmessage = (m) => {
  const data = JSON.parse(m.data);

  switch (data.event) {
    case "update-users":
      // refresh displayed user list
      let userListHtml = "";
      for (const username of data.usernames) {
        userListHtml += `<div> ${username} </div>`;
      }
      document.getElementById("users").innerHTML = userListHtml;
      break;

    case "send-message":
      // display new chat message
      addMessage(data.username, data.message);
      break;
    
      case "send-personal-message":
      // display new chat message
      addMessage(data.username, data.message , "Personal");
      break;

  }
};

function addMessage(username, message , type = "Public") {
  // displays new message
  if(type === "Public"){
    document.getElementById(
      "conversation"
    ).innerHTML += `<b> ${username} </b>: ${message} <br/>`;
  } else{
    document.getElementById(
      "conversation"
    ).innerHTML += `<b> ${username} </b>: ${message}  <b> Personal </b><br/>`;
  
  }
}

// on page load
window.onload = () => {
  // when the client hits the ENTER key
  document.getElementById("data").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById("data");
      var message = inputElement.value;
      var to = "Piyush";
      inputElement.value = "";
      socket.send(
        JSON.stringify({
          event: "send-personal-message",
          message: message,
          to: to,
        })
      );
    }
  });
};
