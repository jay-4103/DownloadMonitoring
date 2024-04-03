#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int c = 0;

        int arr[] = {1,3,6,10,15};
        
        int ans=INT_MAX;
        for(int i=0;i<5;i++)
        {
            if(n%arr[i]==0)
            {
                ans = n/arr[i];
            }
        }

        while (n != 0) {
            if (n >= 15) {
                c += n / 15;
                n = n % 15;
            } 
            if (n >= 10) {
                c += n / 10;
                n = n % 10;
            } 
            if (n >= 6) {
                c += n / 6;
                n = n % 6;
            } 
            if (n >= 3) {
                c += n / 3;
                n = n % 3;
            } 
            
            if (n>=0){
                c += n;
                n = 0;
            }
            
        }
        cout << min(c,ans) << endl;
    }
    return 0;
}
