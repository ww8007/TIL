// 입력 에시1
// K1KA5CB7

// 입력예시2
// ajkdlsi412k4jsj9d

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

vector <char> q;

int main(void){
    string input;
    int num = 0;
    int count = 0;
    getline(cin, input);
    for (int i=0; i<input.length(); i++) {
        if (isalpha(input[i])) {
            q.push_back(input[i]); 
            count++;
        }
        else num += input[i] - '0';
    }
    sort(q.begin(), q.end());

    for (int i=0; i<q.size(); i++){
        cout << q[i];
    }
    if (num) cout << num; 
}