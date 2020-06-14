describe('plopdown-embed', () => {
  beforeEach(() => cy.visit('/iframe.html?id=infocomponent--primary'));

  it('should render the component', () => {
    cy.get('plopdown-info').should('exist');
  });
});
