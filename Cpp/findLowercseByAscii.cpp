#include <iostream>
using namespace std;
 
int main(){
   char ch;
   cout<<"enter char : ";
   cin>> ch;
   if(ch >= 65 && ch <= 90){
    cout<<"uppercase\n";

   } else {
    cout<<"lowercase\n"
   }

    return 0;
}
// ASCII values to uppercase start from 65 A to 90 Z  
// and small leteer ascii value strat from 97 'a' 