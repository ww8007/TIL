import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("<Counter></Counter>", () => {
  it("matches snapshot", () => {
    const utils = render(<Counter></Counter>);
    expect(utils.container).toMatchSnapshot();
  });
  it("has a number and two buttons", () => {
    const utils = render(<Counter></Counter>);
    utils.getByText("0");
    utils.getByText("+1");
    utils.getByText("-1");
  });
  it("increases", () => {
    const utils = render(<Counter></Counter>);
    const number = utils.getByText("0");
    const plusButton = utils.getByText("+1");
    //클릭 이벤트 두 번 발생시키기
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent("2");
    expect(number.textContent).toBe("2");
  });
  it("decreases", () => {
    const utils = render(<Counter></Counter>);
    const number = utils.getByText("0");
    const plusButton = utils.getByText("-1");
    //클릭 이벤트 두 번 발생시키기
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(number).toHaveTextContent("-2");
    expect(number.textContent).toBe("-2");
  });
});
