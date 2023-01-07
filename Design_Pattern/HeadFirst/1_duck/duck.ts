interface FlyBehavior {
	fly: () => string;
}

interface QuackBehavior {
	quack: () => string;
}

abstract class Duck {
	flyBehavior: FlyBehavior;
	quackBehavior: QuackBehavior;

	constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
		this.flyBehavior = flyBehavior;
		this.quackBehavior = quackBehavior;
	}

	abstract display(): void;

	public performFly(): void {
		this.flyBehavior.fly();
	}

	public performQuack(): void {
		this.quackBehavior.quack();
	}
}

class FlyWithWings implements FlyBehavior {
	public fly = () => {
		console.log("날고 있어요");
	};
}

class FlyNoWay implements FlyBehavior {
	fly = () => {
		console.log("저는 못 날아요");
	};
}

class Quack implements QuackBehavior {
	quack = () => {
		console.log("꽉");
	};
}

class MuteDuck implements QuackBehavior {
	quack(): string {
		console.log("조용");
	}
}

class MallardDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new Quack());
	}

	display = () => {
		console.log("저는 물오리 입니다");
	};
}

class MiniDuckSimulator {
	public main = (args: string[]) => {
		const mallard = new MallardDuck();
		mallard.performFly;
		mallard.performQuack;
		mallard.display();
	};
}

const my = new MiniDuckSimulator();

my.main(["hi"]);
