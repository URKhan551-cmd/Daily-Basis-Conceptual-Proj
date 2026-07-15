#include<iostream>
using namespace std;
int main(){
    int n = 3;
    for(int i =1; i <=n; i++){
        cout<< i << " ";
    }

    cout<< endl;
    return 0;
}


//
#include<iostream>
using namespace std;
int main(){
    int n = 3;
    for(int i =1; i <=n; i = i+2){  // this will increment by 2 //  1, 3, 5, 7, 9, 11, 13, 15
        cout<< i << " ";
    }

    cout<< endl;
    return 0;
}