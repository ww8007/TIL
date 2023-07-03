function solution(players, callings) {
	const map = new Map();

	players.map((player, idx) => {
		map.set(player, idx);
	});

	callings.forEach((player) => {
		const curIdx = map.get(player);

		const prevPlayer = players[curIdx - 1];

		players[curIdx - 1] = player;
		players[curIdx] = prevPlayer;

		map.set(player, map.get(player) - 1);
		map.set(prevPlayer, map.get(prevPlayer) + 1);
	});

	return players;
}
