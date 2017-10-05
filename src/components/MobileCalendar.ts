import * as classNames from "classnames";
import { Component, createElement } from "react";

export interface MobileCalendarProps {
    className?: string;
    initialRate: number;
    readOnly: boolean;
    maximumStars: number;
    style?: object;
   }

export class MobileCalendar extends Component<MobileCalendarProps, {}> {
    }
