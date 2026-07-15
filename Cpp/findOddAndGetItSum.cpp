#include<iostream>
using namespace std;
int main(){
    int n = 7;
    bool isPrime = true;
    for(int i =2; i <=n - 1; i++){
        if(i % 2 == 0){  // non prime
           isPrime = false;
           break;
        }
    }

    if(isPrime == true){
        cout<<"Pirme no\n";

    }else{
        cout<<"non-Prime no\n";
    }

    cout<< endl;
    return 0;
}

// in loop on n number get i as frist integar check inside the loop is that i % 2 == 0 
// then  this is an even left it increment i++ check with n
// here are twp check first check i with n  i <= n then loop work 
// second check is that i is odd then add into sum varable



#include<iostream>
using namespace std;
int main(){
    int n = 7;
    bool isPrime = true;
    for(int i =2; i*i <=n; i++){
        if(n % i == 0){  // non prime
           isPrime = false;
           break;
        }
    }

    if(isPrime == true){
        cout<<"Pirme no\n";

    }else{
        cout<<"non-Prime no\n";
    }

    cout<< endl;
    return 0;
}

