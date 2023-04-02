import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import MyActivity from "../pages/MyActivity";
import Article from "../pages/Article";
import StepPushArticle from "../pages/StepPushArticle";

export const { Stack, useFlow, useStepFlow } = stackflow({
	transitionDuration: 350,
	initialActivity: () => "MyActivity",
	plugins: [
		basicRendererPlugin(),
		basicUIPlugin({
			theme: "cupertino"
		})
	],
	activities: {
		MyActivity,
		Article,
		StepPushArticle
	}
});
