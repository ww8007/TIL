import React, { memo } from 'react';

const Banner = memo(({ text, isAlert }) => (
  <>
    {text && (
      <p className={`banner ${isAlert ? 'banner-red' : 'banner-green'}`}>
        {text}
      </p>
    )}
  </>
));
export default Banner;
