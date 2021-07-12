import React, { useEffect, useState } from 'react';
import About from './About';
import Home from './Home';

export default function App() {
  const [page, setPage] = useState(page);
  useEffect(() => {
    //  -1-
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);
  //  -2-
  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`); //  -3-
    setPage(newPage);
  }
  const PageComponent = page === 'home' ? Home : About; // -4-
  return (
    <div className="container">
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      <PageComponent />
    </div>
  );
}
