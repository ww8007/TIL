public abstract class CaffeineBeverage {
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    abstract void brew();
    abstract void addCondiments();

    void boilWater() {
        System.out.println("물 끓이는 중");
    }

    void pourInCup() {
        System.out.println("컵에 따르는 중");
    }
}

public class Tea extends CaffeineBeverage {
    @Override
    void brew() {
        System.out.println("차를 우려내는 중");
    }

    @Override
    void addCondiments() {
        System.out.println("레몬을 추가하는 중");
    }
}

public class Coffee extends CaffeineBeverage {
    @Override
    void brew() {
        System.out.println("필터를 통해서 커피를 우려내는 중");
    }

    @Override
    void addCondiments() {
        System.out.println("설탕과 우유를 추가하는 중");
    }
}

public abstract class CaffeineBeverageHook {
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        // 
        if (customerWantsCondiments()) {
            addCondiments();
        }
    }

    abstract void brew();
    abstract void addCondiments();

    void boilWater() {
        System.out.println("물 끓이는 중");
    }

    void pourInCup() {
        System.out.println("컵에 따르는 중");
    }

    // 별 내용이 없는 기본 메서드
    // true를 반환하도록 구현
    // 서브클래스에서 필요할 때 오버라이드 할 수 있는
    // 훅(hook) 메서드
    boolean customerWantsCondiments() {
        return true;
    }
}

public class CoffeeWithHook extends CaffeineBeverageHook {
    @Override
    void brew() {
        System.out.println("필터를 통해서 커피를 우려내는 중");
    }

    @Override
    void addCondiments() {
        System.out.println("설탕과 우유를 추가하는 중");
    }

    @Override
    boolean customerWantsCondiments() {
        String answer = getUserInput();

        if (answer.toLowerCase().startsWith("y")) {
            return true;
        } else {
            return false;
        }
    }

    private String getUserInput() {
        String answer = null;

        System.out.print("커피에 우유와 설탕을 넣어 드릴까요? (y/n) ");

        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        try {
            answer = in.readLine();
        } catch (IOException ioe) {
            System.err.println("IO 오류");
        }
        if (answer == null) {
            return "no";
        }
        return answer;
    }
}

public static void sort(Object[] a) {
    Object aux[] = (Object[])a.clone();
    mergeSort(aux, a, 0, a.length, 0);
}

private static void mergeSort(Object src[], Object dest[], int low, int high, int off) {
    // 많은 코드
    for (int i = low; i < high; i++) {
        for (int j = i; j > low && ((Comparable)dest[j-1]).compareTo(dest[j]) > 0; j--) {
            swap(dest, j, j-1);
        }
    }
    // 많은 코드
}

public class Duck implements Comparable<Duck> {
    String name;
    int weight;

    public Duck(String name, int weight) {
        this.name = name;
        this.weight = weight;
    }

    public String toString() {
        return name + " 무게는 " + weight;
    }

    public int compareTo(Duck otherDuck) {

        if (this.weight < otherDuck.weight) {
            return -1;
        } else if (this.weight == otherDuck.weight) {
            return 0;
        } else {
            return 1;
        }
    }
}