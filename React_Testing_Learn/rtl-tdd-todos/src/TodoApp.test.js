import React from "react";
import TodoApp from "./TodoApp";
import { render } from "@testing-library/react";

describe("<TodoApp />", () => {
   it("reders TodoForm and TodoList", () => {
      const { getByText, getByTestId } = render(<TodoApp />);
      getByText("등록");
      getByTestId("TodoList");
   });
});
