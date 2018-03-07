import { shallow } from "enzyme";
import { createElement } from "react";

import { DatePicker, DatePickerProps , DatePickerState } from "../DatePicker";
import { DateInput } from "../DateInput";
import { ReactInfiniteCalendar } from "../ReactInfiniteCalendar";

describe("DatePicker", () => {
    const shallowRenderDatePicker = (props: DatePickerProps) => shallow(createElement(DatePicker, props));
    // const fullRenderDatePicker = (props: DatePickerProps) => mount(createElement(DatePicker, props));
    const defaultProps: DatePickerProps = {
        actionClick: false,
        dateAttribute: "calender",
        formatDate: "DD/MM/YYYY",
        width: 320,
        // tslint:disable-next-line:object-literal-sort-keys
        height: 300,
        showHeader: true,
        showOverlay: true,
        hideYearsOnSelect: true,
        todayHelperRowOffset: 4,
        rowHeight: 56,
        autoFocus: true,
        tabIndex: true,
        showMonthsForYears: false,
        updateDate: jasmine.any(Function),
        selected: new Date()
    };

    const defaultState: DatePickerState = {
        isPlainText: true,
        printDate: "12/05/1994"
    };

    it("should render the structure correctly", () => {
        const renderDatePicker = shallowRenderDatePicker(defaultProps);
        expect(renderDatePicker).toBeElement(
            createElement("div", {},
                createElement(DateInput, {
                    dateAttribute: defaultProps.dateAttribute,
                    onChange: jasmine.any(Function),
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

    xit("should respond to onclick events", () => {
        const renderDatePicker = shallowRenderDatePicker(defaultProps);
        const DatePickerInstance = renderDatePicker.instance() as any;
        const onClick = spyOn(DatePickerInstance, "handleClick").and.callThrough();
        // tslint:disable-next-line:no-console
        // console.log(renderDatePicker.html());
        // onChange.stimulate("click");
        // const a = renderDatePicker.find(".widget-date-picker-form");
        renderDatePicker.find("input").simulate("click");
        // tslint:disable-next-line:no-console

        expect(onClick).toHaveBeenCalled();

    });

    it("should respond to onChange events", () => {
        //
    });
});
