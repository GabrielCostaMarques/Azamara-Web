import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './page/home';
import ResultSearch from './page/search';

function App() {
  return (
      <Router>
          <Routes>
            <Route path='/'element={<Home/>}/>
            <Route path='/resultSearch' element={<ResultSearch/>}/>
          </Routes>
      </Router>
  )
}

export default App
