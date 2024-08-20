document.getElementById("sendButton").addEventListener("click", () => {
  const userInput = document.getElementById("userInput").value;
  if (userInput) {
    addMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        simulateTyping(data.reply, "bot");
      });
  }
});

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.innerText = text;

  messageDiv.appendChild(textDiv);
  document.getElementById("messages").appendChild(messageDiv);

  document.getElementById("messages").scrollTop =
    document.getElementById("messages").scrollHeight;
}

function simulateTyping(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  messageDiv.appendChild(textDiv);
  document.getElementById("messages").appendChild(messageDiv);

  let index = 0;

  function type() {
    if (index < text.length) {
      textDiv.innerHTML +=
        text.charAt(index) === " " ? "&nbsp;" : text.charAt(index);
      index++;
      setTimeout(type, 50); // Velocidade de digitação, 50ms entre cada letra
    } else {
      document.getElementById("messages").scrollTop =
        document.getElementById("messages").scrollHeight;
    }
  }

  type();
}
