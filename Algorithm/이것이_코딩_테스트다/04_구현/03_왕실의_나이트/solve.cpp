#include <iostream>
#include <string>
using namespace std;

int x[8] = {2, 2, 1, -1, -2, -2, 1, -1};
int y[8] = {1, -1, 2, 2, 1, -1, -2, -2};

int main(void){
    string input;
    getline(cin, input);
    int pos_x = input[1] - 48;
    int pos_y = input[0] - 96;
    int ans = 0;
    for (int i=0; i<8; i++){
        if (pos_x + x[i] <= 8 && pos_x + x[i] >= 1) {
            if (pos_y + y[i] <= 8 && pos_y + y[i] >= 1){
                ans++;
            }
        }
    }
    cout << ans << '\n';
}