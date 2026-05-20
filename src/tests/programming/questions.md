--- TEST 1 ---
```markdown
### Q1
Question: What is the output of the following Python operation?
```python
print(type(5/2))
```
- [ ] <class 'int'>
- [ ] <class 'float'>
- [ ] <class 'double'>
- [ ] <class 'number'>

### Q2
Question: What is the time complexity of the standard Binary Search algorithm?
- [ ] O(1)
- [ ] O(n)
- [ ] O(n log n)
- [ ] O(log n)

### Q3
Question: Which of the following data structures strictly follows the LIFO (Last In, First Out) principle?
- [ ] Queue
- [ ] Linked List
- [ ] Stack
- [ ] Binary Tree

### Q4
Question: Which pillar of Object-Oriented Programming (OOP) involves binding data and methods together into a single unit to hide the internal state?
- [ ] Inheritance
- [ ] Polymorphism
- [ ] Encapsulation
- [ ] Abstraction

### Q5
Question: What is the space complexity of the Merge Sort algorithm?
- [ ] O(1)
- [ ] O(log n)
- [ ] O(n)
- [ ] O(n^2)

### Q6
Question: Which of the following sorting algorithms is considered stable by default?
- [ ] Quick Sort
- [ ] Heap Sort
- [ ] Selection Sort
- [ ] Merge Sort

### Q7
Question: What will be the exact sequence printed by the following Python loop?
```python
for i in range(1, 10, 3):
    print(i, end=" ")
```
- [ ] 1 2 3
- [ ] 1 3 6 9
- [ ] 1 4 7
- [ ] 1 4 7 10

### Q8
Question: In Python, what is the primary difference between the `==` operator and the `is` operator?
- [ ] `==` compares memory identity; `is` compares values
- [ ] `==` compares values; `is` compares memory identity
- [ ] They are completely interchangeable
- [ ] `==` is used for integers; `is` is used for strings

### Q9
Question: What is a NULL pointer in C/C++?
- [ ] A pointer that points to the memory address 1
- [ ] A pointer that points to no valid memory address
- [ ] A pointer used specifically for garbage collection
- [ ] A pointer that holds a negative memory address

### Q10
Question: What will be the output of the following Python boolean conversions?
```python
print(bool(0), bool(''), bool([]), bool(1))
```
- [ ] False False False True
- [ ] True False True False
- [ ] False True False True
- [ ] True True True True

### Q11
Question: What is the time complexity of inserting a new element at the beginning (head) of a singly linked list?
- [ ] O(n)
- [ ] O(log n)
- [ ] O(1)
- [ ] O(n^2)

### Q12
Question: What will be printed as the output of the following Python modulo operation? Type the exact integer.
```python
x = 10
y = 3
print(x % y)
```
- [FUB]

### Q13
Question: What is the exact string output of the following Python code demonstrating list mutability? Type the exact output structure including brackets.
```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)
```
- [FUB]

### Q14
Question: What is the worst-case time complexity of Quick Sort? Type the exact mathematical notation format (e.g., O(n) or O(n^2)).
- [FUB]

### Q15
Question: What is the time complexity of accessing an element in an array by its index? Type the exact mathematical notation format (e.g., O(n) or O(n^2)).
- [FUB]
```

