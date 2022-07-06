import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';
import { Menu, MenuItem, MenuList } from './ui/Menu';
import { NavLink } from './ui/NavLink';

const AppMenu = () => (
  <Menu>
    <MenuItem>authors</MenuItem>
    <MenuItem>books</MenuItem>
    <MenuItem>add book</MenuItem>
  </Menu>
);

const App = () => {
  return (
    <BrowserRouter>
      <AppMenu />
      {/* <div> */}
      {/* <NavLink onClick={() => setPage('authors')}>authors</NavLink>
        <NavLink onClick={() => setPage('books')}>books</NavLink>
        <NavLink onClick={() => setPage('add')}>add book</NavLink> */}
      {/* </div> */}

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
