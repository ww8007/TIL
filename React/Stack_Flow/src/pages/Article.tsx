import { ActivityComponentType } from "@stackflow/react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../lib/stackflow";

type ArticleParams = {
	title: string;
};
const Article: ActivityComponentType<ArticleParams> = ({ params }) => {
	const { pop } = useFlow();
	const onClick = () => {
		pop();
	};
	return (
		<AppScreen appBar={{ title: "Article" }}>
			<div>
				<h1
					style={{
						color: "#5D5FEF"
					}}
				>
					{params.title}
				</h1>
				<button onClick={onClick}>Go Back</button>
			</div>
		</AppScreen>
	);
};

export default Article;
