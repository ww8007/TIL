#include <iostream>
#include <string>
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

vector <int>food_times;

int solution(long long k) {
    int answer = 0;
    int len = 7;
    int food_time2[7] = {3, 1, 1, 2, 4, 3};
    
    int sum = 0;
    for (int i=len-1; i>=0; i--){
        food_times.push_back(food_time2[i]);
    }
    for (int i=0; i<len; i++) {
        sum += food_time2[i];
    }
    // reverse(food_times.begin(), food_times.end());
    // int sum = accumulate(food_times.begin(), food_times.end(), 0);
    int count = 0;
    cout << sum << endl;
    if (sum <= k) { // 
        answer = -1;
    } else {
        int minus = int(sum / k);
        sum %= k;
        while(1){
            int back = food_times.back();
            if (back < minus) {
                food_times.pop_back();
            } else {
                count++;
                sum--;
                food_times.pop_back();
            }
            if (sum ==0) {
                answer = count;
                break;
            }
        }
    }
    return answer;
}


int main(void) {
         
    int ans = solution(12);
    cout << ans;
}