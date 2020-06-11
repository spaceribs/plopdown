describe('plopdown-cues', () => {
  beforeEach(() => cy.visit('/iframe.html?id=audiocomponent--primary'));

  it('should render the component', () => {
    cy.get('plopdown-audio').should('exist');
  });
});
