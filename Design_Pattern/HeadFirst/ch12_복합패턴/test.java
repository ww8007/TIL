import java.util.Observer;

public interface Quackable {
    public void quack();
}

public class MallardDuck implements Quackable {
    public void quack() {
        System.out.println("꽥꽤");
    }
}

public class RedheadDuck implements Quackable {
    public void quack() {
        System.out.println("꽥꽥");
    }
}


public class Goose {
    public void honk() {
        System.out.println("끽끽");
    }
}
public class GosseAdapter implements Quackable {
    Goose goose;
    public GooseAdapter(Goose goose) {
        this.goose = goose;
    }
    public void quack() {
        goose.honk();
    }
}

public class QuackCounter implements Quackable {
    Quackable duck;
    static int numberOfQuacks;
    public QuackCounter(Quackable duck) {
        this.duck = duck;
    }
    public void quack() {
        duck.quack();
        numberOfQuacks++;
    }
    public static int getQuacks() {
        return numberOfQuacks;
    }
}

Quackable mallardDuck = new QuackCounter(new MallardDuck());

public abstract class AbstractDuckFactory {
    public abstract Quackable createMallardDuck();
    public abstract Quackable createRedheadDuck();
    public abstract Quackable createDuckCall();
    public abstract Quackable createRubberDuck();
}

public class DuckFactory extends AbstractDuckFactory {
    public Quackable createMallardDuck() {
        return new MallardDuck();
    }
    public Quackable createRedheadDuck() {
        return new RedheadDuck();
    }
    public Quackable createDuckCall() {
        return new DuckCall();
    }
    public Quackable createRubberDuck() {
        return new RubberDuck();
    }
}

public class CountingDuckFactory extends AbstractDuckFactory {
    public Quackable createMallardDuck() {
        return new QuackCounter(new MallardDuck());
    }
    public Quackable createRedheadDuck() {
        return new QuackCounter(new RedheadDuck());
    }
    public Quackable createDuckCall() {
        return new QuackCounter(new DuckCall());
    }
    public Quackable createRubberDuck() {
        return new QuackCounter(new RubberDuck());
    }
}

public class DuckSimulator {
    public static void main(String[] args) {
        DuckSimulator simulator = new DuckSimulator();
        AbstractDuckFactory duckFactory = new CountingDuckFactory();
        simulator.simulate(duckFactory);
    }
    void simulate(AbstractDuckFactory duckFactory) {
        Quackable mallardDuck = duckFactory.createMallardDuck();
        Quackable redheadDuck = duckFactory.createRedheadDuck();
        Quackable duckCall = duckFactory.createDuckCall();
        Quackable rubberDuck = duckFactory.createRubberDuck();
        Quackable gooseDuck = new GooseAdapter(new Goose());
        System.out.println("Duck Simulator: With Abstract Factory");
        simulate(mallardDuck);
        simulate(redheadDuck);
        simulate(duckCall);
        simulate(rubberDuck);
        simulate(gooseDuck);
        System.out.println("The ducks quacked " + QuackCounter.getQuacks() + " times");
    }
    void simulate(Quackable duck) {
        duck.quack();
    }
}


public interface QuackObservable {
    public void registerObserver(Observer observer);
    public void notifyObservers();
}

public interface Quackable extends QuackObservable {
    public void quack();
}

public class Observable implements QuackObservable {
    ArrayList observers = new ArrayList();
    QuackObservable duck;
    public Observable(QuackObservable duck) {
        this.duck = duck;
    }
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
    public void notifyObservers() {
        Iterator iterator = observers.iterator();
        while (iterator.hasNext()) {
            Observer observer = (Observer)iterator.next();
            observer.update(duck);
        }
    }
}

public class MallardDuck implements Quackable {
    Observable observable;
    public MallardDuck() {
        observable = new Observable(this);
    }
    public void quack() {
        System.out.println("꽥꽤");
        notifyObservers();
    }
    

    public void notifyObserver(Observer observer) {
        observable.notifyObserver(observer);
    }

    public void notifyObservers () {
        observable.notifyObservers();
    }
    
}

public interface Observer {
    public void update(QuackObservable duck);
}

public class Quackologist implements Observer {
    public void update(QuackObservable duck) {
        System.out.println("꽥꽥학자: " + duck + " 방금 소리를 냈다.");
    }
}

public class HeartAdapter implements BeatModelInterface {
    HeartModelInterface heart;
    public HeartAdapter(HeartModelInterface heart) {
        this.heart = heart;
    }
    public void initialize() {}
    public void on() {}
    public void off() {}
    public void setBPM(int bpm) {}
    public int getBPM() {
        return heart.getHeartRate();
    }
    public void registerObserver(BeatObserver o) {
        heart.registerObserver(o);
    }
    public void removeObserver(BeatObserver o) {
        heart.removeObserver(o);
    }
    public void registerObserver(BPMObserver o) {
        heart.registerObserver(o);
    }
    public void removeObserver(BPMObserver o) {
        heart.removeObserver(o);
    }
}