```markdown
### Q1
Answer: <class 'float'>
Explanation: In Python 3, the '/' operator always performs true (float) division, even if the operands are integers. 5 / 2 yields 2.5, which is of type float.

### Q2
Answer: O(log n)
Explanation: Binary Search divides the sorted search space in half during each step. The recurrence relation T(n) = T(n/2) + O(1) resolves to a time complexity of O(log n).

### Q3
Answer: Stack
Explanation: A Stack operates on the Last In, First Out (LIFO) principle, where the most recently added element is the first one to be removed. Function call stacks and undo mechanisms rely on this.

### Q4
Answer: Encapsulation
Explanation: Encapsulation is the OOP principle of wrapping data (variables) and methods (functions) into a single unit (a class) and restricting direct access to the internal state, usually via private access modifiers.

### Q5
Answer: O(n)
Explanation: Merge Sort requires an auxiliary array to hold the elements while merging the divided halves back together. This extra memory scales linearly with the input size, yielding O(n) space complexity.

### Q6
Answer: Merge Sort
Explanation: A stable sorting algorithm preserves the relative order of equal elements. Merge Sort and Bubble Sort are stable by default, whereas Quick Sort and Heap Sort are inherently unstable due to their swapping logic.

### Q7
Answer: 1 4 7
Explanation: The `range(start, stop, step)` function generates numbers beginning at `start`, incrementing by `step`, and ending before `stop`. Here, it starts at 1, adds 3 (giving 4), adds 3 (giving 7), and stops because the next number (10) is not less than the stop boundary.

### Q8
Answer: `==` compares values; `is` compares memory identity
Explanation: In Python, `==` evaluates whether the values of two objects are equivalent, while `is` evaluates whether two variables point to the exact same object in memory.

### Q9
Answer: A pointer that points to no valid memory address
Explanation: A NULL pointer has a reserved value (usually 0) indicating that it does not currently point to any valid memory location. Dereferencing it results in a segmentation fault.

### Q10
Answer: False False False True
Explanation: In Python, 0, empty strings (''), and empty lists ([]) are evaluated as "Falsy", meaning `bool()` converts them to False. The integer 1 is "Truthy" and converts to True.

### Q11
Answer: O(1)
Explanation: Inserting at the beginning of a singly linked list only requires creating a new node, setting its next pointer to the current head, and updating the head pointer. This takes constant time, O(1), regardless of the list size.

### Q12
Answer: 1
Explanation: The `%` operator calculates the modulus (remainder). 10 divided by 3 is 3 with a remainder of 1. Therefore, 10 % 3 = 1.

### Q13
Answer: [1, 2, 3, 4]
Explanation: In Python, lists are mutable objects assigned by reference. `b = a` means both variables point to the same memory object. Mutating `b` using `append(4)` intrinsically alters the underlying list that `a` also points to.

### Q14
Answer: O(n^2)
Explanation: The worst-case scenario for Quick Sort occurs when the chosen pivot is consistently the smallest or largest element (e.g., highly unbalanced partitions), degrading its performance from an average of O(n log n) down to O(n^2).

### Q15
Answer: O(1)
Explanation: Arrays use contiguous memory locations. Accessing an element by index utilizes direct address computation (`address = base + index * size`), resulting in a constant time complexity of O(1).
```

--- TEST 2 ---
```markdown
### Q1
Question: What is the primary difference between a deep copy and a shallow copy in Python?
- [ ] Shallow copy copies the object and all nested objects; Deep copy references the same objects
- [ ] Shallow copy references the same inner objects; Deep copy recursively copies all nested objects
- [ ] Shallow copy is used for primitives; Deep copy is used for objects
- [ ] There is no difference; they perform the exact same memory operation

### Q2
Question: Which OOP concept is demonstrated when multiple methods in the same class have the same name but different parameters?
- [ ] Method Overriding
- [ ] Encapsulation
- [ ] Method Overloading
- [ ] Abstract Classes

### Q3
Question: In loop control structures, what is the exact difference between the `break` and `continue` statements?
- [ ] `break` skips the current iteration; `continue` exits the loop entirely
- [ ] `break` pauses the loop; `continue` resumes it
- [ ] `break` exits the loop entirely; `continue` skips the current iteration and moves to the next
- [ ] They both terminate the loop, but `continue` returns a value

### Q4
Question: What is a fundamental difference between a Compiler and an Interpreter?
- [ ] A compiler translates code line-by-line; an interpreter translates all at once
- [ ] A compiler translates all code to machine code before execution; an interpreter executes line-by-line
- [ ] An interpreter produces a standalone executable file; a compiler does not
- [ ] A compiler is only used for Python; interpreters are used for C++

### Q5
Question: What algorithm is optimal for finding all prime numbers up to a large range limit (e.g., 100,000) to avoid a Time Limit Exceeded (TLE) error?
- [ ] Linear Divisibility Traversal O(N^2)
- [ ] The Sieve of Eratosthenes O(N log log N)
- [ ] Square Root Divisibility O(N * √N)
- [ ] Euclidean Algorithm O(log N)

### Q6
Question: Which data structure is classically used to determine if a string of nested brackets (e.g., `({[]})`) is valid and perfectly balanced?
- [ ] Queue
- [ ] Hash Map
- [ ] Binary Tree
- [ ] Stack

### Q7
Question: What is Kadane's Algorithm primarily utilized for?
- [ ] Finding the shortest path in a graph
- [ ] Finding the maximum contiguous subarray sum
- [ ] Checking if a string is a palindrome
- [ ] Sorting an array in O(n) time

### Q8
Question: In Object-Oriented Programming, what is a constructor?
- [ ] A method used to destroy an object and free memory
- [ ] A special method called automatically at object creation to initialize attributes
- [ ] A static variable shared across all instances of a class
- [ ] A function that duplicates an existing object

### Q9
Question: What does the programming acronym "DRY" stand for?
- [ ] Do Run Yourself
- [ ] Don't Repeat Yourself
- [ ] Data Redundancy Yield
- [ ] Dynamic Routing Yield

### Q10
Question: What is the optimal time complexity approach for checking if two massive strings are anagrams of each other without triggering a Time Limit Exceeded error?
- [ ] Sorting both strings O(N log N)
- [ ] Using a character frequency Hash Map/Dictionary O(N)
- [ ] Nested loops comparing every character O(N^2)
- [ ] Reverse traversal comparison O(log N)

### Q11
Question: To remove duplicates from an unsorted array in optimal O(n) time, which extra data structure must you typically employ?
- [ ] Linked List
- [ ] Map / Hash Set
- [ ] Priority Queue
- [ ] Binary Search Tree

### Q12
Question: What is the output of the following Python string slicing operation? Type the exact resulting string.
```python
s = "12321"
print(s[::-1])
```
- [FUB]

### Q13
Question: What is the exact output of the following Python float division? Type the exact answer.
```python
print(5/2)
```
- [FUB]

### Q14
Question: Analyze the following Java variable swapping code. What will be the printed value of `x`? Type the exact integer.
```java
int x = 10;
int y = 20;
x = x + y - (y = x);
System.out.println(x);
```
- [FUB]

### Q15
Question: When executing a breadth-first search (BFS) on a graph, what data structure is naturally utilized to keep track of the nodes to visit next? Type the exact data structure name (e.g., Stack or Queue).
- [FUB]
```

