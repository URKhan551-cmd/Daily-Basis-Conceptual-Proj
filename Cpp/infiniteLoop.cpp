#include <iostream>
using namespace std;

int main(){

    int n =20;
    int count = 1;
    while(count <= n){
       cout<< count << " "; // print 1, 1, 1, 1, 1, 1,1,1, 1,1, 1, 1, 1, 1, 1, 1, 1
       // count++
    } 
    cout<< endl;
    return 0;
}

// this infinite loop because of no count increment so every time count is same 1 will check
// over and over until system got down . now you have to press {  ctl + c } to stop execution.