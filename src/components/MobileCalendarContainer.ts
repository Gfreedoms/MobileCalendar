import { Component, createClass, createElement } from "react";
import { Alert } from "./Alert";
import { MobileCalendar } from "./MobileCalendar";
import InfiniteCalendar from "react-infinite-calendar";
// tslint:disable-next-line:no-submodule-imports
import "react-infinite-calendar/styles.css";
import "../ui/MobileCalendar.scss";
// tslint:disable-next-line:no-submodule-imports
import * as format from "date-fns/format";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    layout: string;
    showHeader: boolean;
    shouldHeaderAnimate: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    width: number;
    height: number;
    OverscanMonthCount: number;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: boolean;
    display: string;
    date: any;
    selected: any;
}

interface ContainerState {
    onSelect: any;
    selected: any;
    isPlainText: boolean;
    printdate: string;
}

export default class MobileCalendarContainer extends Component<ContainerProps, ContainerState> {
    onSelect: string;
    handleSelect: any;
    handleChange: any;
    private dates: string;
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = {
            onSelect: (date: string) => (`You selected: ${format(date, "ddd, MMM Do YYYY")}`),
            isPlainText: true,
            printdate: "",
            selected: typeof this.props.selected !== "undefined"
                ? this.props.selected
                : new Date()
        };

        this.subscribe(this.props.mxObject);
        this.handleClick = this.handleClick.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
    }

    render() {

        return createElement("div", {
        },
            this.displayInfo()
        );
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        this.subscribe(nextProps.mxObject);
        this.updateRating(nextProps.mxObject);
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private subscribe(contextObject?: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.updateRating(contextObject),
                guid: contextObject.getGuid()
            }));
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private updateRating(mxObject: mendix.lib.MxObject) {
        // to check on later
    }

    private handleClick() {
        this.setState({
            isPlainText: !this.state.isPlainText
        });
    }

    private displayInfo() {
        const selected = this.state.selected;
        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const displayForm = createElement("div", {},
            createElement("input", {
                type: "text",
                className: "form-control",
                placeholder: lastWeek,
                onClick: this.handleClick
            })
        );
        const displayCalendar = createElement("div", {},
            createElement("input", {
                type: "text",
                className: "from-control",
                placeholder: this.state.printdate,
                onClick: this.handleClick
            }),
            createElement(InfiniteCalendar, {

                onSelect: (date: string) => this.setState({ printdate: date }),
                selected: this.state.selected,
                disabledDays: [ 0, 6 ],
                minDate: lastWeek,
                layout: this.props.layout,
                width: this.props.width,
                height: this.props.height,
                showHeader: this.props.showHeader,
                showOverlay: this.props.showOverlay,
                hideYearsOnSelect: this.props.hideYearsOnSelect,
                todayHelperRowOffset: this.props.todayHelperRowOffset,
                shouldHeaderAnimate: this.props.shouldHeaderAnimate,
                rowHeight: this.props.rowHeight,
                autoFocus: this.props.autoFocus,
                tabIndex: this.props.tabIndex,
                display: this.props.display
            })
        );
        return createElement("div", {},
            this.state.isPlainText ? displayForm : displayCalendar
        );

    }
}
