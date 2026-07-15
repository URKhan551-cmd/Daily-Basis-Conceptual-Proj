#include<iostream>
using namespace std;
int main(){
    int n = 3;
    int sum = 0;
    for(int i =1; i <=n; i++){
        sum = sum + i; // sum += i;
    }

    cout<< "sum: " << sum << endl;
    return 0;
}

// add or get i put into sum variable until n reach.
