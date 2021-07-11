/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from '.';

export default {
  title: 'WebToDoApp/Atoms/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  placeholder: 'メモ',
  disabled: false,
};
