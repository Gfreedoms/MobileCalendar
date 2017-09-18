import DatePicker from "react-datepicker";
import * as moment from "moment";
// tslint:disable-next-line:no-submodule-imports
import "react-datepicker/dist/react-datepicker.css";
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
   }

interface ContainerState {
    startDate: any;
    }

export default class MobileCalendarContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);
        this.subscriptionHandles = [];
        this.state = {
            startDate: moment()
        };
        // initialize state (if there's state)
        // this.state = {
        //     // initialRate: this.props.mxObject
        //     //     ? this.props.mxObject.get(this.props.rateAttribute) as number
        //     //     : 0
        // };
        this.subscribe(this.props.mxObject);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(Date: any) {
    this.setState({
      startDate: Date
    });
  }
    render() {
              return createElement(DatePicker, {
                  selected:  this.state.startDate,
                  onChange: this.handleChange
       });
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
