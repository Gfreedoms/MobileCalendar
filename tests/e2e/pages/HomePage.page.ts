class HomePage {
    public get dateInput() { return browser.element(".widget-date-picker-form"); }

    public get slider() {
        // tslint:disable-next-line:max-line-length
        return browser.element(".mx-name-dataView1 .Calendar.Cal__Container__root .Cal__MonthList__root .Cal__Month__rows .Cal__Month__row.Cal__Month__partial");
    }

    // tslint:disable-next-line:max-line-length
    public get scroller() { return browser.element(".mx-name-dataView1 .Calendar.Cal__Container__root .Cal__MonthList__root .Cal__Month__rows .Cal__Month__row.Cal__Month__partial .Cal__Day__root.Cal__Day__enabled"); }
    public get currentDate() { return browser.element(".Cal__Day__root.Cal__Day__enabled"); }
    public get current() { return browser.element(".Cal__MonthList__root .Cal__MonthList__scrolling"); }

    public open(): void {
        browser.url("/");
    }
}

const home = new HomePage();

export default home;
