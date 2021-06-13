import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("<TodoForm />", () => {
   it("has input and a button", () => {
      const { getByText, getByPlaceholderText } = render(<TodoForm />);
      getByPlaceholderText("할 일을 입력하세요"); // input 이 있는지 확인
      getByText("등록"); // button이 있는지 확인
   });

   it("changes input", () => {
      const { getByPlaceholderText } = render(<TodoForm />);
      const input = getByPlaceholderText("할 일을 입력하세요");
      fireEvent.change(input, {
         target: {
            value: "TDD 배우기",
         },
      });
      expect(input).toHaveAttribute("value", "TDD 배우기");
   });
});
