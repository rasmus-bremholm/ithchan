describe("Board Listing", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	it("navigates to a board via the board list", () => {
		cy.contains("Anime").click();
		cy.url().should("include", "/a");
		cy.contains("Anonymous").should("exist");
	});

	it("navigates to a board via the navbar", () => {
		cy.get("nav").contains("/a/").click();
		cy.url().should("include", "/a");
		cy.contains("Anime").should("exist");
	});

	it("opens a thread via View Thread button", () => {
		cy.get("nav").contains("/a/").click();
		cy.contains("View Thread").first().click();
		cy.url().should("match", /\/a\/\d+/);
		cy.contains("Anonymous").should("exist");
	});

	it("navigates to catalog and opens a thread", () => {
		cy.get("nav").contains("/a/").click();
		cy.contains("View Thread").first().click();
		cy.contains("Catalog").click();
		cy.url().should("include", "/catalog");
		cy.get("a[href*='/a/']").first().click();
		cy.url().should("include", "/a/");
	});
});
