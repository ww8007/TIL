#include <iostream>
#include <string>
using namespace std;

int main(void){
    string number;
    getline(cin, number);
    int len = number.length();
    int first, second = 0;
    len = len /2;
    for (int i =0; i< len; i++) {
        first+= number[i];
        second+=number[len+i];
    } 
    if (first == second) cout << "LUCKY";
    else cout << "READY";
}