describe("Tickets", () => {
  const firstName = "Leonardo";
  const lastName = "Oliva Kraciunas";
  const fullName = `${firstName} ${lastName}`;
  const email = "leonardo@email.com";
  const ticketQuantity = "2";

  beforeEach(() => {
    cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html");
  });

  it("fill all the text input fields", () => {
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type(email);
    cy.get("#requests").type("Drums!");
    cy.get("#signature").type(fullName);
  });

  it("select two tickets", () => {
    cy.get("#ticket-quantity").select(ticketQuantity);
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

  it("has 'TICKETBOX' header's heading", () => {
    cy.get("header h1").should("contain", "TICKETBOX");
  });

  it("alerts on invalid email", () => {
    cy.get("#email").as("email").type("leonardo-email.com");

    cy.get("#email.invalid").should("exist");

    cy.get("@email").clear().type(email);

    cy.get("#email.invalid").should("not.exist");
  });

  it("fills and reset the form", () => {
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type(email);
    cy.get("#ticket-quantity").select(ticketQuantity);
    cy.get("#vip").check();
    cy.get("#social-media").check();
    cy.get("#requests").type("Orange juice");
    cy.get(".agreement p").should(
      "contain",
      `I, ${fullName}, wish to buy ${ticketQuantity} VIP tickets.`
    );
    cy.get("#agree").check();
    cy.get("#signature").type(fullName);

    cy.get("button[type='submit']").should("not.be.disabled");

    cy.get("button[type='reset']").click();
    cy.get("button[type='submit']").should("be.disabled");
  });
});
