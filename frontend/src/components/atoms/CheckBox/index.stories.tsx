/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckBox from '.';

export default {
  title: 'WebToDoApp/Atoms/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Checked = Template.bind({});
Checked.storyName = 'Checked';
Checked.args = {
  disabled: false,
  isCompleted: true,
};

export const UnChecked = Template.bind({});
UnChecked.storyName = 'UnChecked';
UnChecked.args = {
  disabled: false,
  isCompleted: false,
};
