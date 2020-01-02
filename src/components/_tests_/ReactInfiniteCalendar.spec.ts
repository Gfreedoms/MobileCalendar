import { shallow } from "enzyme";
import { createElement } from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

import { InfiniteCalendarProps, ReactInfiniteCalendar } from "../ReactInfiniteCalendar";

describe("MobileDatepicker", () => {
    const shallowRenderCalendar = (props: InfiniteCalendarProps) => shallow(createElement(ReactInfiniteCalendar, props));
    const defaultProps: InfiniteCalendarProps = {
        actionClick: true,
        autoFocus: true,
        className: "Calendar",
        height: 300,
        hideYearsOnSelect: false,
        onSelect: jasmine.any(Function),
        printDate: "14/05/1994" || undefined,
        rowHeight: 4,
        showCalendar: true,
        showHeader: true,
        showMonthsForYears: true,
        showOverlay: true,
        tabIndex: 1,
        todayHelperRowOffset: 4,
        width: 320
    };

    it("should render the structure correctly", () => {
        const Calendar = shallowRenderCalendar(defaultProps);

        expect(Calendar).toBeElement(
            createElement("div", {},
                createElement(InfiniteCalendar, {
                    actionClick: defaultProps.actionClick,
                    autoFocus: defaultProps.autoFocus,
                    className: defaultProps.className,
                    height: defaultProps.height,
                    hideYearsOnSelect: defaultProps.hideYearsOnSelect,
                    onSelect: () => jasmine.any(Function),
                    rowHeight: defaultProps.rowHeight,
                    selected: defaultProps.printDate,
                    showHeader: defaultProps.showHeader,
                    showMonthsForYears: defaultProps.showMonthsForYears,
                    showOverlay: defaultProps.showOverlay,
                    tabIndex: defaultProps.tabIndex,
                    todayHelperRowOffset: defaultProps.todayHelperRowOffset,
                    width: defaultProps.width
                })
            )
        );
    });

    it("should not render when 'showCalendar' is false", () => {
        const NoCalendar = shallowRenderCalendar(defaultProps);

        NoCalendar.setProps({ showCalendar: false });

        expect(NoCalendar).toBeElement(createElement("div", {}));
    });
});
