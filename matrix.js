// Matrix(2,  2,3,4,5,5,6,7)
function Matrix(rows = 1, items = []) {
  if (rows instanceof Matrix) {
    return rows
  }
  if (!(this instanceof Matrix)) {
    return new Matrix(rows, items)
  }
  if (Array.isArray(rows)) {
    items = rows
    rows = 1
  }
  const size = items.length
  const n = parseInt(rows, 10)
  const m = n < 1 ? 1 : n > size ? size : n
  const columns = Math.floor(size / m)
  let i = 0, j = 0;
  for (; i < size, j < m; i += columns, j++) {
    this[j] = items.slice(i, i + columns)
  }
  this.rows = j
  this.columns = columns
  this.isMatrix = true
}

Matrix.prototype.get = function (row, column) {
  return this[row][column]
}

// 乘法
Matrix.prototype.multiplication = function (matrix) {
  const rows = this.rows
  const cols = this.columns
  let items = []
  if (matrix instanceof Matrix) {
    if (cols !== matrix.rows) {
      throw Error('参数矩阵行数与当前矩阵列数不相等')
    }
    for (let i = 0; i < rows; i++) {
      const row = []
      for (let j = 0; j < cols; j++) {
        const col = this[i][j] * matrix[j][i]
        // TODO 矩阵乘法
        row.push(col)
      }
      items = items.concat(row)
    }
    return new Matrix(rows, items)
  } else {
    const n = parseFloat(matrix)
    if (!Number.isNaN(n)) {
      for (let i = 0; i < rows; i++) {
        const row = this[i].map(item => n * item)
        items = items.concat(row)
      }
      return new Matrix(rows, items)
    }
  }
}

// 矩阵转置
Matrix.prototype.translation = function () {

}

function _is(v, t) {
  const c = {}.toString.call(v).slice(8, -1).toLowerCase()
  return typeof t === 'string' ? c === t.toLowerCase() : c
}

function _hasOwnProperties(obj, props) {
  return props.every(prop => obj.hasOwnProperty(prop))
}

function _isMatrixLike(value) {
  // TODO 类矩阵对象
  const type = _is(value)
  console.log('type: ', type)
  if (!(type === 'object' || type === 'array')) {
    return false
  }
  if (_is(value, 'object')) {
    let size = 0
    const rows = Object.keys(value).filter(key => /^\d+$/.test(key))
    console.log('rows: ', rows)
    if (!rows.length) {
      return false
    }
    const flag = rows.every(row => {
      const a = value[row]
      if (!_is(a, 'array')) {
        return false
      }
      if (!size) {
        size = value[rows[0]].length
      }
      const f = a.every(item => {
        const n = parseFloat(item)
        return _is(n, 'number') && !Number.isNaN(n)
      })
      return a.length === size && f
    })
    console.log(rows)
    console.log(flag)
    return flag
  }
  
}

const m1 = Matrix(2, [1, 0, 2, -1, 3, 1])
const m2 = Matrix(3, [3, 1, 2, 1, 1, 0])

console.log(m1)
console.log(m2)
console.log(m1.multiplication(m2))
// console.log(_isMatrixLike(m1))
