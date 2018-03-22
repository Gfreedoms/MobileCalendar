import { mount , shallow } from "enzyme";
import { createElement } from "react";

import { DatePicker, DatePickerProps, DatePickerState } from "../DatePicker";
import { DateInput } from "../DateInput";
import { ReactInfiniteCalendar } from "../ReactInfiniteCalendar";

describe("DatePicker", () => {
    const shallowRenderDatePicker = (props: DatePickerProps) => shallow(createElement(DatePicker, props));
    const fullRenderDatePicker = (props: DatePickerProps) => mount(createElement(DatePicker, props));
    const defaultProps: DatePickerProps = {
        actionClick: false,
        attribute: "calender",
        autoFocus: true,
        formatDate: "DD/MM/YYYY",
        height: 300,
        hideYearsOnSelect: true,
        rowHeight: 56,
        selected: new Date(),
        showHeader: true,
        showMonthsForYears: false,
        showOverlay: true,
        tabIndex: 1,
        todayHelperRowOffset: 4,
        width: 320
    };

    const defaultState: DatePickerState = {
        isPlainText: true,
        printDate: ""
    };

    it("should render the structure correctly", () => {
        const renderDatePicker = shallowRenderDatePicker(defaultProps);

        expect(renderDatePicker).toBeElement(
            createElement("div", {},
                createElement(DateInput, {
                    attribute: defaultProps.attribute,
                    onClick: jasmine.any(Function),
                    printDate: defaultState.printDate
                }),
                createElement("br", {}),
                createElement(ReactInfiniteCalendar, {
                    actionClick: defaultProps.actionClick,
                    autoFocus: defaultProps.autoFocus,
                    className: "Calendar",
                    height: defaultProps.height,
                    hideYearsOnSelect: defaultProps.hideYearsOnSelect,
                    onSelect: jasmine.any(Function),
                    printDate: defaultState.printDate,
                    rowHeight: defaultProps.rowHeight,
                    showCalendar: defaultState.isPlainText,
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

    it("should respond to onclick events", () => {
        const renderDatePicker = fullRenderDatePicker(defaultProps);
        const DatePickerInstance = renderDatePicker.instance() as any;
        const onClick = spyOn(DatePickerInstance, "handleClick").and.callThrough();
        const input = renderDatePicker.find("input").simulate("click");

        input.simulate("click");

        expect(onClick).toHaveBeenCalled();
    });

    it("should select a date from the calendar", () => {
        const renderDatePicker = fullRenderDatePicker(defaultProps);
        const input = renderDatePicker.find("input").simulate("click");
        input.simulate("click");

        renderDatePicker.find(".Cal__Day__enabled").first().simulate("click");

        const newDate = renderDatePicker.find("input").prop("placeholder");

        expect(newDate).toContain("01/01/2018");
    });
});