```markdown
### Q1
Answer: Shallow copy references the same inner objects; Deep copy recursively copies all nested objects
Explanation: A shallow copy creates a new top-level object but populates it with references to the original nested objects. A deep copy recursively duplicates every object found in the original, creating a completely independent clone.

### Q2
Answer: Method Overloading
Explanation: Method Overloading is a form of compile-time polymorphism where multiple methods share the same name but have distinct parameter lists (different types or number of arguments).

### Q3
Answer: `break` exits the loop entirely; `continue` skips the current iteration and moves to the next
Explanation: The `break` statement immediately terminates the innermost enclosing loop. The `continue` statement halts the current iteration of the loop and immediately forces the loop to evaluate its next iteration.

### Q4
Answer: A compiler translates all code to machine code before execution; an interpreter executes line-by-line
Explanation: Compilers (used in C/C++) scan the entire source code and convert it to executable machine code at once. Interpreters (used in Python/JavaScript) process and execute the source code line-by-line in real-time.

### Q5
Answer: The Sieve of Eratosthenes O(N log log N)
Explanation: To find all primes in a massive range up to N, the Sieve of Eratosthenes is required. Iterating divisibility checks on every number results in TLE, while the Sieve marks multiples iteratively in highly optimal O(N log log N) time.

### Q6
Answer: Stack
Explanation: A Stack is the perfect LIFO structure for tracking nested brackets. Opening brackets are pushed, and closing brackets pop the top element to verify a matched pair.

### Q7
Answer: Finding the maximum contiguous subarray sum
Explanation: Kadane's Algorithm iterates through an array, calculating the maximum sum contiguous subarray ending at that position, providing an optimal O(n) time and O(1) space solution.

### Q8
Answer: A special method called automatically at object creation to initialize attributes
Explanation: A constructor is a unique class method (e.g., `__init__` in Python or a method matching the class name in Java/C++) that initializes the state of an object when it is instantiated.

### Q9
Answer: Don't Repeat Yourself
Explanation: DRY (Don't Repeat Yourself) is a software development principle aimed at reducing repetition of software patterns, replacing it with abstractions or data normalization to ensure logic exists in exactly one place.

### Q10
Answer: Using a character frequency Hash Map/Dictionary O(N)
Explanation: While sorting two strings takes O(N log N) time, building a character frequency dictionary/hash map for one string and decrementing frequencies via the second string accomplishes the task in O(N) time.

### Q11
Answer: Map / Hash Set
Explanation: A Map or Hash Set provides O(1) average lookup time. By iterating through the unsorted array and hashing elements, duplicates can be filtered out in a single O(n) pass.

### Q12
Answer: 12321
Explanation: The slicing operation `[::-1]` in Python steps through the string from end to start, reversing it. Since "12321" is a palindrome, reversing it yields the exact same string.

### Q13
Answer: 2.5
Explanation: Python 3 handles the `/` operator as true division, converting integer inputs into floating-point outputs. Therefore, 5 divided by 2 outputs exactly 2.5.

### Q14
Answer: 20
Explanation: This relies on strict evaluation order in Java. `x` (10) + `y` (20) evaluates to 30. Then `(y = x)` evaluates to 10 (and assigns 10 to y). Finally, 30 - 10 assigns 20 back to `x`. 

### Q15
Answer: Queue
Explanation: Breadth-First Search (BFS) algorithm strictly utilizes a Queue (FIFO data structure) to explore the graph level by level, ensuring nodes discovered first are visited first.
```

