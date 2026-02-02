import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import blogService from '../services/blogs';

describe('<Blog />', () => {
  const mockHandler = vi.fn();
  vi.mock('../services/blogs', () => ({
    default: {
      like: vi.fn().mockResolvedValue({ likes: 1 }),
    },
  }));
  beforeEach(() => {
    const blog = {
      title: 'testi',
      author: 'david',
      url: 'www.hello.com',
      likes: 0,
      user: {
        username: 'david',
        name: 'david',
      },
    };

    const container = render(
      <Blog
        blog={blog}
        setBlogs={mockHandler}
        blogs={mockHandler}
        note={mockHandler}
      />
    );
  });
  test('renders only title and author', () => {
    const title = screen.getByText('testi');

    expect(title).toBeDefined();
  });

  test('renders all info when button pressed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');

    await user.click(button);
    const title = screen.getByText('testi');
    const author = screen.getByText(/david/);
    const url = screen.getByText(/www.hello.com/);
    const likes = screen.getByText(/likes/);
    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(likes).toBeDefined();
    expect(url).toBeDefined();
  });

  test('two likes make two mock calls', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);
    const like = await screen.findByRole('button', { name: 'like' });

    await user.click(like);
    await user.click(like);
    expect(blogService.like).toHaveBeenCalledTimes(2);
  });
});
