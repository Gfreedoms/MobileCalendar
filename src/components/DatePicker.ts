import { Component, createElement } from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

import "../ui/DatePicker.scss";
import * as format from "date-fns/format";
import * as FaCalendar from "react-icons/lib/fa/calendar";

export interface DatePickerProps {
    className?: string;
    readOnly?: boolean;
    style?: object;
    date?: string;
    showHeader: boolean;
    actionClick?: boolean;
    showMonthsForYears: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    width: number;
    height: number;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: boolean;
    dateAttribute: string;
    selected?: Date;
    formatDate: string;
    updateDate: (date: string) => void;
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
            printDate: `${format(props.dateAttribute, this.props.formatDate)}`
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return createElement("div", {},
            createElement("div", {},
                createElement("input" as any, {
                    className: "widget-date-picker-form-control",
                    dateAttribute: this.props.dateAttribute,
                    onChange: this.handleChange,
                    onClick: this.handleClick,
                    placeholder: this.state.printDate,
                    type: "text"
                }),
                createElement("a", {},
                    createElement(FaCalendar, {
                        className: "widget-date-picker-form-row",
                        onClick: this.handleClick,
                        type: null
                    }))),
            createElement("br", {}),
            this.datePickerElement()
        );
    }

    componentWillReceiveProps(newProps: DatePickerProps) {
        this.setState({
            printDate: `${format(newProps.dateAttribute, this.props.formatDate)}`
        });
    }

    private datePickerElement() {
        if (!this.state.isPlainText) {
            return createElement(InfiniteCalendar, {
                className: "Calendar",
                onSelect: (date: string) => {
                    this.setState({
                        isPlainText: !this.state.isPlainText,
                        printDate: `${format(date, this.props.formatDate)}`
                    });

                    this.props.updateDate(date);
                },
                ...this.props
                // actionClick: this.props.actionClick,
                // width: this.props.width,
                // layout: this.props.layout,
                // height: this.props.height,
                // showHeader: this.props.showHeader,
                // showOverlay: this.props.showOverlay,
                // hideYearsOnSelect: this.props.hideYearsOnSelect,
                // todayHelperRowOffset: this.props.todayHelperRowOffset,
                // shouldHeaderAnimate: this.props.shouldHeaderAnimate,
                // rowHeight: this.props.rowHeight,
                // autoFocus: this.props.autoFocus,
                // tabIndex: this.props.tabIndex,
                // display: this.props.display,
                // showMonthsForYears: this.props.showMonthsForYears,
                // selected: this.state.printDate
            });
        }

        return null;
    }

    private handleClick() {
        this.setState({
            isPlainText: !this.state.isPlainText
        });
    }

    private handleChange(dateAttribute: string) {
        this.setState({
            printDate: dateAttribute
        });
    }

}
