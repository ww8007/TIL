// 입력 예시
// 5
// 3 2 1 1 9

#include <iostream>
#include <algorithm>

using namespace std;

int main(void) {
    int num;
    cin >> num;
    int arr[num];
    for (int i =0; i<num; i++) {
        cin >> arr[i];
    }
    bool ok = false;
    int realNum = 0;
    int sum = 0;
    int ans=0;
    int idx= 0;
    sort(arr, arr+num);
    while(1) {
        realNum++;
        ok = false;
        sum = realNum;
        for (int i=0; i<num; i++){
            if (realNum == arr[i]){
                sum = 0;
                ok = true;
                break;
            }
        }
        if (ok == false) {
            for (int i=0; i<num; i++){
            sum -= arr[i];
            idx = arr[i];
            if (sum == 0) break;
            if (sum < 0) {
                sum += arr[i];
                i++;
                if (i==num){
                    ans=realNum;
                    break;
                }
            }
        }
        }
        if (ans != 0) break;
    }
    cout << ans;
}