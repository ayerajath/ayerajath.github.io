import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Pages from './Pages.jsx';
import posthog from 'posthog-js';

function App() {
  useEffect(() => {
    posthog.capture('random_event', { foo: 'bar', time: Date.now() });
  }, []);

  return (
    <Router>
      <Pages />
    </Router>
  );
}

export default App;
