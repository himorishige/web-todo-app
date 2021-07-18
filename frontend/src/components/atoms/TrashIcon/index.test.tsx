import renderer from 'react-test-renderer';
import TrashIcon from '.';

describe('Atoms/TrashIcon', () => {
  test('正しくレンダリングされている', () => {
    const target = renderer.create(<TrashIcon />).toJSON();
    expect(target).toMatchSnapshot();
  });
});
