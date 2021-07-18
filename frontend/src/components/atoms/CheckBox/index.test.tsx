import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CheckBox from '.';
import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe('Atoms/CheckBox', () => {
  test('初期状態は未チェックの状態になる', () => {
    render(<CheckBox />);
    const element = screen.getByTestId('checkbutton');
    expect(element).toHaveStyle('background: rgb(216, 179, 132, 0.5)');
    const input = screen.getByRole('checkbox');
    expect(input).toHaveProperty('defaultChecked', false);
  });

  test('isCompleted:trueの場合にチェックの状態になる', () => {
    render(<CheckBox isCompleted={true} />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveProperty('defaultChecked', true);
    const element = screen.getByRole('checkbox');
    expect(element).toHaveStyle('background: var(--primary-color)');
  });

  test('正しくレンダリングされている', () => {
    const target = renderer.create(<CheckBox />).toJSON();
    expect(target).toMatchSnapshot();
  });
});
