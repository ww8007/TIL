// 모험가 길드
// 입력 조건
// 1 <= N <= 100,000
// 둘째 줄에 각 모험가의 공포도의 값을 N 이하의 자연수로 주어지며
// 각 자연수는 공백으로 굽

// 출력 조건
// ┗ 여행을 떠날 수 잇는 그룹 수의 최댓값을 출력

// 입력 예시
// 5
// 2 3 1 2 2

// 출력 예시
// 2

# include <iostream>
# include <algorithm>
using namespace std;

int main(void) {
    int num;
    int count = 0;
    int ans = 0;
    cin >> num;
    int arr[num];
    for (int i=0; i<num; i++){
        cin >> arr[i];
    }
    sort(arr, arr+num);
    for (int i=0; i<num; i++) {
        count++;
        if (count >= arr[i]){
            ans += 1;
            count = 0;
        }
    }
    cout << ans;
}