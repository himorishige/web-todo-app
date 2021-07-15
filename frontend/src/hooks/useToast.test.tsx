import { act, cleanup, renderHook, RenderResult } from '@testing-library/react-hooks';

import { ToastProvider, useToast } from './useToast';

function wrapper({ children }: { children: JSX.Element[] }) {
  return <ToastProvider>{children}</ToastProvider>;
}

function useToastContextTest() {
  const { showToast, state } = useToast();
  return {
    showToast,
    state,
  };
}

const sleep = (value: number) => new Promise((resolve) => setTimeout(resolve, value));

describe('ToastContext', () => {
  let renderResult: RenderResult<ReturnType<typeof useToastContextTest>>;

  beforeEach(() => {
    const { result } = renderHook(() => useToastContextTest(), { wrapper });
    renderResult = result;
  });
  afterEach(() => {
    cleanup();
  });

  test('context: initial state', () => {
    expect(renderResult.current.showToast).not.toBe(true);
  });
  test('context: SUCCESS', async () => {
    // show
    await act(async () => {
      renderResult.current.showToast('SUCCESS', 'message');
    });
    expect(renderResult.current.showToast).toBeDefined();
    expect(renderResult.current.state.show).toBe(true);
    expect(renderResult.current.state.message).toBe('message');
    expect(renderResult.current.state.toastType).toBe('SUCCESS');
    // hide
    await act(async () => {
      await sleep(3000);
    });
    expect(renderResult.current.showToast).not.toBe(true);
    expect(renderResult.current.state.show).toBe(false);
  });

  test('context: FAILED', async () => {
    // show
    await act(async () => {
      renderResult.current.showToast('FAIL', 'message');
    });
    expect(renderResult.current.showToast).toBeDefined();
    expect(renderResult.current.state.show).toBe(true);
    expect(renderResult.current.state.message).toBe('message');
    expect(renderResult.current.state.toastType).toBe('FAIL');
    // hide
    await act(async () => {
      await sleep(3000);
    });
    expect(renderResult.current.showToast).not.toBe(true);
    expect(renderResult.current.state.show).toBe(false);
  });
});
