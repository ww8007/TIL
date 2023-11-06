import { useEffect, useState, useRef } from "react";

interface ImageGalleryProps {
	images: string[];
}

const App = () => {
	useEffect(() => {
		const rootMargin = "0px 0px 100px 0px";
		const margins = rootMargin.split(" ").map((val) => parseInt(val));

		const topOverlay = document.createElement("div");
		topOverlay.style.position = "fixed";
		topOverlay.style.top = "0";
		topOverlay.style.left = "0";
		topOverlay.style.right = "0";
		topOverlay.style.height = `${margins[0]}px`;
		topOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.3)";

		const bottomOverlay = document.createElement("div");
		bottomOverlay.style.position = "fixed";
		bottomOverlay.style.bottom = "0";
		bottomOverlay.style.left = "0";
		bottomOverlay.style.right = "0";
		bottomOverlay.style.height = `${margins[2]}px`;
		bottomOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.3)";

		document.body.appendChild(topOverlay);
		document.body.appendChild(bottomOverlay);

		return () => {
			document.body.removeChild(topOverlay);
			document.body.removeChild(bottomOverlay);
		};
	}, []);

	const [images] = useState<string[]>([
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/300"
	]);

	return (
		<div id='box'>
			<h1>Image Gallery</h1>
			<ImageGallery images={images} />
			<Box />
			<div
				style={{
					height: "1000px"
				}}
			/>
		</div>
	);
};

export default App;

function ImageGallery({ images }: ImageGalleryProps) {
	// Use browser console and console.log() for debugging
	return (
		<>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					width: "400px",
					marginTop: "400px"
				}}
			>
				{images.map((image, idx) => (
					<LazyImage src={image} alt={`${idx}th image`} key={idx} />
				))}
			</div>
		</>
	);
}

const Box = () => {
	return (
		<div
			style={{
				position: "fixed",
				width: "100%",
				border: "1px solid red",
				height: "calc(100% - 200px)", // 높이를 증가시킵니다.
				top: "100px",
				zIndex: 200
			}}
		/>
	);
};

interface LazyImageProps {
	src: string;
	alt: string;
}

const LazyImage = ({ src, alt }: LazyImageProps) => {
	const [loaded, setLoaded] = useState(false);

	const imageRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					setLoaded(true);
				} else {
					setLoaded(false);
				}
			},
			{
				rootMargin: "0px 0px -100px 0px"
			}
		);

		if (imageRef.current) {
			observer.observe(imageRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div ref={imageRef}>
			{!!loaded && (
				<img
					src={src}
					alt={alt}
					style={{
						width: "110px",
						height: "110px"
					}}
				/>
			)}
			{!loaded && (
				<div
					style={{
						width: "110px",
						height: "110px"
					}}
				/>
			)}
		</div>
	);
};
