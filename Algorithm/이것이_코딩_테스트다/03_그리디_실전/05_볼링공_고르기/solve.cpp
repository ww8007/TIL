// 볼링공 고르기

// 입력 예시 1
// 5 3
// 1 3 2 3 2

// 입력 예시 2
// 8 5
// 1 5 4 3 2 4 5 2


#include <iostream>
#include <algorithm>
#include <deque>
using namespace std;

deque <int>d;

int main(void){
    int len, num;
    cin >> len >> num;
    int arr[num];
    for (int i=0;i<num; i++){
        arr[i] = 0;
    }
    int input[len];
    int number;
    for (int i=0; i<len; i++){
        cin >> input[i];
    }
    int idx = 0;
    sort(input, input+len);
    arr[0] = 1;
    for (int i=1; i<len; i++){
        if (input[i-1] != input[i]){
            idx++;
            arr[idx]++;
        }else {
            arr[idx]++;
        }
    }
    int ans= 0;
    for (int i=0; i<num; i++) {
        cout << arr[i] << endl;
    }
    for (int i=0; i<num; i++){
        for (int j=i+1; j<num; j++){
            ans += arr[i] * arr[j];
        }
    }
    cout << ans;
}