import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Button from '.';
import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe('Atoms/Button', () => {
  test('ラベル名が正しく表示される', () => {
    render(<Button label="button" />);
    const element = screen.getByRole('button');
    expect(element).toHaveTextContent('button');
  });

  test('primaryボタンの場合色が正しく反映される', () => {
    render(<Button primary label="button" />);
    const element = screen.getByRole('button');
    expect(element).toHaveStyle('background: var(--primary-color)');
  });

  test('正しくレンダリングされている', () => {
    const target = renderer.create(<Button label="button" />).toJSON();
    expect(target).toMatchSnapshot();
  });
});
