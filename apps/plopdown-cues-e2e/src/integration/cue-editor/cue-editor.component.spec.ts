describe('plopdown-embed', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=cueeditorcomponent--primary&knob-cues')
  );

  it('should render the component', () => {
    cy.get('plopdown-cue-editor').should('exist');
  });
});
