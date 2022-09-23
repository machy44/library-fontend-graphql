import React, { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth';
import { LoginForm } from './components/LoginForm';
import Authors from './pages/Authors';
import Books from './pages/Books';
import NewBook from './pages/NewBook';
import { ErrorBoundary } from './ui/ErrorBoundary';

import { Link } from './ui/Link';

const AppMenu = () => {
  const { token, logout } = useAuth();
  return (
    <div className="flex items-center space-x-8 justify-center py-4 bg-blue-200 shadow-md">
      <Link to="/" text="authors" data-testid="authors-menu-item" />
      <Link to="/books" text="books" data-testid="books-menu-item" />
      {token && <Link to="/add" text="add book" data-testid="add-book-menu-item" />}
      {!token && <Link to="/login" text="login" data-testid="login-menu-item" />}
      {token && <Link to="/" text="logout" onClick={logout} data-testid="logout-menu-item" />}
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
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
