import { cleanup, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TaskItem from '.';
import { matchers } from '@emotion/jest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const id = '1';
const title = 'タイトル';
const description = '説明文';
const isCompleted = false;
const priority = 0;
const completedStateHandler = jest.fn();
const priorityStateHandler = jest.fn();

afterEach(() => {
  cleanup();
});

describe('Molecules/TaskItem', () => {
  test('正しくレンダリングされている', () => {
    const element = renderer
      .create(
        <MemoryRouter>
          <TaskItem
            id={id}
            title={title}
            description={description}
            isCompleted={isCompleted}
            priority={priority}
            completedStateHandler={completedStateHandler}
            priorityStateHandler={priorityStateHandler}
          />
        </MemoryRouter>,
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });

  test('チェックボタンを押下できる', () => {
    render(
      <MemoryRouter>
        <TaskItem
          id={id}
          title={title}
          description={description}
          isCompleted={isCompleted}
          priority={priority}
          completedStateHandler={completedStateHandler}
          priorityStateHandler={priorityStateHandler}
        />
      </MemoryRouter>,
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(completedStateHandler).toHaveBeenCalled();
  });

  test('スターボタンを押下できる', () => {
    render(
      <MemoryRouter>
        <TaskItem
          id={id}
          title={title}
          description={description}
          isCompleted={isCompleted}
          priority={priority}
          completedStateHandler={completedStateHandler}
          priorityStateHandler={priorityStateHandler}
        />
      </MemoryRouter>,
    );
    userEvent.click(screen.getByTestId('star'));
    expect(priorityStateHandler).toHaveBeenCalled();
  });
});
