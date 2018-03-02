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
    layout?: string;
    showHeader: boolean;
    actionClick?: boolean;
    showMonthsForYears: boolean;
    shouldHeaderAnimate: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    width: number;
    height: number;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: boolean;
    display: string;
    dateAttribute: string;
    selected?: Date;
    formatDate: string;
    updateDate: (date: string) => void;
}

interface DatePickerState {
    isPlainText: boolean;
    printdate: string;
}

export class DatePicker extends Component<DatePickerProps, DatePickerState> {

    constructor(props: DatePickerProps) {
        super(props);

        this.state = {
            isPlainText: true,
            printdate: `${format(props.dateAttribute, this.props.formatDate)}`
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return createElement("div", {
        },
            createElement("div", {},
                createElement("input" as any, {
                    type: "text",
                    className: "form-control",
                    placeholder: this.state.printdate,
                    onClick: this.handleClick,
                    onChange: this.handleChange,
                    dateAttribute: this.props.dateAttribute
                }),
                createElement("a", {},
                    createElement(FaCalendar, {
                        type: null,
                        className: "form-row",
                        onClick: this.handleClick
                    }))),
            createElement("br", {}),
            this.datePickerElement()
        );
    }

    componentWillReceiveProps(newProps: DatePickerProps) {
        this.setState({
            printdate: `${format(newProps.dateAttribute, this.props.formatDate)}`
        });
    }

    private datePickerElement() {
        if (!this.state.isPlainText) {
            return createElement(InfiniteCalendar, {
                className: "Calendar",
                onSelect: (date: string) => {

                    this.setState({
                        printdate: `${format(date, this.props.formatDate)}`,
                        isPlainText: !this.state.isPlainText
                    });
                    this.props.updateDate(date);
                },
                actionClick: this.props.actionClick,
                width: this.props.width,
                layout: this.props.layout,
                height: this.props.height,
                showHeader: this.props.showHeader,
                showOverlay: this.props.showOverlay,
                hideYearsOnSelect: this.props.hideYearsOnSelect,
                todayHelperRowOffset: this.props.todayHelperRowOffset,
                shouldHeaderAnimate: this.props.shouldHeaderAnimate,
                rowHeight: this.props.rowHeight,
                autoFocus: this.props.autoFocus,
                tabIndex: this.props.tabIndex,
                display: this.props.display,
                showMonthsForYears: this.props.showMonthsForYears,
                selected: this.state.printdate
            });
        }

        return null;
    }

    private handleClick() {
        this.setState({
            isPlainText: !this.state.isPlainText
        });
    }

    handleChange(dateAttribute: string) {
        this.setState({
            printdate: dateAttribute
        });
    }

}
