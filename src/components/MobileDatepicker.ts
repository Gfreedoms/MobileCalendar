import { Component, createElement } from "react";
import "../ui/MobileDatepicker.scss";

import { ReactInfiniteCalendar } from "./ReactInfiniteCalendar";
import { DateInput } from "./DateInput";
import * as format from "date-fns/format";

export interface MobileDatepickerProps {
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
    attribute: string;
    selected?: Date;
    formatDate: string;
}

export interface DatePickerState {
    isPlainText: boolean;
    printDate: string;
}

export class MobileDatepicker extends Component<MobileDatepickerProps, DatePickerState> {

    constructor(props: MobileDatepickerProps) {
        super(props);

        this.state = {
            isPlainText: true,
            printDate: ""
        };

        this.handleClick = this.handleClick.bind(this);
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
            attribute: this.props.attribute,
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
