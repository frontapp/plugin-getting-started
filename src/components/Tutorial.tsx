import React, {useEffect, useState} from 'react';
import { useFrontContext } from '../providers/frontContext';
import {Paragraph, Heading, Button} from '@frontapp/ui-kit';
import { ApplicationMessageId, SingleConversationContext } from '@frontapp/plugin-sdk';


function Tutorial() {
  const context = useFrontContext() as SingleConversationContext;
  const [companyStats, setCompanyStats] = useState({company: '', accountNumber: 0, activeOrder: 0, status: '', deliveryDate: ''});
  const [latestMessageId, setLatestMessageId] = useState<ApplicationMessageId>();

  const user = (context.teammate && context.teammate.name) ? context.teammate.name : 'world';
  const recipient = (context.conversation && context.conversation.recipient && context.conversation.recipient.name) ? context.conversation.recipient.name : 'there';

  // Watches the context and selected the latest message id from the available messages.
  useEffect(() => {
    context.listMessages()
      .then(response => {
        if (response.results.length > 0) {
          const latestMessageIndex = response.results.length - 1;
          setLatestMessageId(response.results[latestMessageIndex].id)
        } else {
          setLatestMessageId(undefined);
        }
      });
  }, [context]);

  useEffect(() => {
    // Pseudo-code for fetching data from an external API or database
    setCompanyStats(
      {
        'company': 'Blue Rose Labs',
        'accountNumber': 54968483,
        'activeOrder': 8347,
        'status': 'Shipped',
        'deliveryDate': 'March 31st'
      }
    );
  }, []);

  const onCreateDraftClick = () => {
    if (!latestMessageId)
      return;

    context.createDraft({
      content: {
        body: `Hello ${recipient}! Order ${companyStats.activeOrder} is ${companyStats.status} and expected to arrive on ${companyStats.deliveryDate}.`,
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
      <Paragraph>Hello {user}!</Paragraph>
      <h4>Contact details:</h4>
      <table>
        <tbody>
          <tr>
            <td><Heading>Company</Heading></td>
            <td>{companyStats.company}</td>
          </tr>
          <tr>
            <td><Heading>Account number</Heading></td>
            <td>{companyStats.accountNumber}</td>
          </tr>
          <tr>
            <td><Heading>Active order</Heading></td>
            <td><a href="https://example.com">{companyStats.activeOrder}</a></td>
          </tr>
        </tbody>
      </table>
      {latestMessageId && <Button onClick={onCreateDraftClick}>Reply</Button>}
    </div>
  );
}

export default Tutorial;
