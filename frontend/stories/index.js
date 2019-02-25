import React from 'react';
import { storiesOf } from '@storybook/react';
//import { Button } from '@storybook/react/demo';
import Button from '../components/styles/Button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('submit', () => (
    <Button type="submit">Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));
