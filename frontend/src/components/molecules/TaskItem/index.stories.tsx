/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TaskItem from '.';

export default {
  title: 'WebToDoApp/Molecules/TaskItem',
  component: TaskItem,
} as ComponentMeta<typeof TaskItem>;

const Template: ComponentStory<typeof TaskItem> = (args) => <TaskItem {...args} />;

export const Checked = Template.bind({});
Checked.storyName = 'TaskItem - Checked';
Checked.args = {
  id: 'link',
  title: '牛乳を買ってくる',
  description: 'メグミルク',
  isCompleted: true,
  priority: 0,
  completedStateHandler: async () => {},
};

export const UnChecked = Template.bind({});
UnChecked.storyName = 'TaskItem';
UnChecked.args = {
  id: 'link',
  title: '牛乳を買ってくる',
  description: 'メグミルク',
  isCompleted: false,
  priority: 0,
  completedStateHandler: async () => {},
};
