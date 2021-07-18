import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Input from '.';

describe('Atoms/Input', () => {
  const placeholder = '入力';
  const label = 'taskMemo';
  const register = jest.fn();
  const required = false;
  test('placeholderにPropsが表示される', () => {
    render(
      <Input placeholder={placeholder} label={label} register={register} required={required} />,
    );
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.placeholder).toBe(placeholder);
  });
  test('テキストフィールドに1を入力したら1が表示される', () => {
    render(
      <Input placeholder={placeholder} label={label} register={register} required={required} />,
    );
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '1' } });
    expect(inputElement.value).toBe('1');
  });
  test('正しくレンダリングされている', () => {
    const inputField = renderer
      .create(
        <Input placeholder={placeholder} label={label} register={register} required={required} />,
      )
      .toJSON();
    expect(inputField).toMatchSnapshot();
  });
});
