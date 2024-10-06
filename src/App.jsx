import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AddCharacterPage from './AddCharacterPage';

const App = () => {
  return (
    <Router>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-character" element={<AddCharacterPage />} />
        </Routes>
     
    </Router>
  );
};

export default App;
