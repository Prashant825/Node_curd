import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './CurdUser/addUser';
import UserLogin from './CurdUser/userLogin';
import ShowAlluser from './CurdUser/showAlluser';

import Header from './CurdUser/header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<UserLogin />} />
          <Route path='/register' element={<AddUser />} />
          <Route path='/showuser' element={<ShowAlluser />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
