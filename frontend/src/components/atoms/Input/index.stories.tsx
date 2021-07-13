/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '.';

export default {
  title: 'WebToDoApp/Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  placeholder: 'タスクを入力してください',
  disabled: false,
  label: 'taskName',
  //@ts-ignore
  register: () => {},
};
