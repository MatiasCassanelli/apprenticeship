import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Slide from './Slide';

const props = {
  imageSrc: 'https://image.tmdb.org/t/p/w300/pEFRzXtLmxYNjGd0XqJDHPDFKB2.jpg',
  title: 'The Light Between Oceans',
  overview:
    'A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.',
  onFocus: jest.fn(),
};

describe('Slide Component', () => {
  test('should render a slide components correctly', () => {
    render(
      <Slide
        imageSrc={props.imageSrc}
        title={props.title}
        overview={props.overview}
      />,
    );
    const backgroundImage = screen.getByAltText(props.title);
    expect(backgroundImage).toHaveAttribute('src', props.imageSrc);
    expect(screen.getByText(props.title));
    expect(screen.getByText(props.overview));
  });

  test('should not throw an error if onFocus prop is not passed', () => {
    render(
      <Slide
        imageSrc={props.imageSrc}
        title={props.title}
        overview={props.overview}
      />,
    );
    const container = screen.getByTestId('slide-container');
    userEvent.hover(container);
    expect(props.onFocus).not.toHaveBeenCalled();
  });

  test('should trigger the onFocus prop when focus an element', () => {
    render(
      <Slide
        imageSrc={props.imageSrc}
        title={props.title}
        overview={props.overview}
        onFocus={props.onFocus}
      />,
    );
    const container = screen.getByTestId('slide-container');
    userEvent.hover(container);
    expect(props.onFocus).toHaveBeenCalledTimes(1);
  });
});
