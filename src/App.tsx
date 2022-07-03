import { useState } from 'react';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
