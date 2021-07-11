/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Skelton from '.';

export default {
  title: 'WebToDoApp/Atoms/Skelton',
  component: Skelton,
} as ComponentMeta<typeof Skelton>;

const Template: ComponentStory<typeof Skelton> = (args) => <Skelton {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Skelton';
Default.args = {
  width: '100%',
  height: '1.5rem',
  radius: '0',
};
