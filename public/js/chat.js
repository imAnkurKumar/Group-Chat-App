document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: token };

  if (!token) {
    alert("You must be logged in to access the chat");
    window.location.href = "/login.html";
    return;
  }

  const userList = document.getElementById("user-list");
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/user/allUsers", { headers });
      const users = response.data.users;
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.name;
        userList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/user/messages", { headers });
      const messages = response.data.messages;
      chatMessages.innerHTML = "";
      messages.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "message";
        div.textContent = `${msg.name}: ${msg.content}`;
        chatMessages.appendChild(div);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Error fetching messages");
    }
  };

  const sendMessage = async () => {
    const content = messageInput.value;
    if (content.trim() === "") return;

    try {
      await axios.post("/user/messages", { content }, { headers });
      messageInput.value = "";
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message");
    }
  };

  sendBtn.addEventListener("click", sendMessage);
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  });

  fetchUsers();
  fetchMessages();

  setInterval(fetchMessages, 1000);
});
