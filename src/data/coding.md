--- TEST 1 ---
### Q1
Question: A chocolate factory is packing chocolates into packets. The chocolate packets here represent an array of N integer values. Empty packets are represented by 0. The task is to find all the empty packets (0) and push them to the end of the conveyor belt (array) while maintaining the relative order of the non-zero elements.

**Constraints:**
* 1 <= N <= 10^5
* 0 <= arr[i] <= 10^5

**Sample Input:**
8
4 5 0 1 9 0 5 0

**Sample Output:**
4 5 1 9 5 0 0 0
- [CODE]
### Q2
Question: Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order. An empty string is also considered valid.

**Constraints:**
* 1 <= string.length <= 10^5
* The string will only contain bracket characters.

**Sample Input 1:**
()[]{}

**Sample Output 1:**
Valid

**Sample Input 2:**
([)]

**Sample Output 2:**
Invalid
- [CODE]
### Q1
Answer: Reference Solution Provided in Explanation
Explanation: **Logic:** The optimal approach involves using a two-pointer technique to iterate through the array. We maintain an `insert_index` that tracks where the next non-zero element should be placed. Whenever we encounter a non-zero element, we place it at `insert_index` and increment the pointer. After the loop, all remaining positions from `insert_index` to the end of the array are filled with `0`.
**Time Complexity:** O(N)
**Space Complexity:** O(1) in-place modification.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        int insertIndex = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] != 0) {
                arr[insertIndex++] = arr[i];
            }
        }
        while (insertIndex < n) {
            arr[insertIndex++] = 0;
        }
        
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i == n - 1 ? "" : " "));
        }
    }
}
```

```python
def push_zeros(n, arr):
    insert_index = 0
    for i in range(n):
        if arr[i] != 0:
            arr[insert_index] = arr[i]
            insert_index += 1
            
    while insert_index < n:
        arr[insert_index] = 0
        insert_index += 1
        
    return arr

n = int(input())
arr = list(map(int, input().split()))
res = push_zeros(n, arr)
print(*(res))
```
### Q2
Answer: Reference Solution Provided in Explanation
Explanation: **Logic:** This is a classic Stack data structure problem. We iterate through the string character by character. If we see an opening bracket, we push it onto the stack. If we see a closing bracket, we check if the stack is empty (meaning no corresponding open bracket exists) or if the popped top element matches the current closing bracket. If the string is perfectly balanced, the stack will be completely empty at the end.
**Time Complexity:** O(N)
**Space Complexity:** O(N) to store characters in the stack.

```java
import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(isValid(s) ? "Valid" : "Invalid");
    }

    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
```

```python
def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
            
    return not stack

s = input().strip()
print("Valid" if is_valid(s) else "Invalid")
```

--- TEST 2 ---
### Q1
Question: Particulate matters are the biggest contributors to Delhi pollution. The government applies the Odd-Even concept for vehicles. Vehicles with an odd last digit in their registration number are allowed on roads on odd dates, and those with an even last digit are allowed on even dates.
Given an integer array `a[]` containing the last digit of the registration number of N vehicles traveling on date D (a positive integer). Calculate the total fine collected by the traffic police department from the vehicles violating the rules. The fine amount for a violation is X Rs.

**Constraints:**
* 1 <= N <= 100
* 1 <= a[i] <= 9
* 1 <= D <= 31
* 100 <= X <= 5000

**Sample Input:**
4
5 2 3 7
12
200

**Sample Output:**
600
- [CODE]
### Q2
Question: Given an array of N integers (which may include negative numbers), find the maximum sum of any contiguous subarray using Kadane's Algorithm.

**Constraints:**
* 1 <= N <= 10^5
* -10^4 <= arr[i] <= 10^4

**Sample Input:**
9
-2 1 -3 4 -1 2 1 -5 4

**Sample Output:**
6
- [CODE]
### Q1
Answer: Reference Solution Provided in Explanation
Explanation: **Logic:** We parse the date D to check if the day is even or odd. We then iterate over the array of vehicle registration digits. If the date is even, any vehicle with an odd digit is fined. If the date is odd, any vehicle with an even digit is fined. We accumulate the fine amount `X` for each violator. 
**Time Complexity:** O(N) where N is the number of vehicles.
**Space Complexity:** O(1) beyond array storage.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int d = sc.nextInt();
        int x = sc.nextInt();
        
        int fine = 0;
        boolean isEvenDate = (d % 2 == 0);
        
        for (int i = 0; i < n; i++) {
            boolean isEvenVehicle = (arr[i] % 2 == 0);
            if (isEvenDate && !isEvenVehicle) {
                fine += x;
            } else if (!isEvenDate && isEvenVehicle) {
                fine += x;
            }
        }
        System.out.println(fine);
    }
}
```

