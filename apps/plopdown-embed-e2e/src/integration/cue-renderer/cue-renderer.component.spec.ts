describe('plopdown-embed', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=cuerenderercomponent--primary&knob-cues')
  );

  it('should render the component', () => {
    cy.get('plopdown-cue-renderer').should('exist');
  });
});
