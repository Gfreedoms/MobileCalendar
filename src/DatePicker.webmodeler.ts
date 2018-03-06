import { Component, createElement } from "react";

import { DatePicker, DatePickerState } from "./components/DatePicker";
import { ContainerProps } from "./components/DatePickerContainer";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<ContainerProps, DatePickerState> {

    constructor(props: ContainerProps) {
        super(props);
    }

    render() {
        return createElement(DatePicker as any, {
            ...this.props as ContainerProps,
            onClickAction: () => { return; }
        });
    }
}

export function getPreviewCss() {
    return require("./ui/Camera.scss");
}

export function getVisibleProperties(value: any, visibility: any) {
    visibility.customCameraDimensions = value.cameraDimensions === "custom";

    return visibility;
}
