import renderer from 'react-test-renderer';
import AlertDialogBox, { Props } from '.';

describe('Organisms/AlertDialogBox', () => {
  test('正しくレンダリングされている', () => {
    const props: Props = {
      title: 'title',
      isOpen: true,
      cancelRef: undefined,
      onClose: () => {},
      removeHandler: () => {},
    };
    const element = renderer.create(<AlertDialogBox {...props} />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
