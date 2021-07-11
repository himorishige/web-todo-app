import { Global } from '@emotion/react';
import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import 'sanitize.css';
import { globalStyle } from '../src/styles/globalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    // storySort: (a, b) =>
    //   a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    storySort: {
      order: ['components', ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages']],
    },
  },
};

export const decorators = [
  (StoryFn: Story) => (
    <BrowserRouter>
      <Global styles={globalStyle} />
      <StoryFn />
    </BrowserRouter>
  ),
];
