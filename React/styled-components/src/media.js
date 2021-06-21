import styled, { css } from 'styled-components';

function media() {
  const sizes = {
    desktop: 1024,
    tablet: 768,
  };

  const media = Object.keys(sizes).reduce((acc, cur) => {
    acc[cur] = (...args) => css`
      @media (max-width: ${sizes[cur] / 16}em) {
        ${css(...args)}
      }
    `;
    return acc;
  }, {});
  return media;
}
