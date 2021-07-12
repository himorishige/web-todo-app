/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StarIcon from '.';

export default {
  title: 'WebToDoApp/Atoms/StarIcon',
  component: StarIcon,
} as ComponentMeta<typeof StarIcon>;

const Template: ComponentStory<typeof StarIcon> = (args) => <StarIcon {...args} />;

export const Default = Template.bind({});
Default.storyName = 'PriorityButton';
Default.args = {
  status: 0,
};
