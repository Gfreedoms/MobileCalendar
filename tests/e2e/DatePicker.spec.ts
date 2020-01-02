import home from "./pages/HomePage.page";

describe("MobileDatepicker", () => {
    it("should display input field", () => {
        home.open();
        home.dateInput.waitForVisible();

        const inputData = $("input").getAttribute("placeholder");

        expect(inputData).toBeFalsy();
    });
});
