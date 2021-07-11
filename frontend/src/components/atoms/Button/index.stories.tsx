/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '.';

export default {
  title: 'WebToDoApp/Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Primary';
Primary.args = {
  primary: true,
  label: '登録する',
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.storyName = 'Secondary';
Secondary.args = {
  label: '削除する',
  disabled: false,
};
