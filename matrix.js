
function Matrix(rows, items) {
  if (rows instanceof Matrix) {
    return rows
  }
  if (!(this instanceof Matrix)) {
    return new Matrix(rows, items)
  }
  if (_isMatrixLike(rows)) {
    const obj = _parseMatrixLike(rows)
    rows = obj.rows
    items = obj.items
  }
  const list = _is(items, 'array') ? items : []
  const size = list.length
  let m = parseInt(rows, 10) || 0
  let n = 0
  m = m > size ? size : m
  n = n > size ? size : n
  if (/^\d+$/.test(m) && m > 0) {
    n = Math.floor(size / rows)
    if (m < 2 && n < 2) {
      throw Error('Matrix requires at least two elements.')
    }
  } else {
    if (size < 4) {
      throw Error('A square matrix requires at least four elements.')
    }
    m = n = Math.floor(Math.sqrt(size))
  }
  let i = 0, j = 0;
  for (; i < size, j < m; i += n, j++) {
    this[j] = items.slice(i, i + n)
  }
  this.rows = m
  this.columns = n
  this.isMatrix = true
}

Matrix.prototype.get = function (row, column) {
  return this[row][column]
}

// 加法
Matrix.prototype.addition = function (matrix) {
  const A = this
  const B = new Matrix(matrix)
  const m = A.rows
  const n = A.columns
  if (m !== B.rows || n !== B.columns) {
    throw Error('A matrix and B matrix are not homomorphic matrices')
  }
  let result = []
  for (let i = 0; i < m; i++) {
    result.push(A[i].map((item, j) => item + B[i][j]))
  }
  return new Matrix(result)
}

// 减法
Matrix.prototype.subtraction = function (matrix) {
  return this.addition(Matrix(matrix).multiplication(-1))
}

// 乘法
Matrix.prototype.multiplication = function (matrix) {
  // A * B => {A: m * n, B: n * p}
  const num = parseFloat(matrix)
  const A = this
  const m = A.rows
  const n = A.columns
  let result = []

  if (!Number.isNaN(num)) {
    for (let i = 0; i < m; i++) {
      result.push(A[i].map(item => num * item))
    }
    return new Matrix(result)
  }

  const B = new Matrix(matrix)
  if (n !== B.rows) {
    throw Error('The B matrix rows is not equal to the A matrix columns.')
  }
  const p = B.columns
  for (let i = 0; i < m; i++) {
    let row = []
    for (let j = 0; j < p; j++) {
      let col = 0
      for (let k = 0; k < n; k++) {
        col += A[i][k] * B[k][j]
      }
      row.push(col)
    }
    result.push(row)
  }
  return new Matrix(result)
}

// 矩阵转置
Matrix.prototype.translation = function () {
  const A = this
  const m = A.rows
  const n = A.columns
  let result = []
  for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < m; j++) {
      row.push(A[j][i])
    }
    result.push(row)
  }
  return new Matrix(result)
}

function _is(v, t) {
  const c = {}.toString.call(v).slice(8, -1).toLowerCase()
  return typeof t === 'string' ? c === t.toLowerCase() : c
}

function _isMatrixLike(value) {
  if (_is(value, 'object')) {
    const rows = _getSerialKeys(value)
    const size = rows.length
    if (!size) {
      return false
    }
    for (let i = 0; i < size; i++) {
      const a = value[rows[i]]
      const e = _getArrayDepth(a) === 1
      if (!e || a.length !== value[0].length) {
        return false
      }
    }
    return true
  }
  if (_is(value, 'array')) {
    const d = _getArrayDepth(value)
    const size = value.length
    if (d === 1) {
      return size > 0
    }
    if (d === 2) {
      for (let i = 0; i < size; i++) {
        const a = value[i]
        const e = _getArrayDepth(a) === 1
        if (!e || a.length !== value[0].length) {
          return false
        }
      }
      return true
    }
    return false
  }
  return false
}

function _getArrayDepth(array) {
  const counter = (a, n) => {
    if (!_is(a, 'array')) {
      return n
    }
    n++
    const items = a.map(item => counter(item, n))
    return items.length ? Math.max.apply(null, items) : n
  }
  return counter(array, 0)
}

function _getSerialKeys(obj) {
  const reg = /^\d+$/
  const keys = Object.keys(obj).filter(key => reg.test(key))
  keys.sort((a, b) => a - b)
  if (keys[0] !== '0') {
    return []
  }
  let result = [keys[0]]
  for (let i = 1; i < keys.length; i++) {
    const key = keys[i]
    if (key - result[result.length - 1] !== 1) {
      return result
    }
    result.push(key)
  }
  return result
}

function _parseMatrixLike(matrixLike) {
  let rows = 0, items = []
  if (_is(matrixLike, 'array')) {
    const one = _getArrayDepth(matrixLike) === 1
    rows = one ? 0 : matrixLike.length
    items = [].concat.apply(items, matrixLike)
  } else {
    const keys = _getSerialKeys(matrixLike)
    const array = keys.map(key => matrixLike[key])
    rows = keys.length
    items = [].concat.apply(items, array)
  }
  return {rows, items}
}

const m1 = Matrix(2, [1, 3, 1, 1, 0, 0])
const m2 = Matrix(2, [0, 0, 5, 7, 5, 0])
const m3 = Matrix(2, [1, 0, 2, -1, 3, 1])
const m4 = Matrix(3, [3, 1, 2, 1, 1, 0])
const m5 = Matrix(2, [1, 2, 3, 0, -6, 7])

console.log(m1.addition(m2))
console.log(m1.subtraction(m2))
console.log(m3.multiplication(m4))
console.log(m5.translation())
