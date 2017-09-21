import * as classNames from "classnames";
import { Component, createElement } from "react";
import { AppRegistry, View } from 'react-native';
export interface MobileCalendarProps {
    className?: string;
    initialRate: number;
    handleOnChange?: (rate: number) => void;
    readOnly: boolean;
    maximumStars: number;
    style?: object;
   // widgetColor: widgetColors;
}

export class MobileCalendar extends Component<MobileCalendarProps, {}> {
    private width: object;
    private height: object;
    private start: number;
    private step: number;
    private stop: number;
    private fractions: number;

    constructor(props: MobileCalendarProps) {
        super(props);
        this.start = 0;
        this.width = {flex: 4};
        this.height ={flex: 4};
        this.step = 1;
        this.stop = this.props.maximumStars;
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { readOnly } = this.props;
        // Read only allows to show half stars, editable only, whole stars.
        this.fractions = readOnly ? 2 : 1;
        this.stop = this.props.maximumStars;

        return createElement("div", {
            className: classNames("widget-star-rating", this.props.className),
            style: this.props.style
        },
                 );
    }

    private getRate(props: MobileCalendarProps) {
        const maximumValue = this.step * this.stop;
        if (props.initialRate > maximumValue) {
            return maximumValue;
        } else if (props.initialRate < this.start) {
            return this.start;
        }
        // This helps to round off to the nearest fraction.
        // eg fraction 2 or 0.5, rounds off a rate 1.4 to 1.5, 1.2 to 1.0
        return Math.round(props.initialRate * this.fractions) / this.fractions as number;
    }

    private onChange(rate: number) {
        if (this.props.handleOnChange) {
            // Number(rate < 1 ? 1 : rate) deals with library bugs of passing 0 rates.
            this.props.handleOnChange(Number(rate < 1 ? 1 : rate));
        }
    }
}
