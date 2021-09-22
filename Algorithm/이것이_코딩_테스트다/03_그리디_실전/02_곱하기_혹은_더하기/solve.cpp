// 입력 조건
// 첫째 줄에 여러 개의 숫자로 구성된 하나의
// 문자열 S가 주어짐 1 보다 크고 20 보다 작음

// 출력 조건 
// 첫째 줄에 만들어질 수 잇는 가장 큰 수를 출력

// 입력예시 1
// 02984

// 출력 예시 1
// 576

// 입력 예시 2
// 567

// 출력 예시 2
// 210

#include <iostream>
#include <algorithm>
#include <string>
#include <stdlib.h>
#include <sstream>
using namespace std;

int main(void) {
    string number;
    int ans = 0;
    getline(cin, number);
    int len = number.length();     
    int arr[len];
    cout << len << endl;
    for (int i =0; i< len; i++){
        arr[i] = (int(number[i]) - 48);
    }
    sort(arr, arr+len);
    for (int i=0; i<len; i++) {
        cout << arr[i] << endl;
    }
    if (arr[0]==0) {
        ans += arr[1];
        if (len != 2) {
            for (int i=2; i<len; i++){
                ans *= arr[i];
            } 
        }
    } else {
        ans = 1;
        for (int i=0; i<len; i++){
            ans *= arr[i];
        }
    }
    cout << ans;
}