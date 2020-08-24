describe("Tickets", () => {
  beforeEach(() => {
    cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html");
  });

  it("fill all the text input fields", () => {
    const firstName = "Leonardo";
    const lastName = "Oliva Kraciunas";

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("leonardo@okraciunas.com");
    cy.get("#requests").type("Drums!");
    cy.get("#signature").type(`${firstName} ${lastName}`);
  });

  it("select two tickets", () => {
    cy.get("#ticket-quantity").select("2");
  });

  it("select 'vip' ticket type", () => {
    cy.get("#vip").check();
  });

  it("selects 'social media' checkbox", () => {
    cy.get("#social-media").check();
  });

  it("selects 'friend' and 'publication', then uncheck 'friend'", () => {
    cy.get("#friend").check();
    cy.get("#publication").check();
    cy.get("#friend").uncheck();
  });
});
