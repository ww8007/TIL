#include <iostream>

using namespace std;

// int main(void) {
//     int n, m;
//     cin >> n >> m;
//     int count = 0;

//     while(n != 1){
//         if (n % m == 0) {
//             n/=m;
//             count ++;
//         } else {
//             n--;
//             count++;
//         }
//     }
//     cout << count;
// }

int main(void){
    int n, m;

    cin >> n >> m;
    int count = 0;
    while(1) {
        if (n % m ==0) {
            count += 1;
            n /= m;
            if (n < m) break;
        }
        else {
            n--;
            count++;
        }
    }
    cout << count;
}