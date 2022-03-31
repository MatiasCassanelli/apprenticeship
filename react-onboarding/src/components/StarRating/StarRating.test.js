import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
  test('should not render any star', () => {
    render(<StarRating />);
    const starImage = screen.queryByAltText('star-0');
    const halfStarImage = screen.queryByAltText('half-star');
    expect(starImage).not.toBeInTheDocument();
    expect(halfStarImage).not.toBeInTheDocument();
  });
  test('should render a half star', () => {
    render(<StarRating rating={0.7} />);
    screen.getByAltText('half-star');
    const starImage2 = screen.queryByAltText('star-0');
    expect(starImage2).not.toBeInTheDocument();
  });
  test('should render a single star', () => {
    render(<StarRating rating={1.49} />);
    screen.getByAltText('star-0');
    const starImage2 = screen.queryByAltText('star-1');
    const halfStarImage = screen.queryByAltText('half-star');
    expect(starImage2).not.toBeInTheDocument();
    expect(halfStarImage).not.toBeInTheDocument();
  });
  test('should render a star and a half', () => {
    render(<StarRating rating={1.5} />);
    screen.getByAltText('star-0');
    screen.getByAltText('half-star');
  });
});
