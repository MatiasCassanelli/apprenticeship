import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UpcomingMovie from './UpcomingMovie';
import * as movieServices from '../../services/movies';

const mockMovie = {
  poster_path: '/pEFRzXtLmxYNjGd0XqJDHPDFKB2.jpg',
  release_date: '2016-09-02',
  title: 'The Light Between Oceans',
  overview:
    'A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.',
  genres: ['Suspense', 'Action'],
  id: 283552,
};

test('should render dynamic movie data', () => {
  const date = new Date(mockMovie.release_date);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const releaseDate = `${month} ${day}`;
  render(<UpcomingMovie movie={mockMovie} />);
  expect(screen.getByText(mockMovie.title));
  expect(screen.getByText(mockMovie.overview));
  expect(screen.getByText(`Coming ${releaseDate}`));
});

test('should render video player after fetch video data', async () => {
  const getVideoSpy = jest.spyOn(movieServices, 'getVideos').mockResolvedValue([
    {
      key: '6JnN1DmbqoU',
      site: 'YouTube',
      type: 'Trailer',
    },
  ]);
  render(<UpcomingMovie movie={mockMovie} />);
  await waitFor(() => expect(getVideoSpy).toHaveBeenCalledWith(mockMovie.id));
  const videoPlayer = screen.getByTitle(mockMovie.title);
  expect(videoPlayer).toBeInTheDocument();
});

test('should not render video player because video object is not expected', async () => {
  const getVideoSpy = jest.spyOn(movieServices, 'getVideos').mockResolvedValue([
    {
      key: '6JnN1DmbqoU',
      site: 'YouTube',
      type: 'Another type',
    },
  ]);
  render(<UpcomingMovie movie={mockMovie} />);
  await waitFor(() => expect(getVideoSpy).toHaveBeenCalledWith(mockMovie.id));
  expect(screen.queryByTitle(mockMovie.title)).not.toBeInTheDocument();
});

test('should not render video player because there are no videos to show', async () => {
  const getVideoSpy = jest
    .spyOn(movieServices, 'getVideos')
    .mockResolvedValue([]);
  render(<UpcomingMovie movie={mockMovie} />);
  await waitFor(() => expect(getVideoSpy).toHaveBeenCalledWith(mockMovie.id));
  expect(screen.queryByTitle(mockMovie.title)).not.toBeInTheDocument();
});
