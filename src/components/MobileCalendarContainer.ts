import { Component, createElement } from "react";
import { MobileCalendar } from "./MobileCalendar";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    onChangeMicroflow: string;
    editable: boolean;
    dateAttribute: string;
    layout: string;
    showHeader: boolean;
    showMonthsForYears: boolean;
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
    actionClick: boolean;
    formatDate: string;
    selected: Date;
    dateEntity: string;
}

interface ContainerState {
    dateValue: string;
}

export default class MobileCalendarContainer extends Component<ContainerProps, ContainerState> {
    dateAttribute: string;
    dateEntity: string;
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
        const { mxObject } = this.props;
        const readOnly = this.props.editable === false
            || (mxObject && mxObject.isReadonlyAttr(this.props.dateAttribute)) || this.props.readOnly || !mxObject;

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
            showMonthsForYears: this.props.showMonthsForYears,
            updateDate: this.updateDate,
            actionClick: this.props.actionClick,
            readOnly
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
        if (this.props.actionClick === true) {
        const { onChangeMicroflow, mxObject } = this.props;
        mx.data.get({
            callback: (object) => {
                this.saveDateData(mxObject, onChangeMicroflow, object[0].getGuid());
            },
            error: error => `${error.message}`,
            xpath: `//${this.dateEntity}[ ${this.dateAttribute} = '${newDate}' ]`
});
      }
    }

    private saveDateData(object: mendix.lib.MxObject, action?: string, guid?: string) {
        mx.data.commit({
            mxobj: object,
            callback: () => {
                if (action && guid) {
                    this.executeAction(action, guid);
                }
            }
        });
    }

    private executeAction(actionName: string, guid: string) {
        if (actionName) {
           window.mx.ui.action(actionName, {
                error: error =>
                    window.mx.ui.error(`Error while executing microflow: ${actionName}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
}

}
