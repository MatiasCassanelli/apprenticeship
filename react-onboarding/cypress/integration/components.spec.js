import mockMovies from '../fixtures/mockMovies.json';
import mockSingleMovie from '../fixtures/mockSingleMovie.json';

describe('Components E2E', () => {
  const movies = mockMovies.results;
  it('should render static components', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=nav-bar]');
    cy.contains('Movy');
    cy.contains('Home');
    cy.contains('Movie');
    cy.contains('Series');
    cy.contains('Recently Added');
    cy.contains('My List');
    cy.get('[data-testid=footer]');
  });

  it('should render the hero correctly', () => {
    cy.intercept('GET', '/3/movie/latest*', {
      fixture: 'mockSingleMovie.json',
    });
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=hero]')
      .find('img')
      .should('have.attr', 'src')
      .should('include', mockSingleMovie.poster_path);

    cy.get('[data-testid=hero]')
      .invoke('text')
      .should('include', mockSingleMovie.title);
    cy.get('[data-testid=hero]')
      .invoke('text')
      .should('include', mockSingleMovie.overview);
  });

  it('carousel should render 20 items', () => {
    cy.intercept('GET', '/3/movie/popular*', {
      fixture: 'mockMovies.json',
    });
    cy.visit('http://localhost:3000');

    cy.get(`[data-cy=PopularonMovy-carousel]`)
      .children()
      .should('have.length', movies.length);
  });

  it('should redirect to trailer page', () => {
    cy.intercept('GET', '/3/movie/popular*', {
      fixture: 'mockMovies.json',
    });
    cy.visit('http://localhost:3000');

    cy.get(`[data-testid=${movies[0].id}]`).first().click();
    cy.url().should('include', `/trailer/${movies[0].id}`);
  });

  it('should render upcoming movie correctly', () => {
    cy.intercept('GET', '/3/movie/upcoming*', {
      fixture: 'mockMovies.json',
    });
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=upcoming]')
      .find('img')
      .should('have.attr', 'src')
      .should('include', movies[2].poster_path);
    cy.get('[data-testid=upcoming]')
      .find('iframe')
      .should('have.attr', 'src')
      .should('include', 'IE8HIsIrq4o');
    cy.get('[data-testid=upcoming]')
      .invoke('text')
      .should('include', movies[2].title);
    cy.get('[data-testid=upcoming]')
      .invoke('text')
      .should('include', movies[2].overview);
  });
});
