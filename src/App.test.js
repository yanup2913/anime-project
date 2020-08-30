import React from 'react';
import { render } from '@testing-library/react';
import AnimeProject from './Anime-project';

test('renders learn react link', () => {
  const { getByText } = render(<AnimeProject />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
