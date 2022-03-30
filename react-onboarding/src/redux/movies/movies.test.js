import reducer from './reducer';
import { setMovies, setRecommendation, setTrailer } from './actions';

const mockMovies = [
  {
    id: 1,
    title: 'dummyMovie1',
  },
  {
    id: 2,
    title: 'dummyMovie2',
  },
];

const initialState = {
  dummyCategory1: [
    {
      id: 0,
      title: 'dummyMovie0',
    },
  ],
  recommendation: {
    moreLikeThis: mockMovies,
    credits: [
      {
        id: 1234,
        cast: [],
        crew: [],
      },
    ],
    movieId: 123,
  },
  trailer: {
    movieId: 123,
    url: 'dummyVideoUrl1',
  },
};

describe('Movie reducer', () => {
  test('SET_MOVIES should return as expected', () => {
    const newState = reducer(
      initialState,
      setMovies({
        category: 'dummyCategory2',
        movies: mockMovies,
      }),
    );
    expect(newState.dummyCategory1).toBeDefined();
    expect(newState.dummyCategory2).toBeDefined();
    expect(newState).toEqual({
      ...initialState,
      dummyCategory2: mockMovies,
    });
  });
  test('SET_MOVIES should save as array if a single object is passed as payload', () => {
    const newState = reducer(
      initialState,
      setMovies({
        category: 'dummyCategory2',
        movies: mockMovies[0],
      }),
    );
    expect(newState).toEqual({
      ...initialState,
      dummyCategory2: [mockMovies[0]],
    });
  });
  test('SET_RECOMMENDATION should return as expected', () => {
    const mockRecommendation = {
      moreLikeThis: [
        {
          id: 3,
          title: 'dummyMovie3',
        },
      ],
      movieId: 321,
    };
    expect(
      reducer(initialState, setRecommendation(mockRecommendation)),
    ).toEqual({
      ...initialState,
      recommendation: mockRecommendation,
    });
  });
  test('SET_TRAILER should return as expected', () => {
    const mockTrailer = {
      movieId: 321,
      url: 'anyOtherDummyUrl',
    };
    expect(reducer(initialState, setTrailer(mockTrailer))).toEqual({
      ...initialState,
      trailer: mockTrailer,
    });
  });
});
