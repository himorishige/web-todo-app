/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TaskItem from '.';

export default {
  title: 'WebToDoApp/Molecules/TaskItem',
  component: TaskItem,
} as ComponentMeta<typeof TaskItem>;

const Template: ComponentStory<typeof TaskItem> = (args) => <TaskItem {...args} />;

export const Default = Template.bind({});
Default.storyName = 'TaskItem';
