/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Page404 from '.';

export default {
  title: 'WebToDoApp/Pages/Page404',
  component: Page404,
} as ComponentMeta<typeof Page404>;

const Template: ComponentStory<typeof Page404> = (args) => <Page404 {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
