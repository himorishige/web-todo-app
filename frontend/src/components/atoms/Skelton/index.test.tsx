import renderer from 'react-test-renderer';
import Skelton from '.';

describe('Atoms/Skelton', () => {
  it('正しくレンダリングされている', () => {
    const element = renderer.create(<Skelton />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
