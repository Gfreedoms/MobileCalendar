import { Component, createElement } from "react";
import "../ui/DatePicker.scss";

import { ReactInfiniteCalendar } from "./ReactInfiniteCalendar";
import { DateInput } from "./DateInput";
import * as format from "date-fns/format";

export interface DatePickerProps {
    className?: string;
    readOnly?: boolean;
    style?: object;
    date?: string;
    showHeader: boolean;
    actionClick: boolean;
    showMonthsForYears: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    width: number;
    height: number;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: number;
    dateattribute: string;
    selected?: Date;
    formatDate: string;
}

export interface DatePickerState {
    isPlainText: boolean;
    printDate: string;
}

export class DatePicker extends Component<DatePickerProps, DatePickerState> {

    constructor(props: DatePickerProps) {
        super(props);

        this.state = {
            isPlainText: true,
            printDate: `12/05/1994`
        };
        this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return createElement("div", {},
            this.createDateInput(),
            createElement("br", {}),
            this.createCalender()
        );
    }

    private createDateInput() {
        return createElement(DateInput, {
            dateattribute: this.props.dateattribute,
            onClick: this.handleClick,
            printDate: this.state.printDate
        });
    }
    private createCalender() {
        return createElement(ReactInfiniteCalendar, {
            actionClick: this.props.actionClick,
            autoFocus: this.props.autoFocus,
            className: "Calendar",
            height: this.props.height,
            hideYearsOnSelect: this.props.hideYearsOnSelect,
            onSelect: (date: string) => {
                this.setState({
                    isPlainText: !this.state.isPlainText,
                    printDate: `${format(date, this.props.formatDate)}`
                });
            },
            printDate: this.state.printDate,
            rowHeight: this.props.rowHeight,
            showCalendar: this.state.isPlainText,
            showHeader: this.props.showHeader,
            showMonthsForYears: this.props.showMonthsForYears,
            showOverlay: this.props.showOverlay,
            tabIndex: this.props.tabIndex,
            todayHelperRowOffset: this.props.todayHelperRowOffset,
            width: this.props.width
        });
    }

    private handleClick() {
        this.setState({
            isPlainText: !this.state.isPlainText
        });
    }
}
