import { Global } from '@emotion/react';
import { Story } from '@storybook/react';
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
};

export const decorators = [
  (StoryFn: Story) => (
    <>
      <Global styles={globalStyle} />
      <StoryFn />
    </>
  ),
];