--- TEST 3 ---
```markdown
### Q1
Question: If an array contains an even number of pairs, but one element is lost, what is the most optimal bitwise operation to find the missing single element in O(N) time?
- [ ] Bitwise AND (&)
- [ ] Bitwise OR (|)
- [ ] Bitwise XOR (^)
- [ ] Bitwise NOT (~)

### Q2
Question: When looking for the maximum element or tracking maximum sums (like in Kadane's Algorithm), why do Python developers initialize their tracking variable using `float('-inf')`?
- [ ] Because 0 is an invalid integer in Python
- [ ] To properly account for arrays filled entirely with negative numbers
- [ ] To trigger an exception if an empty array is provided
- [ ] Because Python does not support negative integer assignments

### Q3
Question: In Python, utilizing `dict.get(key, 0)` is a common optimization for frequency mapping because:
- [ ] It automatically sorts the dictionary keys
- [ ] It converts the dictionary into a tuple
- [ ] It deletes the key after accessing it
- [ ] It prevents a KeyError by returning a default value if the key does not exist

### Q4
Question: To optimize prime checking logic for a single number N, the for-loop condition should realistically only iterate up to:
- [ ] N / 2
- [ ] N - 1
- [ ] The square root of N
- [ ] N / 3

### Q5
Question: What is a mandatory condition that a recursive function MUST have to avoid triggering a stack overflow error?
- [ ] A global variable
- [ ] A base case (termination condition)
- [ ] A return string
- [ ] A nested while loop

### Q6
Question: If you implement an algorithm using a nested `for` loop to compare every array element against every other array element, what is the resultant time complexity?
- [ ] O(n)
- [ ] O(n log n)
- [ ] O(log n)
- [ ] O(n^2)

### Q7
Question: Which Object-Oriented principle allows a child class to provide a specific implementation of a method that is already provided by its parent class at runtime?
- [ ] Method Overriding
- [ ] Method Overloading
- [ ] Abstraction
- [ ] Encapsulation

### Q8
Question: Which of the following correctly describes a Graph traversal algorithm?
- [ ] Merge Sort
- [ ] Depth-First Search (DFS)
- [ ] Binary Search
- [ ] Hash Mapping

### Q9
Question: If an algorithm runs dynamically combining the solutions of overlapping subproblems, which algorithmic paradigm does it follow?
- [ ] Greedy Algorithm
- [ ] Dynamic Programming
- [ ] Two-Pointer Approach
- [ ] Backtracking

### Q10
Question: If you use the Python expression `list(set(arr))` and then `sort()` it to find the second largest element, what is the underlying time complexity?
- [ ] O(1)
- [ ] O(N)
- [ ] O(N log N)
- [ ] O(N^2)

### Q11
Question: When implementing a Stack using an array, where do `push` and `pop` operations strictly occur?
- [ ] At the beginning of the array (index 0)
- [ ] In the middle of the array
- [ ] At random indices
- [ ] At the end of the array (tracking the top index)

### Q12
Question: A custom Fibonacci sequence is initialized with `a = 3` and `b = 5`. What is the 4th term in this sequence? Type the exact integer.
- [FUB]

### Q13
Question: In the expression `range(2, int(20**0.5) + 1)`, what is the maximum integer value that this range object will generate? Type the exact integer.
- [FUB]

### Q14
Question: What is the exact integer output of the following Python code that filters array zeros?
```python
a = [1, 0, 2, 0, 3]
non_zero = [x for x in a if x != 0]
print(len(non_zero))
```
- [FUB]

### Q15
Question: Analyze the following Java variable swapping code. What will be the printed value of `y`? Type the exact integer.
```java
int x = 10;
int y = 20;
x = x + y - (y = x);
System.out.println(y);
```
- [FUB]
```

