import { shallow } from "enzyme";
import { createElement } from "react";
import * as FaCalendar from "react-icons/lib/fa/calendar";

import { DateInput, DateInputProps } from "../DateInput";

describe("DatePicker", () => {
    const shallowRenderDatePicker = (props: DateInputProps) => shallow(createElement(DateInput, props));
    const defaultProps: DateInputProps = {
        attribute: "date",
        onClick: jasmine.createSpy("click"),
        printDate: "12/05/1994"
    };

    it("should render the structure correctly", () => {
        const createDate = shallowRenderDatePicker(defaultProps);

        expect(createDate).toBeElement(
            createElement("div", {},
                createElement("input", {
                    attribute: defaultProps.attribute,
                    className: "widget-date-picker-form",
                    onClick: defaultProps.onClick,
                    placeholder: defaultProps.printDate,
                    type: "text"
                }),
                createElement("a", {},
                    createElement(FaCalendar, {
                        className: "widget-date-picker-form-row",
                        onClick: defaultProps.onClick
                    })
                )
            )
        );
    });

    it("should respond to onclick events", () => {
        const createDate = shallowRenderDatePicker(defaultProps);

        createDate.find("input").simulate("click");

        expect(defaultProps.onClick).toHaveBeenCalled();
    });
});
