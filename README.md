# Faith Copilot Chat Widget
Add a Christian AI chatbot to your website by loading a single file. The assistant responds with concise, Bible-backed answers and includes a customizable interface.

<br>

https://github.com/user-attachments/assets/5ee8a036-9bd1-42f2-87de-a14b142f54b6

<br>

## Installation
Add the `chat.js` file to your html by adding the following snippet in the `<head>` section of your page.

`<script src="chat.js"></script>`

Make sure that the value of the `src` attribute corresponds to the path of where the script is uploaded on your website.

<br>

## Setup
Configure these variables with your Faith Copilot Endpoint data.

- `FAITHCOPILOT_URL:` API endpoint for the chatbot.
- `FAITHCOPILOT_CHAT_PROFILE_ID:` Profile ID for conversations.
- `FAITHCOPILOT_TOKEN:` Token for API authentication.
- `SYSTEM_PROMPT:` Guides the assistant to respond in a Christian context with Bible verses.

<br>

## Custom Colors
Adjust the following variables to personalize the chatbot's look:

- `PRIMARY_COLOR`: Main UI color (e.g., buttons).
- `SECONDARY_COLOR`: Secondary UI elements (e.g., chat bubbles).
- `BACKGROUND_COLOR`: Chat window background.
- `ASSISTANT_TEXT_COLOR`: Color for the assistant’s text.
- `USER_TEXT_COLOR`: Color for user input.
- `BORDER_COLOR`: Border color of the chat window.

You can also add the dark mode version for each of these variables but it's optional.

<br>

## Dark Mode Compatibility
We added dark mode variables along with an example of how to switch to dark mode. Keep in mind that depending on your platform you might need to tweak the inline CSS code that appears in the `chat.js` file for it to work properly.

<br>

## RTL support
Switch `RTL=true` for automatic Right-to-Left language support.