```markdown
### Q1
Answer: Bitwise XOR (^)
Explanation: The XOR operation evaluates to 0 when bits are identical (e.g., x ^ x = 0). When XORing an array containing pairs and one unique element, all pairs cancel themselves out, leaving only the value of the missing/odd element.

### Q2
Answer: To properly account for arrays filled entirely with negative numbers
Explanation: If an array tracking sum is initialized to 0 and all array elements are negative (e.g., `[-10, -5]`), the algorithm will incorrectly report 0 as the maximum. `float('-inf')` guarantees that any real number in the array is greater than the initial state.

### Q3
Answer: It prevents a KeyError by returning a default value if the key does not exist
Explanation: The `.get(key, default)` dictionary method safely attempts to retrieve the value for a key. If the key is absent, it returns the provided default value (0) instead of crashing the program with a KeyError.

### Q4
Answer: The square root of N
Explanation: Any factors of a number N exist in pairs. If N has a factor greater than its square root, the corresponding pair factor must be less than the square root. Thus, checking up to √N (or `i * i <= N`) is sufficient to verify primality.

### Q5
Answer: A base case (termination condition)
Explanation: Recursion relies on a function calling itself. Without an explicit base case terminating the execution logic, the function will call itself infinitely, consuming memory until a stack overflow crashes the application.

### Q6
Answer: O(n^2)
Explanation: A nested `for` loop executing over the same input array size `n` implies that the inner loop runs `n` times for every single iteration of the outer loop, resulting in n * n operations, or O(n^2) quadratic time complexity.

### Q7
Answer: Method Overriding
Explanation: Method Overriding is a runtime Polymorphism concept where a subclass provides its own custom logic for a method signature already defined in its superclass/parent class.

### Q8
Answer: Depth-First Search (DFS)
Explanation: Depth-First Search (DFS) and Breadth-First Search (BFS) are standard algorithms utilized specifically to traverse or search through the nodes of tree and graph data structures.

### Q9
Answer: Dynamic Programming
Explanation: Dynamic Programming (DP) is a strategy that breaks complex problems down into simpler, overlapping subproblems, solving each subproblem exactly once and storing the result (memoization) to optimize execution.

### Q10
Answer: O(N log N)
Explanation: Converting to a set takes O(N) time. However, invoking Python's `.sort()` method on the resultant list utilizes Timsort, which operates at an O(N log N) time complexity limit.

### Q11
Answer: At the end of the array (tracking the top index)
Explanation: To maintain O(1) time complexity, a stack backed by an array adds (pushes) and removes (pops) elements from the end of the array, tracked via a pointer representing the top of the stack.

### Q12
Answer: 13
Explanation: The sequence requires the next term to be the sum of the previous two. Starting with 3 and 5: Term 3 is 3+5 = 8. Term 4 is 5+8 = 13.

### Q13
Answer: 4
Explanation: `20**0.5` calculates the square root of 20, which is approximately 4.47. Casting to `int()` truncates it to 4. Therefore, `range(2, 4 + 1)` yields `range(2, 5)`, which generates the sequence 2, 3, and 4. The maximum value is 4.

### Q14
Answer: 3
Explanation: The list comprehension iterates over `[1, 0, 2, 0, 3]` and adds elements to `non_zero` only if they are not equal to 0. The resulting list is `[1, 2, 3]`. The length of this list is 3.

### Q15
Answer: 10
Explanation: In the statement `x = x + y - (y = x);`, the inline assignment `(y = x)` evaluates first as `(y = 10)`, assigning 10 to `y`. The `println(y)` command subsequently prints this newly assigned value, which is 10.
```