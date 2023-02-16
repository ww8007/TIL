function extent(nums: number[]) {
	let result: [number, number] | null = null;
	for (const num of nums) {
		if (!result) {
			result = [num, num];
		} else {
			result = [Math.min(result[0], num), Math.max(result[1], num)];
		}
	}
	return result;
}

const range = extent([0, 1, 2]);
if (range) {
	const [min, max] = range;
	const span = max - min;
}

interface UserInfo {
	name: string;
}
interface Posts {}

declare function fetchUser(userId: string): Promise<UserInfo>;
declare function fetchPosts(userId: string): Promise<Posts[]>;

class UserPosts {
	user: UserInfo;
	posts: Posts[];

	constructor(user: UserInfo, posts: Posts[]) {
		this.user = user;
		this.posts = posts;
	}
	static async init(userId: string): Promise<UserPosts> {
		const [user, posts] = await Promise.all([
			fetchUser(userId),
			fetchPosts(userId)
		]);
		return new UserPosts(user, posts);
	}

	getUserName() {
		return this.user.name;
	}
}
