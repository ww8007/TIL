import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useRef, useState } from "react";
import { useGETPokemonList } from "../api/pokemon";
import useIntersection from "../service/useIntersection";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PokeList = () => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status
	} = useGETPokemonList();

	const bottom = useRef(null);

	const onIntersect = useCallback(
		([entry]: IntersectionObserverEntry[]) => {
			if (entry.isIntersecting) {
				fetchNextPage();
			}
		},
		[fetchNextPage]
	);

	useIntersection({
		onIntersect,
		target: bottom
	});

	return (
		<StyleMain id='root'>
			{data?.pages.map((page, i) => (
				<StyleWrapper key={i}>
					{page.result.pokemons.map((pokemon, index) => (
						<PokeItem key={pokemon.name} {...pokemon} id={i * 10 + index + 1} />
					))}
				</StyleWrapper>
			))}
			<div ref={bottom} />
			{isFetchingNextPage && <p>계속 불러오는 중</p>}
		</StyleMain>
	);
};

export default PokeList;

const StyleMain = styled.main`
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
`;

const StyleWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	column-gap: 1rem;
	row-gap: 3rem;
`;

interface Props {
	name: string;
	url: string;
	id: number;
}

const PokeItem = ({ name, url, id }: Props) => {
	const target = useRef(null);
	const [visible, setVisible] = useState(false);

	const onIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
		entry.isIntersecting ? setVisible(true) : setVisible(false);
	}, []);

	useIntersection({ target, onIntersect, threshold: 0.1 });

	return (
		<StyledPokeItem>
			<div ref={target}>
				{visible && (
					<StyleColumn>
						<LazyLoadImage
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
							alt={name}
						/>
						{name}
					</StyleColumn>
				)}
			</div>
		</StyledPokeItem>
	);
};

const StyledPokeItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30%;
	height: 10rem;
	border: 1px solid black;
	flex: 1 0 1;
	background-color: #424242;
	border-radius: 20px;
	transition: all 0.3s ease-in-out;
	:hover {
		background-color: #616161;
	}
	:active {
		background-color: #616161;
	}
`;

const StyleColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
