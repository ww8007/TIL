import React, { useEffect } from "react";

interface Props {
	target: React.RefObject<HTMLElement>;
	rootElement?: HTMLElement | null;
	threshold?: number;
	onIntersect: (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => void;
}

const useIntersection = ({
	target,
	rootElement = null,
	threshold = 1.0,
	onIntersect
}: Props) => {
	useEffect(() => {
		if (!target.current) return;
		const io = new IntersectionObserver(onIntersect, {
			root: null,
			threshold,
			rootMargin: "0px"
		});
		io.observe(target.current);

		return () => io.disconnect();
	}, [onIntersect, target, threshold]);
};

export default useIntersection;
