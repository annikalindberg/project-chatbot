document.addEventListener('DOMContentLoaded', function () {
  const chat = document.getElementById('chat'); // Get the chat container element.
  const userInput = document.getElementById('user-input'); // Get the user input field.
  /* const buttonForm = document.getElementById('buttonForm'); */ // Get the button form.
  let userName = ''; // Initialize the user's name variable.

  // Function to display a message in the chat. Takes the message and the sender as input. 
  const showMessage = (message, sender) => {
    // Create a new message element. If the sender is the user, assign the user-msg class. Otherwise, assign the bot-msg class.
    const messageElement = document.createElement('section');
    messageElement.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');

    
    const bubble = document.createElement('div');
    bubble.innerHTML = `<p>${message}</p>`;
    console.log('this is bubble', bubble);
    bubble.classList.add(sender === 'user' ? 'user-bubble' : 'bot-bubble');

 


    // Create an image element for the sender.
    const senderImage = document.createElement('img');
    senderImage.src = sender === 'user' ? 'assets/user.png' : 'assets/bot.png'; 
    senderImage.alt = sender === 'user' ? 'User' : 'Bot'; 



    // Append the bubble and sender image to the message element add the message element to the chat. If the sender is the user, append the sender image first. Otherwise, append the bubble first. 
    if (sender === 'bot') {
      messageElement.appendChild(senderImage);
      messageElement.appendChild(bubble);
    } else {
      messageElement.appendChild(bubble);
      messageElement.appendChild(senderImage);
    }

    // Append the message element to the chat.
    chat.appendChild(messageElement);

    // Scroll to the last message.
    chat.scrollTop = chat.scrollHeight;
  };


  // Define an array of questions and their corresponding bot responses.
  const conversation = [
    {
      question: "Hello there, What's your name?",
      response: (name) => `Nice to meet you, ${name}!`,
    },
    {
      question: "What's your favorite color?",
      response: (color) => `I like ${color} too! It's a fantastic color!`,
    },
    // Add more questions and responses as needed.
  ];

  let currentQuestionIndex = 0;

  // Function to ask the next question in the conversation.
  const askNextQuestion = () => {
    const currentConversation = conversation[currentQuestionIndex];

    if (currentConversation) {
      showMessage(currentConversation.question, 'bot');
      document.getElementById('send').addEventListener('click', function responseHandler(event) {
        event.preventDefault();
        const userResponse = userInput.value;
        showMessage(userResponse, 'user');
        userInput.value = ''; // Clear the input field.

        // Call the bot's response function and display it.
        const botResponse = currentConversation.response(userResponse);
        showMessage(botResponse, 'bot');

        // Remove the event listener to prevent multiple clicks.
        document.getElementById('send').removeEventListener('click', responseHandler);

        // Move to the next question in the conversation.
        currentQuestionIndex++;

        // Ask the next question after a delay.
        setTimeout(askNextQuestion, 1000);
      });
    } else {
      // Conversation is complete. You can handle this as needed.
      showMessage('That concludes our conversation. Thank you!', 'bot');
    }
  };

  // Initial greeting to the user.
  setTimeout(askNextQuestion, 1000);
});