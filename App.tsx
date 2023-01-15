import * as React from 'react';
import './style.css';
import { useState } from 'react';

export default function App() {
  const [generatedText, setGeneratedText] = useState('');

  const handleClick = async () => {
    const apiKey = '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';
    const prompt =
      'Give me a react component which returns a h1 with text haha';

    const eventSource = new EventSource(
      `https://api.openai.com/v1/engines/davinci/completions/stream?prompt=${prompt}&api_key=${apiKey}`
    );
    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      }
    );
    console.log(await eventSource);
    const json = await response.json();
    setGeneratedText(json.choices[0].text);
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Text</button>
      <p>{generatedText}</p>
    </div>
  );
}
