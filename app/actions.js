'use server'

  const questionVariantSelector = () => {
    const variants = [
      "Produce 3 questions that aim to reveal someone's hidden talents or most unusual experiences. These questions should be crafted in a way that encourages sharing of stories not commonly discussed in typical conversations. Show only questions, without numerating them.",
      "Generate 3 creative, interesting and not boring questions to start conversation. Show only questions, without numerating them.",
      "Generate 3 creative questions to start a conversation that a person could ask a new acquaintance at a community art event. The questions should be unique, engaging, and relevant to the setting. Show only questions, without numerating them.",
      "Craft 3 imaginative questions that invite someone to share their dreams about future adventures or projects. Ensure the questions are thought-provoking, inspiring detailed and aspirational answers. Show only questions, without numerating them.",
        "Create 3 questions that are designed to help someone reflect on their past experiences and how they have shaped their life. The questions should be open-ended and encourage deep, meaningful conversations. Show only questions, without numerating them.",
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  
  }

 export const handleSentMessageToChatGPT = async () => {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            // "messages": [{"role": "user", "content": "Generate 3 creative, interesting and not boring questions to start conversation. Show only questions, without numerating them."}],
            "messages": [{"role": "user", "content": questionVariantSelector()}],
            "temperature": 0.8,
            max_tokens: 200,
        }),
    });
    const data = await response.json();
    const realResponse = data?.choices[0]?.message?.content;
    console.log('realResponse>>>>', realResponse);

    return realResponse;
};
