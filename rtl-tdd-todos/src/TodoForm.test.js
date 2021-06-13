import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoForm from "./TodoForm";
describe("<TodoForm />", () => {
   const setup = (props = {}) => {
      const utils = render(<TodoForm {...props} />);
      const { getByPlaceholderText, getByText } = utils;
      const input = getByPlaceholderText("할 일을 입력하세요");
      const button = getByText("등록");
      return {
         ...utils,
         input,
         button,
      };
   };
   it("has input and a button", () => {
      const { input, button } = setup();
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
   });

   it("changes input", () => {
      const { input } = setup();
      fireEvent.change(input, {
         target: {
            value: "TDD 배우기",
         },
      });
      expect(input).toHaveAttribute("value", "TDD 배우기");
   });
   it("calls onInsert and clears input", () => {
      const onInsert = jest.fn();
      const { input, button } = setup({ onInsert });

      // 수정하고
      fireEvent.change(input, {
         target: {
            value: "TDD 배우기",
         },
      });
      // 버튼 클릭
      fireEvent.click(button);
      expect(onInsert).toBeCalledWith("TDD 배우기"); // onInsert 가 'TDD 배우기' 파라미터가 호출됐어야함
      expect(input).toHaveAttribute("value", ""); // input이 비워져야함
   });
});
