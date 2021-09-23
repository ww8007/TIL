// 3. 문자열 뒤집기

// 입력 조건
// 첫째 줄에 0과 1로만 이루어진 문자열 S가 주어짐
// S의 길이는 100만보다 작음

// 출력 조건
// 첫째 줄에 다솜이가 해야 하는 행동의 최소 횟수를 출력

// 입력 예시
// 0001100

#include <iostream>
#include <algorithm>
#include <string>
#include <deque>
using namespace std;

// deque<int>numDeque;

// string num;

// int main(void) {
//     string number;
//     getline(cin, number);
//     int len = number.length();
//     int arr[len];
//     int zeroCount, oneCount = 0;
//     int ans = 0;
//     for (int i =0; i< len; i++){
//         arr[i] = int(number[i]) - 48;
//         numDeque.push_front(arr[i]);
//         if (arr[i] == 1) oneCount++;
//         else zeroCount++;
//     }
//     int prevNum = 0;
//     if (zeroCount >= oneCount) {
//         while(!numDeque.empty()) {
//             prevNum = numDeque.front();
//             numDeque.pop_front();
//             if (prevNum != numDeque.front() && prevNum == 0) {
//                 ans++;
//             }
//         }
//     } else {
//         while(!numDeque.empty()) {
//             prevNum = numDeque.front();
//             numDeque.pop_front();
//             if (prevNum != numDeque.front() && prevNum == 1) {
//                 ans++;
//             }
//         }
//     }
//     cout << ans;
// }

int main(void) {
    string number;
    int ans = 0;
    getline(cin, number);
    int len = number.length();
    int arr[len];
    int zeroCount = 0;
    int oneCount = 0;
    if (arr[0] == 1) oneCount +=1;
    else zeroCount +=1;
    
    for (int i=1; i<len; i++) {
        if (number[i-1] != number[i] && number[i-1] == '1'){
            oneCount++;
        } else if (number[i-1] != number[i] && number[i-1] == '0') {
            zeroCount++;
        } 
    }
    if (oneCount <= zeroCount) ans = oneCount;
    else ans = zeroCount;
    cout << ans;
}