import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/styles/Button';
import H1 from '../components/styles/H1';

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('type submit', () => (
    <Button type="submit">Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));

storiesOf('H1', module)
  .add('with text', () => (
    <H1>Hello Button</H1>
  ));
