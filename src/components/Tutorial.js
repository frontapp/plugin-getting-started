import React, {useEffect, useState} from 'react';

function Tutorial({context}) {

  const [userStats, setUserStats] = useState({});
  const [displayButton, setDisplayButton] = useState(false);
  const user = (context.teammate && context.teammate.name) ? context.teammate.name : 'world';
  const recipient = (context.conversation && context.conversation.recipient && context.conversation.recipient.name) ? context.conversation.recipient.name : 'there';
  let draft = {};

  useEffect(() => {
    context.listMessages()
      .then(response => {
        const latestMessageIndex = (response.results.length > 0) ? response.results.length - 1 : -1;
        if (latestMessageIndex >= 0) {
          setDisplayButton(true);
          draft =  {
            content: {
              body: `Hello ${recipient}!`,
              type: 'text'
            },
            replyOptions: {
              type: 'replyAll',
              originalMessageId: response.results[latestMessageIndex].id
            }
          };
        } else setDisplayButton(false);
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
  

  return (
    <div className="App">
      <p>Hello {user}!</p>
      <p>Your score is <b>{userStats.score}</b> out of <b>{userStats.maxScore}</b>. Well done!</p>
      {displayButton && <button onClick={() => context.createDraft(draft)}>Reply</button>}
    </div>
  );
}

export default Tutorial;
