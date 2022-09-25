import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { LoginPage, ProtectedPage, useAuth } from './auth';
import { LoginForm } from './components/LoginForm';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';
import { RecommendBooks } from './pages/Recommend';
import { ErrorBoundary } from './ui/ErrorBoundary';

import { Link } from './ui/Link';

const ROUTES = {
  authors: '/',
  books: '/books',
  add: '/add',
  recommend: '/recommend',
  login: '/login',
};

const AppMenu = () => {
  const { token, logout } = useAuth();
  return (
    <div className="flex items-center space-x-8 justify-center py-4 bg-blue-200 shadow-md">
      <Link to={ROUTES.authors} text="authors" data-testid="authors-menu-item" />
      <Link to={ROUTES.books} text="books" data-testid="books-menu-item" />
      {token && <Link to={ROUTES.add} text="add book" data-testid="add-book-menu-item" />}
      {!token && <Link to={ROUTES.login} text="login" data-testid="login-menu-item" />}
      {token && <Link to={ROUTES.recommend} text="recommend" data-testid="logout-menu-item" />}
      {token && (
        <Link to={ROUTES.authors} text="logout" onClick={logout} data-testid="logout-menu-item" />
      )}
    </div>
  );
};

const PageLayout: React.FC = () => {
  return (
    <div className="flex m-10 justify-center items-center">
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <div className="container mx-auto px-4 py-4 grid h-screen grid-rows-[80px_1fr]">
      <BrowserRouter>
        <AppMenu />
        <Routes>
          <Route element={<PageLayout />}>
            <Route
              path={ROUTES.authors}
              element={
                <ErrorBoundary>
                  <Authors />
                </ErrorBoundary>
              }
            />
            <Route
              path={ROUTES.books}
              element={
                <ErrorBoundary>
                  <Books />
                </ErrorBoundary>
              }
            />

            <Route
              path={ROUTES.add}
              element={
                <ProtectedPage>
                  <NewBook />
                </ProtectedPage>
              }
            />

            <Route
              path={ROUTES.recommend}
              element={
                <ProtectedPage>
                  <RecommendBooks />
                </ProtectedPage>
              }
            />

            <Route
              path={ROUTES.login}
              element={
                <LoginPage>
                  <LoginForm />
                </LoginPage>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
