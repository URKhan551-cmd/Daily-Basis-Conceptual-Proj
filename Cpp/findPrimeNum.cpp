// a num which can divide by itself = 0
// a num which can devide by 1 = 0
// we cannot take modulo of n % n xxxxxxx
// we cannot take modulo of n % 1  noooo xxxx
// and donot take greater modulo then n  xxxxxx  we need final answwer 1 or 0;

// so let start it from 2 to  ( n - 1 );

#include <iostream>
using namespace std;

int main()
{

    int n;

    cout << "Enter a number: ";
    cin >> n;

    bool isPrime = true;

    if (n <= 1)
        isPrime = false;

    for (int i = 2; i < n; i++)
    {
        if (n % i == 0)
        {
            isPrime = false;
            break;
        }
    }

    if (isPrime)
        cout << "Prime Number" << endl;
    else
        cout << "Not Prime" << endl;
}