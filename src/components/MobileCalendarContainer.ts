import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Component, createElement } from "react";
 import { MobileCalendar } from "./MobileCalendar";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
           }
export interface ContainerProps extends WrapperProps {
    showTimeSelect: boolean;
    inline: boolean;
    selectsEnd: boolean;
    selectsStart: boolean;
    dateFormat: string;
    name: string;
    placeholderText: string;
    title: string;
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
  handleSelect = (Date: any)=>{
      
  }
    render() {
              return createElement(DatePicker,{
                  onselect: this.handleSelect,
                  showTimeSelect: this.props.showTimeSelect,
                 placeholderText: this.props.placeholderText,
                  selected:  this.state.startDate,
                  onChange: this.handleChange,
                  inline: this.props.inline,
                  selectsEnd: this.props.selectsEnd,
                  selectsStart: this.props.selectsStart,
                  useWeekdaysShort: this.useWeekdaysShort,
                  dateFormat: this.props.dateFormat,
                  name: this.props.name,
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