```python
n = int(input())
arr = list(map(int, input().split()))
d = int(input())
x = int(input())

fine = 0
for digit in arr:
    if d % 2 == 0 and digit % 2 != 0:
        fine += x  # even day, odd vehicle = violation
    elif d % 2 != 0 and digit % 2 == 0:
        fine += x  # odd day, even vehicle = violation

print(fine)
```
### Q2
Answer: Reference Solution Provided in Explanation
Explanation: **Logic:** Kadane's Algorithm is a dynamic programming/greedy approach to find the maximum contiguous subarray sum optimally. We maintain two variables: `max_so_far` and `current_max`. As we iterate through the array, we add elements to `current_max`. If `current_max` exceeds `max_so_far`, we update `max_so_far`. Crucially, if `current_max` drops below 0, it means the current contiguous subarray is negatively impacting our total, so we reset `current_max` to 0 and start a fresh contiguous streak. (Initialization uses minimum possible values to properly account for arrays with entirely negative integers).
**Time Complexity:** O(N)
**Space Complexity:** O(1)

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        int maxSoFar = Integer.MIN_VALUE;
        int currentMax = 0;
        
        for (int i = 0; i < n; i++) {
            currentMax += arr[i];
            if (currentMax > maxSoFar) {
                maxSoFar = currentMax;
            }
            if (currentMax < 0) {
                currentMax = 0;
            }
        }
        System.out.println(maxSoFar);
    }
}
```

```python
n = int(input())
arr = list(map(int, input().split()))

max_so_far = float('-inf')
current_max = 0

for num in arr:
    current_max += num
    if current_max > max_so_far:
        max_so_far = current_max
    if current_max < 0:
        current_max = 0

print(max_so_far)
```

--- TEST 3 ---
### Q1
Question: An intelligence agency has received reports with numbers encoded in a mysterious method. You are given a number 'N' and another number 'R'. It is concluded that all digits of the number 'N' are summed up, and this summation value is multiplied by 'R'. Finally, the digits of this resultant product are continuously added until it reduces to a single digit that acts as the deciphered code. 
Write a program to decipher the code. If R is 0, the output is 0.

**Constraints:**
* 0 < N <= 100000
* 0 <= R <= 50

**Sample Input 1:**
99
3

**Sample Output 1:**
9

**Sample Input 2:**
1234
2

**Sample Output 2:**
2
- [CODE]
### Q2
Question: Given two massive strings S1 and S2, write an optimal algorithm to determine if they are exact anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. Sorting the strings is prohibited due to strict execution time limits.

**Constraints:**
* 1 <= S1.length, S2.length <= 10^5
* Strings contain only lowercase English letters.

**Sample Input:**
listen
silent

**Sample Output:**
True
- [CODE]
### Q1
Answer: Reference Solution Provided in Explanation
Explanation: **Logic:** First, calculate the sum of the digits of the integer `N`. Multiply this sum by `R`. If the result is 0, return 0. Otherwise, apply the digital root algorithm. A digital root repeatedly sums the digits of a number until a single digit is obtained. Mathematically, the digital root of a non-zero number `X` is `X % 9`. If `X % 9 == 0`, the digital root is `9`.
**Time Complexity:** O(d) where d is the number of digits in N. Finding the digital root is an O(1) math operation.
**Space Complexity:** O(1)

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nStr = sc.next();
        int r = sc.nextInt();
        
        if (r == 0) {
            System.out.println(0);
            return;
        }
        
        long sum = 0;
        for (char c : nStr.toCharArray()) {
            sum += Character.getNumericValue(c);
        }
        
        long total = sum * r;
        
        if (total == 0) {
            System.out.println(0);
        } else {
            long result = total % 9;
            if (result == 0) {
                System.out.println(9);
            } else {
                System.out.println(result);
            }
        }
    }
}
```

```python
n = input().strip()
r = int(input().strip())

if r == 0:
    print(0)
else:
    digit_sum = sum(int(digit) for digit in n)
    total = digit_sum * r
    
    if total == 0:
        print(0)
    else:
        # Digital Root Math Formula
        res = total % 9
        print(9 if res == 0 else res)
```
### Q2
Answer: Reference Solution Provided in Explanation
Explanation: **Logic:** A brute-force or sorting approach takes O(N log N) time, which will result in a Time Limit Exceeded (TLE) error for massive string lengths. The optimal O(N) strategy relies on HashMaps or frequency arrays. Since inputs are restricted to lowercase English letters, a 26-element array serves perfectly as a frequency counter. We iterate through the strings, incrementing indices for S1 characters and decrementing indices for S2 characters. If the strings are anagrams, every single index in the frequency array will return exactly to 0.
**Time Complexity:** O(N) where N is the length of the string.
**Space Complexity:** O(1) because the size of the auxiliary frequency array (26) is constant.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s1 = sc.next();
        String s2 = sc.next();
        
        System.out.println(isAnagram(s1, s2) ? "True" : "False");
    }

    public static boolean isAnagram(String s1, String s2) {
        if (s1.length() != s2.length()) {
            return false;
        }
        
        int[] freq = new int;
        for (int i = 0; i < s1.length(); i++) {
            freq[s1.charAt(i) - 'a']++;
            freq[s2.charAt(i) - 'a']--;
        }
        
        for (int count : freq) {
            if (count != 0) {
                return false;
            }
        }
        return true;
    }
}
```

```python
def is_anagram(s1, s2):
    if len(s1) != len(s2):
        return False
        
    freq = {}
    for char in s1:
        freq[char] = freq.get(char, 0) + 1
        
    for char in s2:
        if char not in freq or freq[char] == 0:
            return False
        freq[char] -= 1
        
    return True

s1 = input().strip()
s2 = input().strip()
print("True" if is_anagram(s1, s2) else "False")
```