import { Component, createElement } from "react";

import { DatePickerState, MobileDatepicker, MobileDatepickerProps } from "./components/MobileDatepicker";
import { ContainerProps } from "./components/MobileDatepickerContainer";
import "react-infinite-calendar/styles.css";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<ContainerProps, DatePickerState> {
    render() {
        return createElement(MobileDatepicker as any, preview.datePickerProps());
    }

    private static datePickerProps(): MobileDatepickerProps {
        return {
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
    }
}

export function getPreviewCss() {
    return (
        require("./ui/MobileDatepicker.scss") + require("react-infinite-calendar/styles.css")
    );
}

export function getVisibleProperties(value: any, visibility: any) {
    visibility.datePicker = value.datePicker === "custom";

    return visibility;
}
