import React, { useEffect, useState} from 'react';
import API, { graphqlOperation } from '@aws-amplify/api'
import * as subscriptions from './graphql/subscriptions'
import * as mutations from './graphql/mutations'
import './App.css';

import awsconfig from './aws-exports';

API.configure(awsconfig)


const Counter = (props) => {

  const [value, setValue] = useState(0)

  useEffect(() => {
    let subscription

    async function setupSubscription() {
      subscription = API.graphql({
          query: subscriptions.counterChange,
          variables: { name: props.name },
          authMode: 'API_KEY',
        }).subscribe({
        next: (data) => {
          console.log('Got subscription data', data)
          const counterChange = data.value.data.counterChange
          setValue(counterChange.value)
        }
      })
    }

    setupSubscription()

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.name])  

  const sendUpdate = async (e) => {
    await API.graphql(graphqlOperation(mutations.setCounter, { name: props.name, value: e.target.value }))
  }

  return (
      <input type="number" value={value} onChange={sendUpdate} />
  )
}



function App() {

  return (
    <div className="App">
      <h1>Multiplayer Counter Demo</h1>

      <p>Open me on multiple browsers, then change a counter in one browser and watch the same one update on all the other browsers.</p>

      <div>
        Counter 1: <Counter name="Counter1" />
      </div>

      <div>
        Counter 2: <Counter name="Counter2" />
      </div>
    </div>
  );
}

export default App;
