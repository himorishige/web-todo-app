import renderer from 'react-test-renderer';
import Spinner from '.';

describe('Atoms/Spinner', () => {
  it('正しくレンダリングされている', () => {
    const element = renderer.create(<Spinner />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
