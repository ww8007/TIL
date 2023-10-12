type ElementType = string | ComponentFunction;
type Child = VNode | string;
type VNode = {
	type: ElementType;
	props: { [key: string]: any };
	children: Child[];
};

type ComponentFunction = (props?: any) => VNode;
type SetState<T> = (newState: T | ((prevState: T) => T)) => void;

let currentInstance: { component: ComponentFunction; props: any } | null = null;
