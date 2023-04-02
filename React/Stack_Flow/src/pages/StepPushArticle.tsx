import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useStepFlow } from "../lib/stackflow";

type StepPushArticleArticleParams = {
	title: string;
};
const StepPushArticle: ActivityComponentType<StepPushArticleArticleParams> = ({
	params
}) => {
	// 타입 안정성을 위해 현재 액티비티의 이름을 넣어줘요
	const { stepPush, stepPop, stepReplace } = useStepFlow("StepPushArticle");

	const onNextClick = () => {
		// `stepPush()`을 호출하면 params.title이 변경돼요.
		stepPush({
			title: "Next Title"
		});
	};

	const onClickStepPop = () => {
		stepPop();
	};

	const onClickStepReplace = () => {
		stepReplace({
			title: "Replace Title"
		});
	};

	return (
		<AppScreen appBar={{ title: params.title }}>
			<div>
				<h1
					style={{
						color: "#5D5FEF"
					}}
				>
					{params.title}
				</h1>
				<button onClick={onNextClick}>next</button>
				<button onClick={onClickStepPop}>step pop</button>
				<button onClick={onClickStepReplace}>step replace</button>
			</div>
		</AppScreen>
	);
};

export default StepPushArticle;
