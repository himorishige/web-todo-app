/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '.';

export default {
  title: 'WebToDoApp/Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Primary';
Primary.args = {
  placeholder: 'タスクを入力してください',
  disabled: false,
};