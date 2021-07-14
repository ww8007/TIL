import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from './icon.png';
import Home from './Home';
import About from './About';

const Container = styled.div`
  background-color: black;
  border: 1px solid blue;
`;

function fetchUsername() {
  const usernames = ['mike', 'june', 'jamie'];
  return new Promise((res) => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => res(username), 100);
  });
}

export default function App({ pages }) {
  const [page, setPage] = useState(pages);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);
  useEffect(() => {
    fetchUsername().then((data) => setUsername(data));
  });
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
      <PageComponent username={username} />
    </Container>
  );
}
