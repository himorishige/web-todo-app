/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HomeIcon from '.';

export default {
  title: 'WebToDoApp/Atoms/HomeIcon',
  component: HomeIcon,
} as ComponentMeta<typeof HomeIcon>;

const Template: ComponentStory<typeof HomeIcon> = (args) => <HomeIcon {...args} />;

export const Default = Template.bind({});
Default.storyName = 'PriorityButton';
