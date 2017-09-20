import DatePicker from "react-datepicker";
import * as moment from "moment";
// tslint:disable-next-line:no-submodule-imports
import "react-datepicker/dist/react-datepicker.css";
import { Component, createElement } from "react";
import { MobileCalendar } from "./MobileCalendar";

// tslint:disable-next-line:no-submodule-imports
interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
           }
export interface ContainerProps extends WrapperProps {
    forceShowMonthNavigation: boolean;
    inline: boolean;
    isClearable: boolean;
    peekNextMonth: boolean;
    readOnly: boolean;
    required: boolean;
    selectsEnd: boolean;
    selectsStart: boolean;
    useWeekdaysShort: boolean;
    width: number;
    height: number;
    autoFocus: boolean;
    autoComplete: string;
    // calendarClassName: string;
    className: string;
    dateFormat: string;
    name: string;
    locale: string;
    placeholderText: string;
    title: string;
    todayButton: string;
    value: string;
    weekLabel: string;
    yearDropDownItem: number;
    tabIndex: number;
    monthsShown: number;
   }

interface ContainerState {
    startDate: any;
           }

export default class MobileCalendarContainer extends Component<ContainerProps, ContainerState> {
    useWeekdaysShort: any;
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);
        this.subscriptionHandles = [];
        this.state = {
            startDate: moment()
        };
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
                 //  calendarClassName: this.props.calendarClassName,
                  placeholderText: this.props.placeholderText,
                  selected:  this.state.startDate,
                  onChange: this.handleChange,
                  forceShowMonthNavigation: this.props.forceShowMonthNavigation,
                  inline: this.props.inline,
                  isClearable: this.props.isClearable,
                  peekNextMonth: this.props.peekNextMonth,
                  readOnly: this.props.readOnly,
                  required: this.props.required,
                  selectsEnd: this.props.selectsEnd,
                  selectsStart: this.props.selectsStart,
                  useWeekdaysShort: this.useWeekdaysShort,
                  width: this.props.width,
                  height: this.props.height,
                  autoFocus: this.props.autoFocus,
                  autoComplete: this.props.autoComplete,
                   className: this.props.className,
                  dateFormat: this.props.dateFormat,
                   name: this.props.name,
                //   locale: this.props.locale,
                //   title: this.props.title,
                //   todayButton: this.props.todayButton,
                //   value: this.props.value,
                //   weekLabel: this.props.weekLabel,
                //   yearDropDownItem: this.props.yearDropDownItem,
                //   tabIndex: this.props.tabIndex,
                 monthsShown: this.props.monthsShown
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
