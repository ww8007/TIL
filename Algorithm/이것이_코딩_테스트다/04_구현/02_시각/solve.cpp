#include <algorithm>
#include <iostream>
using namespace std;

int main(void){
    int h;
    cin >> h;
    int ans=0;
    int time = 0;
    for (int i=0; i<=h; i++){
        for (int j=0; j<60; j++){
            for(int k=0; k<60; k++){
                if (k % 10 == 3 || k/10 == 3 || j/10 == 3 ||  j % 10 == 3 || i % 10 == 3){
                    ans++;
                }
                else {
                    time++;
                }
            }
        }
    }
    ans++;
    cout << ans << '\n';
}