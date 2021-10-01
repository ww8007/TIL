#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

int main(void){
    int size;
    cin >> size;
    string input;
    cin.ignore(); // 버퍼 비우기 
    getline(cin, input);
    int len = input.length();
    int x = 1;
    int y = 1;
    for (int i=0; i<len; i+=2) {
        switch (input[i])
        {
        case 'U':
            if (y > 1){
                y--;
            }
            break;
        case 'R':
        {
            x++;
        }
            break;
        case 'D':
            if (y < size) {
                y++;
            }
            break;
        case 'L':
            if (x > 1) {
                x--;
            }
            break;
        }
        
    }
    printf("%d%d", y, x);
}