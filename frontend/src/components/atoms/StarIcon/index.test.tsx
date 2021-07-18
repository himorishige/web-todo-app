import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import StarIcon from '.';
import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe('Atoms/StartIcon', () => {
  test('正しくレンダリングされている', () => {
    const element = renderer.create(<StarIcon />).toJSON();
    expect(element).toMatchSnapshot();
  });

  test('初期状態は無色の状態になる', () => {
    render(<StarIcon />);
    const element = screen.getByTestId('star');
    expect(element).toHaveStyleRule('color', 'var(--primary-color)');
  });

  test('選択状態は黄色の状態になる', () => {
    render(<StarIcon status={1} />);
    const element = screen.getByTestId('star');
    expect(element).toHaveStyleRule('color', '#ffee00');
  });
});
