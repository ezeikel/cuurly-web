import { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import GlobalStyle from '../GlobalStyle';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

const withGlobal = cb => (
  <Fragment>
    <GlobalStyle />
    {cb()}
  </Fragment>
);

addDecorator(withGlobal);
configure(loadStories, module);
