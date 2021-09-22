#include <iostream>

using namespace std;

int main (void) {
    int n = 1260;
    int count = 0;
    int coin_type[] = {500, 100, 50, 10};

    for (int i =0; i<4; i++){
        count += 1;
        n %= coin_type[i];
    }
    cout << count;
};