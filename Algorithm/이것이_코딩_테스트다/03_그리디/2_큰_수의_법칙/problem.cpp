#include <iostream>
#include <algorithm>
using namespace std;

// N 개
// M 더하기 
// K번 초과 연속 못함

// 입력 
// 5 8 3
// 2 4 5 4 6

int main(void) {
    int n, m, k;
    cin >> n >> m >> k;
    int a[n];
    for (int i =0; i<n ; i++){
        cin >> a[i];
    }
    int max_num = 0;
    sort(a, a+n); // 정렬
    int count = 0;
    int sum =0;
    for (int i =0; i<m; i++){
        count++;
        if (count == k) {
            sum += a[n-2];
            count = 0;
        }
        else sum += a[n-1];
    }
    cout << sum;
}