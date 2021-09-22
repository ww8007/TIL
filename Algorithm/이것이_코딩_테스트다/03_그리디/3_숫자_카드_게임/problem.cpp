#include <iostream>
#include <algorithm>
using namespace std;

int main(void) {
    int row, col;
    cin >> row >> col;
    int num[col][row];
    int min = 0; // 최소값이자 최대값

    for (int i =0; i<col; i++) {
        for (int j=0; j<row; j++){
            cin >> num[i][j];
        }
    }
    for (int i=0; i<col; i++) {
        sort(num[i], num[i] + row);   
        if (num[i][0] > min) {
            min = num[i][0];
        }
    }
    cout << min;
}