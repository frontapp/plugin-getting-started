import './App.css';
import Tutorial from './components/Tutorial';


function App({context}) {

  switch(context.type) {
    case 'noConversation':
      return (
        <div className="App">
          <p>No conversation selected. Select a conversation to use this plugin.</p>
        </div>
      );
      break;
    case 'singleConversation':
      return (
        <div className="App">
          <Tutorial context={context} />
        </div>
      );
      break;
    case 'multiConversations':
      return (
        <div className="App">
          <p>Multiple conversations selected. Select only one conversation to use this plugin.</p>
        </div>
      );
      break;
    default:
      console.error(`Unsupported context type: ${context.type}`);
      break;
  };
}

export default App;
