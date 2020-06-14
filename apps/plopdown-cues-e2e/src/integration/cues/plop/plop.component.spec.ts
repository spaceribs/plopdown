describe('plopdown-embed', () => {
  beforeEach(() => cy.visit('/iframe.html?id=plopcomponent--primary'));

  it('should render the component', () => {
    cy.get('plopdown-plop').should('exist');
  });
});
