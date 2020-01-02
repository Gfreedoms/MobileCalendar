import { Component, createElement } from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

export interface InfiniteCalendarProps {
    actionClick: boolean;
    width: number;
    height: number;
    className: string;
    showHeader: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: number;
    showMonthsForYears: boolean;
    printDate?: string;
    onSelect: (date: string) => void;
    showCalendar: boolean;
}

export class ReactInfiniteCalendar extends Component<InfiniteCalendarProps , {}> {
    render() {
        return createElement("div", {}, this.createCalendar());
    }
    private createCalendar() {
        if (this.props.showCalendar) {
            return createElement(InfiniteCalendar, {
                actionClick: this.props.actionClick,
                autoFocus: this.props.autoFocus,
                className: "Calendar",
                height: this.props.height,
                hideYearsOnSelect: this.props.hideYearsOnSelect,
                onSelect: this.props.onSelect,
                rowHeight: this.props.rowHeight,
                selected: this.props.printDate,
                showHeader: this.props.showHeader,
                showMonthsForYears: this.props.showMonthsForYears,
                showOverlay: this.props.showOverlay,
                tabIndex: this.props.tabIndex,
                todayHelperRowOffset: this.props.todayHelperRowOffset,
                width: this.props.width
            });
        } else {
            return null;
        }
    }
}
