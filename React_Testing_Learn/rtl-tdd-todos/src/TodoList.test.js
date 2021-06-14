import React from "react";
import TodoList from "./TodoList";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("<TodoList />", () => {
   const sampleTodos = [
      {
         id: 1,
         text: "TDD 배우기",
         done: true,
      },
      {
         id: 2,
         text: "react-test-library 사용하기",
         done: true,
      },
   ];
   it("renders todos propelry", () => {
      const { getByText } = render(<TodoList todos={sampleTodos} />);
      getByText(sampleTodos[0].text);
      getByText(sampleTodos[1].text);
   });

   it("calls onToggle and onRemove", () => {
      const onToggle = jest.fn();
      const onRemove = jest.fn();
      const { getByText, getAllByText } = render(
         <TodoList
            todos={sampleTodos}
            onToggle={onToggle}
            onRemove={onRemove}
         />
      );
      fireEvent.click(getByText(sampleTodos[0].text));
      expect(onToggle).toBeCalledWith(sampleTodos[0].id);
      fireEvent.click(getAllByText("삭제")[0]);
      expect(onRemove).toBeCalledWith(sampleTodos[0].id);
   });
});
