'use client'

import { Box, Button, VStack, Text, Heading, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { handleSentMessageToChatGPT } from './actions';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Placeholder function for generating questions
  // This will be replaced with the actual server action call
  const generateQuestions = async () => {
    setLoading(true);

    try {
      const response = await handleSentMessageToChatGPT();

      const exampleQuestions = response ? response.split('?').filter(itm => itm.length) : [
        "What's something you've always wanted to learn but haven't gotten around to?",
        "What's a book or movie that profoundly changed you?",
        "What's a hobby you recently discovered or got into?"
      ];
      setQuestions(exampleQuestions);
    } catch (error) {
      console.error("Failed to fetch questions.", error);
      setQuestions(["Sorry, we couldn't generate questions at the moment. Please try again."]);
    } finally {
      setLoading(false);
    }
    
  };

  // const generateQuestions = async () => {
  //   // Call the API route
  //   const res = await fetch('/api/generateQuestions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  
  //   if (res.ok) {
  //     const { questions } = await res.json();
  //     setQuestions(questions);
  //   } else {
  //     // Handle error response
  //     console.error("Failed to fetch questions.");
  //     setQuestions(["Sorry, we couldn't generate questions at the moment. Please try again."]);
  //   }
  // };

  return (
    <Container centerContent p={4} maxW="container.sm">
      <VStack spacing={8} width="100%" pt={4}>
        <Box width="100%" p={4} borderRadius="lg">
          {questions.length > 0 ? (
            <ol style={{marginTop: "120px"}}>
              {questions.map((question, index) => (
                <li key={index}>
                  <Text color="gray.400" fontWeight={600} size={20} mb={8}>
                    {index + 1}.{" "}
                    {question}?
                    </Text>
                </li>
              ))}
            </ol>
          ) : (
            <Heading color="gray.500" mt={200}>
              Click the button below to generate questions
            </Heading>
          )}
        </Box>
        <Container
          centerContent
          mb={4}
          position="fixed"
          bottom="0"
        >
          {/* {loading ? (
            <Button colorScheme="cyan" isLoading>
          )} */}
          <Button
            colorScheme="teal"
            onClick={generateQuestions}
            isLoading={loading}
            loadingText="Generating..."
            
          >
            Generate Questions
          </Button>
        </Container>
      </VStack>
    </Container>
  );
}
