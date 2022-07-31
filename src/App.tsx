import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';
import { ErrorBoundary } from './ui/ErrorBoundary';

import { Link } from './ui/Link';

const AppMenu = () => (
  <div className="flex items-center space-x-8 justify-center py-4 bg-blue-200 shadow-md">
    <Link to="/" text="authors" />
    <Link to="/books" text="books" />
    <Link to="/add" text="add book" />
  </div>
);

const PageLayout: React.FC = () => {
  return (
    <div className="flex m-10 justify-center">
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <div className="container mx-auto px-4 py-4 justify-center h-screen">
      <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route element={<PageLayout />}>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Authors />
                </ErrorBoundary>
              }
            />
            <Route
              path="/books"
              element={
                <ErrorBoundary>
                  <Books />
                </ErrorBoundary>
              }
            />
            <Route path="/add" element={<NewBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
