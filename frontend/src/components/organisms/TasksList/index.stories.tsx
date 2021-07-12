/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TasksList from '.';

export default {
  title: 'WebToDoApp/Organisms/TasksList',
  component: TasksList,
} as ComponentMeta<typeof TasksList>;

const Template: ComponentStory<typeof TasksList> = (args) => <TasksList {...args} />;

export const Default = Template.bind({});
Default.storyName = 'TasksList';
