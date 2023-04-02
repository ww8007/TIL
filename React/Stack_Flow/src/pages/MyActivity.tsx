import { ActivityComponentType, useActivity, useStack } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../lib/stackflow";
import { useEffect } from "react";

const MyActivity: ActivityComponentType = () => {
	const stack = useStack();
	const activity = useActivity();
	const { push, replace } = useFlow();

	const onClick = () => {
		push("Article", { title: "My Article" });
	};

	const onClickReplace = () => {
		replace("Article", { title: "My Article" });
	};

	const onClickStepPush = () => {
		push("StepPushArticle", { title: "My Article23333" });
	};

	useEffect(() => {
		console.log("현재 쌓여진 액티비티들:", stack.activities);
		console.log("전체 전환 상태:", stack.globalTransitionState);
		console.log(
			"초기에 설정된 Transition Duration 옵션",
			stack.transitionDuration
		);
	}, [stack]);

	useEffect(() => {
		console.log("현재 액티비티의 전환 상태:", activity.transitionState);
	}, [stack]);

	return (
		<AppScreen appBar={{ title: "My Activity" }}>
			<div>My Activity</div>
			<button onClick={onClick}>Go to Article</button>
			<button onClick={onClickReplace}>Replace Article</button>
			<button onClick={onClickStepPush}>Step Push Article</button>
		</AppScreen>
	);
};

export default MyActivity;
