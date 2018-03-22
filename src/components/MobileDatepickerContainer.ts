import { Component, createElement } from "react";
import { MobileDatepicker } from "./MobileDatepicker";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface ContainerProps extends WrapperProps {
    onChangeMicroflow: string;
    editable: boolean;
    attribute: string;
    showHeader: boolean;
    showMonthsForYears: boolean;
    showOverlay: boolean;
    hideYearsOnSelect: boolean;
    width: number;
    height: number;
    todayHelperRowOffset: number;
    rowHeight: number;
    autoFocus: boolean;
    tabIndex: number;
    actionClick: boolean;
    formatDate: string;
    selected: Date;
    dateEntity: string;
}

interface ContainerState {
    dateValue: string;
}

export default class DatePickerContainer extends Component<ContainerProps, ContainerState> {
    private attribute: string;
    private dateEntity: string;
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.state = {
            dateValue: this.getValue(props.attribute, props.mxObject) as string
        };

        this.attribute = "";
        this.dateEntity = "";
        this.subscriptionHandles = [];
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.resetSubscriptions = this.resetSubscriptions.bind(this);
    }

    render() {
        const { mxObject } = this.props;
        const readOnly = !this.props.editable
            || (mxObject && mxObject.isReadonlyAttr(this.props.attribute))
            || this.props.readOnly
            || !mxObject;

        return createElement(MobileDatepicker as any, {
            actionClick: this.props.actionClick,
            attribute: this.state.dateValue,
            autoFocus: this.props.autoFocus,
            formatDate: this.props.formatDate,
            height: this.props.height,
            hideYearsOnSelect: this.props.hideYearsOnSelect,
            readOnly,
            rowHeight: this.props.rowHeight,
            showHeader: this.props.showHeader,
            showMonthsForYears: this.props.showMonthsForYears,
            showOverlay: this.props.showOverlay,
            tabIndex: this.props.tabIndex,
            todayHelperRowOffset: this.props.todayHelperRowOffset,
            updateDate: this.updateDate,
            width: this.props.width
        });
    }

    componentWillReceiveProps(newProps: ContainerProps) {
        this.resetSubscriptions(newProps.mxObject);

        this.setState({
            dateValue: this.getValue(this.props.attribute, newProps.mxObject)
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
            dateValue: this.getValue(this.props.attribute, this.props.mxObject) as string
        });
    }

    private updateDate(newDate: string) {
        this.props.mxObject.set(this.props.attribute, newDate);

        if (this.props.actionClick) {
            const { onChangeMicroflow, mxObject } = this.props;
            mx.data.get({
                callback: (object) => {
                    this.saveDate(mxObject, onChangeMicroflow, object[0].getGuid());
                },
                error: error => `${error.message}`,
                xpath: `//${this.dateEntity}[ ${this.attribute} = '${newDate}' ]`
            });
        }
    }

    private saveDate(object: mendix.lib.MxObject, action?: string, guid?: string) {
        mx.data.commit({
            callback: () => {
                if (action && guid) {
                    this.executeMicroflow(action, guid);
                }
            },
            mxobj: object
        });
    }

    private executeMicroflow(microflow: string, guid: string) {
        if (microflow) {
            window.mx.ui.action(microflow, {
                error: error =>
                    window.mx.ui.error(`Error while executing microflow: ${microflow}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
    }
}
