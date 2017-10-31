import { Component, createElement } from "react";
import { MobileCalendar } from "./MobileCalendar";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    dateAttribute: string;
    layout: string;
    showHeader: boolean;
    shouldHeaderAnimate: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    width: number;
    height: number;
    overscanMonthCount: number;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: boolean;
    display: string;
    formatDate: string;
    selected: Date;
}

interface ContainerState {
    dateValue: string;
}

export default class MobileCalendarContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.state = {
            dateValue: this.getValue(props.dateAttribute, props.mxObject) as string
        };

        this.subscriptionHandles = [];
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.resetSubscriptions = this.resetSubscriptions.bind(this);
    }

    render() {

        return createElement(MobileCalendar, {
            formatDate: this.props.formatDate,
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
            display: this.props.display,
            dateAttribute: this.state.dateValue,
            updateDate: this.updateDate
        });
    }

    componentWillReceiveProps(newProps: ContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({
            dateValue: this.getValue(this.props.dateAttribute, newProps.mxObject)
        });
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private getValue(attribute: string, mxObject?: mendix.lib.MxObject): string {
        return mxObject ? (mxObject.get(attribute) as string) : "";
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));
        }
    }

    private handleSubscriptions() {
        this.setState({
            dateValue: this.getValue(this.props.dateAttribute, this.props.mxObject) as string
        });
    }

    private updateDate(newDate: string) {
        this.props.mxObject.set(this.props.dateAttribute, newDate);
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
            console.log("Failed to parse style", style, error);
        }

        return {};
    }

}
