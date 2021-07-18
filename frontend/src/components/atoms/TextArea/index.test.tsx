import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TextArea from '.';
import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const placeholder = '入力';
const label = 'taskMemo';
const register = jest.fn();

describe('Atoms/TextArea', () => {
  test('初期状態はPropsが正しく反映されている', () => {
    render(
      <TextArea placeholder={placeholder} defaultValue="メモ" label={label} register={register} />,
    );
    const element = screen.getByTestId('tasks-textarea') as HTMLTextAreaElement;
    expect(element.placeholder).toBe(placeholder);
    expect(element.value).toBe('メモ');
  });

  test('フィールドに1を入力したら1が表示される', () => {
    render(
      <TextArea placeholder={placeholder} defaultValue="メモ" label={label} register={register} />,
    );
    const element = screen.getByTestId('tasks-textarea') as HTMLTextAreaElement;
    fireEvent.change(element, { target: { value: '1' } });
    expect(element.value).toBe('1');
  });

  test('正しくレンダリングされている', () => {
    const target = renderer
      .create(
        <TextArea placeholder={placeholder} defaultValue="" label={label} register={register} />,
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });
});
