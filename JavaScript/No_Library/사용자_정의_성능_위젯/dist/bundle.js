/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var panel;
var start;
var frame = 0;
var create = function () {
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.left = "0";
    div.style.top = "0";
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.background = "black";
    div.style.color = "white";
    return div;
};
var tick = function () {
    // 프레임 수를 증가
    frame++;
    // 현재
    var now = window.performance.now();
    // 1초마다 FPS를 업데이트
    if (now >= start + 1000) {
        panel.innerText = "".concat(frame, " FPS");
        start = now;
        frame = 0;
    }
    window.requestAnimationFrame(tick);
};
var init = function (parent) {
    if (parent === void 0) { parent = document.body; }
    panel = create();
    window.requestAnimationFrame(function () {
        start = window.performance.now();
        parent.appendChild(panel);
        tick();
    });
};
init();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ init: init });

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsSUFBSSxLQUFxQixDQUFDO0FBQzFCLElBQUksS0FBYSxDQUFDO0FBQ2xCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUVkLElBQU0sTUFBTSxHQUFHO0lBQ2QsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUxQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDN0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNwQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUMvQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7SUFFMUIsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDLENBQUM7QUFFRixJQUFNLElBQUksR0FBRztJQUNaLFlBQVk7SUFDWixLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUs7SUFDTCxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLGlCQUFpQjtJQUNqQixJQUFJLEdBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBRyxLQUFLLFNBQU0sQ0FBQztRQUNqQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osS0FBSyxHQUFHLENBQUMsQ0FBQztLQUNWO0lBQ0QsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQztBQUVGLElBQU0sSUFBSSxHQUFHLFVBQUMsTUFBc0I7SUFBdEIsa0NBQVMsUUFBUSxDQUFDLElBQUk7SUFDbkMsS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBRWpCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUM1QixLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksRUFBRSxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQztBQUVQLGlFQUFlLEVBQUUsSUFBSSxRQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdC8uL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJsZXQgcGFuZWw6IEhUTUxEaXZFbGVtZW50O1xubGV0IHN0YXJ0OiBudW1iZXI7XG5sZXQgZnJhbWUgPSAwO1xuXG5jb25zdCBjcmVhdGUgPSAoKSA9PiB7XG5cdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0ZGl2LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuXHRkaXYuc3R5bGUubGVmdCA9IFwiMFwiO1xuXHRkaXYuc3R5bGUudG9wID0gXCIwXCI7XG5cdGRpdi5zdHlsZS53aWR0aCA9IFwiNTBweFwiO1xuXHRkaXYuc3R5bGUuaGVpZ2h0ID0gXCI1MHB4XCI7XG5cdGRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibGFja1wiO1xuXHRkaXYuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG5cblx0cmV0dXJuIGRpdjtcbn07XG5cbmNvbnN0IHRpY2sgPSAoKSA9PiB7XG5cdC8vIO2UhOugiOyehCDsiJjrpbwg7Kad6rCAXG5cdGZyYW1lKys7XG5cdC8vIO2YhOyerFxuXHRjb25zdCBub3cgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdC8vIDHstIjrp4jri6QgRlBT66W8IOyXheuNsOydtO2KuFxuXHRpZiAobm93ID49IHN0YXJ0ICsgMTAwMCkge1xuXHRcdHBhbmVsLmlubmVyVGV4dCA9IGAke2ZyYW1lfSBGUFNgO1xuXHRcdHN0YXJ0ID0gbm93O1xuXHRcdGZyYW1lID0gMDtcblx0fVxuXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xufTtcblxuY29uc3QgaW5pdCA9IChwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSA9PiB7XG5cdHBhbmVsID0gY3JlYXRlKCk7XG5cblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0c3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKHBhbmVsKTtcblx0XHR0aWNrKCk7XG5cdH0pO1xufTtcblxuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==