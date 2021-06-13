import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";

describe("<Profile>", () => {
  it("matches snapshot", () => {
    const utils = render(<Profile username={"ww8007"} name="장동현"></Profile>);
    expect(utils.container).toMatchSnapshot();
  });
  it("shows the props correctly", () => {
    const utils = render(<Profile username="ww8007" name="장동현"></Profile>);
    utils.getByText("ww8007");
    utils.getByText("(장동현)");
    utils.getByText(/장/);
  });
});
