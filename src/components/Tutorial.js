import React, {useEffect, useState} from 'react';
import { useFrontContext } from '../providers/frontContext';

function Tutorial() {
  const context = useFrontContext();
  const [userStats, setUserStats] = useState({});
  const [latestMessageId, setLatestMessageId] = useState();

  const user = (context.teammate && context.teammate.name) ? context.teammate.name : 'world';
  const recipient = (context.conversation && context.conversation.recipient && context.conversation.recipient.name) ? context.conversation.recipient.name : 'there';

  // Watches the context and selected the latest message id from the available messages.
  useEffect(() => {
    context.listMessages()
      .then(response => {
        if (response.results.length > 0) {
          const latestMessageIndex = response.results.length - 1;
          setLatestMessageId(response.results[latestMessageIndex].id)
        }
      });
  }, [context]);

  useEffect(() => {
    // Pseudo-code for fetching data from an external API or database
    setUserStats(
      {
        'score': 4.8,
        'maxScore': 5,
      }
    );
  }, []);

  const onCreateDraftClick = () => {
    if (!latestMessageId)
      return;

    context.createDraft({
      content: {
        body: `Hello ${recipient}!`,
        type: 'text'
      },
      replyOptions: {
        type: 'replyAll',
        originalMessageId: latestMessageId
      }
    })
  };  

  return (
    <div className="App">
      <p>Hello {user}!</p>
      <p>Your score is <b>{userStats.score}</b> out of <b>{userStats.maxScore}</b>. Well done!</p>
      {latestMessageId && <button onClick={onCreateDraftClick}>Reply</button>}
    </div>
  );
}

export default Tutorial;
