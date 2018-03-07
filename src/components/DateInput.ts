import { Component, createElement } from "react";
import * as FaCalendar from "react-icons/lib/fa/calendar";

export interface DateInputProps {
    dateAttribute: string;
    onChange: (value: string) => void;
    onClick: () => void;
    printDate: string;
}

export class DateInput extends Component<DateInputProps , {}> {
    render() {
        return createElement("div", {},
            createElement("input", {
                className: "widget-date-picker-form",
                dateAttribute: this.props.dateAttribute,
                onChange: this.props.onChange,
                onClick: this.props.onClick,
                placeholder: this.props.printDate,
                type: "text"
            }),
            createElement("a", {},
                createElement(FaCalendar, {
                    className: "widget-date-picker-form-row",
                    onClick: this.props.onClick
                })
            )
        );
    }
}
