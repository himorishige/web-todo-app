/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Layout from '.';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';

export default {
  title: 'WebToDoApp/Templates/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Layout';
Default.decorators = [(story) => <Provider store={store}>{story()}</Provider>];
