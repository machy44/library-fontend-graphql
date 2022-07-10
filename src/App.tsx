import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';

import { Link } from './ui/Link';

const AppMenu = () => (
  <div className="flex items-center space-x-8">
    <Link to="/" text="authors" />
    <Link to="/books" text="books" />
    <Link to="/add" text="add book" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <AppMenu />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
