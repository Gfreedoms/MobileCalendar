import DatePicker from "react-datepicker";
import * as moment from "moment";
import { Component, createElement } from "react";
import { Alert } from "./Alert";
// tslint:disable-next-line:no-multi-spaces
import { MobileCalendar } from "./MobileCalendar";
import InfiniteCalendar from "react-infinite-calendar";
// tslint:disable-next-line:no-submodule-imports
import "react-infinite-calendar/styles.css";
import "../ui/MobileCalendar.scss";
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
}

// tslint:disable-next-line:no-empty-interface
interface ContainerState {
    // initialRate: number;
    currentstate: boolean;
}

export default class MobileCalendarContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);
        this.subscriptionHandles = [];
        this.state = {
            currentstate: false
        };
        // initialize state (if there's state)
        // this.state = {
        //     // initialRate: this.props.mxObject
        //     //     ? this.props.mxObject.get(this.props.rateAttribute) as number
        //     //     : 0
        // };
        this.subscribe(this.props.mxObject);
    }
    getInitialState() {
            return { currentstate: true };
        }
    handleClick() {
            this.setState({ currentstate: !this.state.currentstate });
        }

    render() {
        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const PickedDate = createElement("input",
          { type: "text", className: "form-control", placeholder: "mm /dd / y" });
        const calendar = createElement(InfiniteCalendar, {
            selected: today,
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
           });
        const Better = createElement(DatePicker, {

           });
        return createElement("div", {},
        null,
                    createElement("div", {},
                  this.state.currentstate ? PickedDate : Better
            ),
            createElement(
                "button",
                {
                    type: "button", className: "btn btn-primary",
                    onClick: this.handleClick
                },
                "Pick date"
            )
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

    public static validateProps(props: ContainerProps) {
      // to check on later
        }

    public static parseStyle(style = ""): { [key: string]: string } {
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
                return styleObject;
            }, {});
        } catch (error) {
            // tslint:disable-next-line no-console
            console.error("Failed to parse style", style, error);
        }

        return {};
    }
}
