/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TrashIcon from '.';

export default {
  title: 'WebToDoApp/Atoms/TrashIcon',
  component: TrashIcon,
} as ComponentMeta<typeof TrashIcon>;

const Template: ComponentStory<typeof TrashIcon> = (args) => <TrashIcon {...args} />;

export const Default = Template.bind({});
Default.storyName = 'PriorityButton';
