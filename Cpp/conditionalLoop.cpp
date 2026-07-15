#include<iostream>
using namespace std;
int main(){
    int n = 5;
    // odd numbers find
    for(int i =1; i <=n; i++){
        if(i % 2 != 0){
            cout<< i << " ";
            
        }
    }

    cout<< endl;
    return 0;
}