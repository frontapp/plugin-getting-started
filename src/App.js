import './App.css';


function App({context}) {

let user = context.teammate.name;
let recipient = context.conversation.recipient.name;
const messageId = context.conversation.id;
console.log(context.conversation);
const draft =  {
  content: {
    body: `Hello ${recipient}!`,
    type: 'text'
  },
  replyOptions: {
    type: 'replyAll',
    originalMessageId: 'msg_pu9vr0t'
}
};

  return (
    <div className="App">
      <p>Hello {user}!</p>
      <button onClick={() => context.createDraft(draft)}>Reply</button>
    </div>
  );
}

export default App;
