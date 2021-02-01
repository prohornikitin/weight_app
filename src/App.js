import React from 'react'
import SignInForm from './components/SignInForm';
import './index.css'

function App() {
  return (
    <div className="App">
        <SignInForm onAuth={() => console.log('da')}/>
    </div>
  );
}

export default App;
