import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from './icon.png';
import Home from './Home';
import About from './About';

const Container = styled.div`
  background-color: black;
  border: 1px solid blue;
`;

export default function App({ pages }) {
  const [page, setPage] = useState(pages);
  useEffect(() => {
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage(newPage);
  }
  const PageComponent = page === 'home' ? Home : About;
  return (
    <Container>
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      <img src={Icon} />
      <PageComponent />
    </Container>
  );
}
