'use server'

import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser";

 export const handleSentMessageToChatGPT = async () => {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Generate 3 creative, interesting and not boring questions to start conversation. Show only questions, without numerating them."}],
            "temperature": 0.8,
            max_tokens: 200,
        }),
    });
    const data = await response.json();
    const realResponse = data?.choices[0]?.message?.content;
    console.log('realResponse>>>>', realResponse);

    return realResponse;
};
