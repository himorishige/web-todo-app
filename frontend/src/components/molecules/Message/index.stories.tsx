/** @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Message from '.';

export default {
  title: 'WebToDoApp/Molecules/Message',
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Message';
Default.args = {
  children: 'メッセージがここに表示されます',
};
