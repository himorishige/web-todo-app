import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Message from '.';
import { matchers } from '@emotion/jest';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const message = 'メッセージ';

describe('Molecules/Message', () => {
  test('正しくレンダリングされている', () => {
    const element = renderer.create(<Message>{message}</Message>).toJSON();
    expect(element).toMatchSnapshot();
  });

  test('childrenが正しく反映される', () => {
    render(<Message>{message}</Message>);
    const element = screen.getByTestId('info-message');
    expect(element).toHaveTextContent(message);
  });
});
