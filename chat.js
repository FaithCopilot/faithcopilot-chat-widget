document.addEventListener('DOMContentLoaded',function(){
    FAITHCOPILOT_URL="";
    FAITHCOPILOT_CHAT_PROFILE_ID="";
    FAITHCOPILOT_TOKEN="";

    SYSTEM_PROMPT="You are a helpful assistant that always responds as a Christian in 3 or 4 sentences and then justifies all answers with a relevant Bible verse. Start each response with kindly acknowledging my next prompt in some way. End each response with helpful follow up question.";
    CHATBOT_TITLE="My Chatbot";
    DEFAULT_MESSAGE="Hello! How can I help you today?";
    INPUT_PLACEHOLDER="Type your message...";
    SEND_BUTTON_TEXT="Send";
    PRIMARY_COLOR="#007BFF";
    SECONDARY_COLOR="#F1F1F1";
    BACKGROUND_COLOR="#FFF";
    ASSISTANT_TEXT_COLOR="#000";
    USER_TEXT_COLOR="#FFF";
    BORDER_COLOR="#CCC";

    const css = `
    :root {
        --primary-color: ${PRIMARY_COLOR};
        --secondary-color: ${SECONDARY_COLOR};
        --background-color: ${BACKGROUND_COLOR};
        --assistant-text-color: ${ASSISTANT_TEXT_COLOR};
        --user-text-color: ${USER_TEXT_COLOR};
        --border-color: ${BORDER_COLOR};
    }

    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    #chatbot {
        position: fixed;
        bottom: 0;
        right: 20px;
        width: 300px;
        height: 400px;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        box-shadow: 0 0 10px var(--border-color);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease;
        transform: translateY(100%);
        z-index: 1001;
    }

    #close-button {
        cursor: pointer;
        padding: 5%;
        font-size: x-large;
    }

    #send-button {
        background: var(--primary-color);
        color: var(--user-text-color);
        cursor: pointer;
        padding: 10px;
        border: none;
    }

    .chatbot-header {
        background: var(--primary-color);
        color: var(--user-text-color);
        padding-inline: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chatbot-messages {
        padding: 10px;
        height: 300px;
        overflow-y: auto;
        flex-grow: 1;
        border-bottom: 1px solid var(--border-color);
    }

    .chatbot-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--secondary-color);
        padding: 10px;
        border-radius: 100px;
        cursor: pointer;
        z-index: 1000;
    }

    .chatbot-closed {
        display: flex;
        transform: translateY(100%);
    }

    .chatbot-open {
        display: flex;
        transform: translateY(0);
    }

    .message {
        margin: 5px 0;
        padding: 10px;
        border-radius: 5px;
        background: var(--secondary-color);
        color: var(--assistant-text-color);
    }

    .message.user {
        background-color: var(--primary-color);
        color: var(--user-text-color);
        text-align: right;
    }

    #user-input {
        border: none;
        padding: 5%;
        background-color: var(--background-color);
    }

    @media screen and (max-width: 768px) {
        #chatbot {
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
            border-radius: 0;
        }

        .chatbot-toggle {
            bottom: 1.5vh;
            right: 3vw;
            padding: 12px;
        }

        #chatbot-messages {
            height: calc(100vh - 120px);
        }

        #user-input {
            padding: 15px;
        }

        #send-button {
            padding: 15px;
            color: var(--user-text-color);
        }
    }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const chatbot = document.createElement('div');
    chatbot.id = 'chatbot';
    chatbot.classList.add('chatbot-closed');

    const chatbotHeader = document.createElement('div');
    chatbotHeader.classList.add('chatbot-header');
    const chatbotTitle = document.createElement('h3');
    chatbotTitle.textContent = CHATBOT_TITLE;
    const closeButton = document.createElement('span');
    closeButton.id = 'close-button';
    closeButton.innerHTML = '&times;';
    chatbotHeader.appendChild(chatbotTitle);
    chatbotHeader.appendChild(closeButton);

    const chatbotMessages = document.createElement('div');
    chatbotMessages.id = 'chatbot-messages';
    chatbotMessages.classList.add('chatbot-messages');

    const defaultMessage = document.createElement('div');
    defaultMessage.classList.add('message');
    defaultMessage.textContent = DEFAULT_MESSAGE;
    chatbotMessages.appendChild(defaultMessage);

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'user-input';
    userInput.placeholder = INPUT_PLACEHOLDER;

    const sendButton = document.createElement('button');
    sendButton.id = 'send-button';
    sendButton.textContent = SEND_BUTTON_TEXT;

    chatbot.appendChild(chatbotHeader);
    chatbot.appendChild(chatbotMessages);
    chatbot.appendChild(userInput);
    chatbot.appendChild(sendButton);

    const chatbotToggle = document.createElement('div');
    chatbotToggle.id = 'chatbot-toggle';
    chatbotToggle.classList.add('chatbot-toggle');

    chatbotToggle.innerHTML = `
        <svg width="2em" height="2em" viewBox="0 0 31.099 31.099" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="display: block;">
            <g>
                <path style="fill:${USER_TEXT_COLOR};" d="M28.87,1.714H2.229C1,1.714,0,2.714,0,3.944v18.704c0,1.23,1,2.23,2.229,2.23h7.394L9,27.328
                    c-0.054,0.237-0.218,0.961,0.235,1.526c0.192,0.242,0.564,0.531,1.234,0.531c0.297,0,0.644-0.051,1.137-0.17l18.139-4.501
                    l0.082-0.054c0.777-0.369,1.272-1.146,1.272-2.013V3.944C31.099,2.714,30.099,1.714,28.87,1.714z M29.099,22.647
                    c0,0.093-0.052,0.158-0.108,0.193l-17.859,4.432c-0.02,0.005-0.04,0.01-0.059,0.014l1.121-4.409H2.229
                    C2.104,22.877,2,22.775,2,22.647V3.944c0-0.127,0.104-0.23,0.229-0.23H28.87c0.126,0,0.229,0.103,0.229,0.23V22.647z
                    M25.473,13.149c0,1.319-1.069,2.388-2.388,2.388s-2.388-1.069-2.388-2.388s1.069-2.388,2.388-2.388S25.473,11.83,25.473,13.149z
                    M10.403,13.149c0,1.319-1.069,2.388-2.388,2.388s-2.388-1.069-2.388-2.388s1.069-2.388,2.388-2.388S10.403,11.83,10.403,13.149z
                    M17.938,13.149c0,1.319-1.069,2.388-2.388,2.388s-2.388-1.069-2.388-2.388s1.069-2.388,2.388-2.388S17.938,11.83,17.938,13.149z"/>
            </g>
        </svg>
    `;

    document.messageHistory = [{ role: 'system', content: SYSTEM_PROMPT}];
    document.body.appendChild(chatbot);
    document.body.appendChild(chatbotToggle);

    const messagesContainer = document.getElementById('chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('chatbot-open');
        chatbot.classList.toggle('chatbot-closed');

        if (chatbot.classList.contains('chatbot-open')) {
            chatbot.style.transform = 'translateY(0)';
            document.getElementById('user-input').focus();
        } else {
            chatbot.style.transform = 'translateY(100%)';
        }
    });

    closeButton.addEventListener('click', () => {
        chatbot.classList.remove('chatbot-open');
        chatbot.classList.add('chatbot-closed');
        chatbot.style.transform = 'translateY(100%)';
    });

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });


    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage('user', message);
            userInput.value = '';
            handleUserInput(message);
        }
    }


    function sanitizeInput(input) {
        return input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/\//g, "&#x2F;");
    }


    function handleUserInput(userMessage) {
        document.createNewMessage = true;
        userMessage = sanitizeInput(userMessage);
        document.messageHistory.push({ role: 'user', content: userMessage });

        if (userMessage.trim() !== '') {
            fetch(FAITHCOPILOT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${FAITHCOPILOT_TOKEN}`,
                },
                body: JSON.stringify({
                    model: FAITHCOPILOT_CHAT_PROFILE_ID,
                    temperature: 0.3,
                    messages: document.messageHistory,
                    stream: true,
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (!response.body) {
                    throw new Error("No response body to stream");
                }

                const reader = response.body.getReader();
                const textDecoder = new TextDecoder("utf-8");

                let accumulatedResponse = '';

                function readStream() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            var lastAssistantMessage = document.getElementById('chatbot-messages').lastChild.innerText;
                            document.messageHistory.push({ role: 'assistant', content: lastAssistantMessage });
                            return;
                        }

                        const chunk = textDecoder.decode(value, { stream: true });
                        accumulatedResponse += chunk;

                        processChunk(chunk);

                        readStream();
                    }).catch(error => {
                        console.error('Error reading the stream:', error);
                        appendMessage('assistant', 'An error occurred while streaming the response.');
                    });
                }

                function processChunk(chunk) {
                    try {
                        const lines = chunk.split('\n');
                        for (const line of lines) {
                            if (line.startsWith('data:')) {
                                const jsonString = line.replace(/^data: /, '').trim();
                                if (jsonString !== '[DONE]') {
                                    const jsonChunk = JSON.parse(jsonString);

                                    if (jsonChunk && jsonChunk.choices && jsonChunk.choices[0] && jsonChunk.choices[0].delta && jsonChunk.choices[0].delta.content) {
                                        const text = jsonChunk.choices[0].delta.content;

                                        if ( document.createNewMessage === true ) {
                                            appendMessage('assistant', text);
                                            document.createNewMessage = false;
                                        } else {
                                            scrollToBottomOfMessage();
                                            document.getElementById('chatbot-messages').lastChild.innerText += text;
                                        }
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Error parsing JSON chunk:", e);
                    }
                }
                readStream();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
    }


    function scrollToBottomOfMessage() {
        const div = document.getElementById('chatbot-messages');
        div.scrollTop = div.scrollHeight;
    }


    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
