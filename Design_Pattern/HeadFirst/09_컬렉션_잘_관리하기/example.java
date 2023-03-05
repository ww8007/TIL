for (int i =0 ; i < breakfastItems.size(); i++) {
    MenuItem menuitem = breakfastItems.get(i);
}

for (int i = 0; i < lunchItems.size(); i++) {
    MenuItem menuitem = lunchItems[i];
}

public interface Iterator {
    boolean hasNext();
    MenuItem next();
}

public class DinnerMenuIterator implements Iterator {
    MenuItem[] items;
    int position = 0;

    public DinnerMenuIterator(MenuItem[] items) {
        this.items = items;
    }

    public MenuItem next() {
        MenuItem menuItem = items[position];
        position = position + 1;
        return menuItem;
    }

    public boolean hasNext() {
        if (position >= items.length || items[position] == null) {
            return false;
        } else {
            return true;
        }
    }
}

public class DinnerMenu {
    static final int MAX_ITEMS = 6;
    int numberOfItems = 0;
    MenuItem[] menuItems;

    public Iterator createIterator() {
        return new DinnerMenuIterator(menuItems);
    }
}

List<MenuItem> breakfastItems = new ArrayList<MenuItem>();

Iterator iterator = breakfastItems.iterator();
while (iterator.hasNext()) {
    MenuItem menuItem = (MenuItem)iterator.next();
    System.out.println(menuItem.getName());
}

for (MenuItem item: menu) {
    System.out.println(item.getName() + ", ");
    System.out.println(item.getPrice() + " -- ");
    System.out.println(item.getDescription());
}

public void printMenu() {
    Iterator breakfastIterator = breakfastMenu.createIterator();
    Iterator lunchIterator = lunchMenu.createIterator();
    Iterator dinnerIterator = dinnerMenu.createIterator();

    System.out.println("MENU\n----\nBREAKFAST");
    printMenu(breakfastIterator);
    System.out.println("\nLUNCH");
    printMenu(lunchIterator);
    System.out.println("\nDINNER");
    printMenu(dinnerIterator);
}

public class Waitress {
    List <Menu> menus;

    public Waitress(List<Menu> menus) {
        this.menus = menus;
    }   

    public void printMenu() {
        Iterator menuIterator = menus.iterator();
        while (menuIterator.hasNext()) {
            Menu menu = (Menu)menuIterator.next();
            printMenu(menu.createIterator());
        }
    }

    private void printMenu(Iterator iterator) {
        while (iterator.hasNext()) {
            MenuItem menuItem = (MenuItem)iterator.next();
            System.out.print(menuItem.getName() + ", ");
            System.out.print(menuItem.getPrice() + " -- ");
            System.out.println(menuItem.getDescription());
        }
    }
}

public abstract class MenuComponent {
    public void add(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public void remove(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public MenuComponent getChild(int i) {
        throw new UnsupportedOperationException();
    }

    public String getName() {
        throw new UnsupportedOperationException();
    }

    public String getDescription() {
        throw new UnsupportedOperationException();
    }

    public double getPrice() {
        throw new UnsupportedOperationException();
    }

    public boolean isVegetarian() {
        throw new UnsupportedOperationException();
    }

    public void print() {
        throw new UnsupportedOperationException();
    }
}

public class MenuItem extends MenuComponent {
    String name;
    String description;
    boolean vegetarian;
    double price;

    public MenuItem(String name, String description, boolean vegetarian, double price) {
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }


    // 전과 달라진 부분
    // MenuComponent 클래스에 있는 print() 메소드를 재정의
    // MenuItem에 이 메서드를 호출하면
    // 메뉴에 수록해야 할 모든 내용이 출력
    public void print() {
        System.out.print(" " + getName());
        if (isVegetarian()) {
            System.out.print("(v)");
        }
        System.out.println(", " + getPrice());
        System.out.println(" -- " + getDescription());
    }
}

public class Menu extends MenuComponent {
    List<MenuComponent> menuComponents = new ArrayList<MenuComponent>();
    String name;
    String description;

    public Menu(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public void add(MenuComponent menuComponent) {
        menuComponents.add(menuComponent);
    }

    public void remove(MenuComponent menuComponent) {
        menuComponents.remove(menuComponent);
    }

    public MenuComponent getChild(int i) {
        return menuComponents.get(i);
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void print() {
        System.out.print("\n" + getName());
        System.out.println(", " + getDescription());
        System.out.println("---------------------");

        Iterator iterator = menuComponents.iterator();
        while (iterator.hasNext()) {
            MenuComponent menuComponent = (MenuComponent)iterator.next();
            menuComponent.print();
        }
    }
}