import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const OFFSET = 30; // 나중에 편하게 바꿀 수 있도록 page offset을 상수로 설정

interface Pokemon {
	name: string;
	url: string;
}

interface ServerResponse {
	count: number;
	next: string;
	previous: string;
	results: Pokemon[];
}

interface PokemonList {
	pokemons: Pokemon[];
	next: string;
}

interface PokemonListParams {
	pageParam: number;
}

export const useGETPokemonList = () => {
	return useInfiniteQuery(
		["pokemonList"],
		async ({ pageParam = 0 }) => {
			const res = await getPokemonList({ pageParam });
			return {
				result: res,
				next: res.next
			};
		},
		{
			getNextPageParam: (lastPage) => {
				const { next } = lastPage;
				return Number(new URL(next).searchParams.get("offset"));
			},
			refetchOnWindowFocus: false,
			cacheTime: 60000
		}
	);
};

export const getPokemonList = async ({
	pageParam = OFFSET
}: PokemonListParams): Promise<PokemonList> => {
	const { data } = await axios.get<ServerResponse>(
		"https://pokeapi.co/api/v2/pokemon",
		{
			params: {
				limit: OFFSET,
				offset: pageParam
			}
		}
	);
	return {
		pokemons: data.results,
		next: data.next
	};
};
