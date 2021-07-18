import renderer from 'react-test-renderer';
import HomeIcon from '.';

describe('Atoms/HomeIcon', () => {
  test('正しくレンダリングされている', () => {
    const target = renderer.create(<HomeIcon />).toJSON();
    expect(target).toMatchSnapshot();
  });
});
