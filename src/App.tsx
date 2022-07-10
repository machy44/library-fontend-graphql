import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';

import { Link } from './ui/Link';

const AppMenu = () => (
  <div className="flex items-center space-x-8 justify-center py-4">
    <Link to="/" text="authors" />
    <Link to="/books" text="books" />
    <Link to="/add" text="add book" />
  </div>
);

const App = () => {
  return (
    <div className="container mx-auto px-4 py-4 justify-center">
      <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
