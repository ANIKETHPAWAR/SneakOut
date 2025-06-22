import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
