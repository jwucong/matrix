# Matrix

### 1. instance

* **Matrix(rows, items)**
   ```javascript
   const matrix = new Matrix(2, [1, 3, 0, 1, 2, 0, 1, 1])
   // or
   const matrix = Matrix(2, [1, 3, 0, 1, 2, 0, 1, 1])
   
   ```

* **Matrix(matrixLike)**
   ```javascript
   const instance = new Matrix(2, [1, 3, 0, 1, 2, 0, 1, 1])
   const matrix = new Matrix(instance)
   // or
   const matrix = new Matrix([[1, 3, 0, 1], [2, 0, 1, 1]])
   // or
   const matrix = new Matrix({
     0: [1, 3, 0, 1],
     1: [2, 0, 1, 1],
   })
   ```

### 2. method

* **Matrix.prototype.addition(matrixLike)**
* **Matrix.prototype.subtraction(matrixLike)**
* **Matrix.prototype.multiplication(matrixLike)**
* **Matrix.prototype.translation()**
