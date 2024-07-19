import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './components/datePicker';

function App() {
  return (
    <div className="App">
      <DatePicker />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
