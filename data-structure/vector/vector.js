function Vector(elem) {
  this._elem = elem.slice()
}

Vector.prototype.length = function() {
  return this._elem.length
}

Vector.prototype.uniquify = function() {
  let i = 0, j = 0
  while (++j < this._elem.length) {
    if (this._elem[i] != this._elem[j]) {
      this._elem[++i] = this._elem[j]
    }
  }
  i ++

  this._elem.length = i
  return j - i
}

Vector.prototype.find = function(e, lo, hi) {
  while ((lo < hi --) && (e != this._elem[hi]));
  return hi
}

Vector.prototype.remove = function(lo, hi) {
  if (lo == hi) return 0
  while (hi < this.length()) this._elem[lo++] = this._elem[hi++]
  this._elem.length = lo

  return hi - lo
}

Vector.prototype.deduplicate = function() {
  let elem = this._elem.slice()
  this.mergeSort(0, this.length())
  let count = this.uniquify()
  // let arr = []
  // let v = new Vector(elem)
  // for (let i = 0; i < elem.length; i ++) {
    
  //   let val = elem[i]
  //   let fidx = this.binSearch(val, 0, this.length())
    
  //   if (fidx != -1) {
  //     this.remove(fidx, fidx+1)
  //     arr.push(val)
  //   }
  // }
  // this._elem = arr
  return count
}

Vector.prototype.deduplicate2 = function() {
  let i = 1
  
  while (i < this.length()) {
    this.find(this._elem[i], 0, i)  == -1 ? i ++ : this.remove(i, i + 1)
  }
}

Vector.prototype.binSearch = function(e, lo, hi) {
  while (lo < hi) {
    var mi = Math.floor((hi + lo) / 2)
    if (e < this._elem[mi]) {
      hi = mi
    }else if (e > this._elem[mi]) {
      lo = mi + 1
    }else {
      return mi
    }
  }
  return -1
}

Vector.prototype.bubbleSort = function(lo, hi) {
  while (!this.bubble(lo, hi));
}

Vector.prototype.bubble = function(lo, hi) {
  var sorted = true
  while (++lo < hi) {
    if (this._elem[lo - 1] > this._elem[lo]) {
      sorted = false
      var temp = this._elem[lo - 1]
      this._elem[lo - 1] = this._elem[lo]
      this._elem[lo] = temp
    }
  }

  return sorted
}

Vector.prototype.mergeSort = function(lo, hi) {
  if (hi - lo < 2) return
  var mi = Math.floor((lo + hi) / 2)
  this.mergeSort(lo, mi)
  this.mergeSort(mi, hi)
  // console.log('先merge:', lo, mi, hi)
  this.merge(lo, mi, hi)
}

Vector.prototype.merge = function(lo, mi, hi) {
  var lb = mi - lo;
  var A = this._elem
  var B = this._elem.slice(lo, mi)
  var lc = hi - mi;
  // console.log(lo, mi, hi)
  // console.log(A)
  // console.log(B)
  // console.log(A[mi])
  for (var i = 0, j = 0, k = 0; (j < lb) || (k < lc);) {
    if ((j < lb) && (!(k < lc) || B[j] <= A[mi + k])) { A[lo + i] = B[j++]; i ++}
    if ((k < lc) && (!(j < lb) || A[mi + k] < B[j])) { A[lo + i] = A[mi + k]; i ++; k ++}
  }
}

Vector.prototype.quickSort = function(lo, hi) {
  if (hi - lo < 2) return
  let mi = this.partition(lo, hi - 1)
  this.quickSort(lo, mi)
  this.quickSort(mi + 1, hi) 
}

Vector.prototype.partition = function(lo, hi) {
  let pivot = this._elem[lo]

  while (lo < hi) {
    while ((lo < hi) && (pivot <= this._elem[hi])) {
      hi --
    }

    this._elem[lo] = this._elem[hi]

    while ((lo < hi) && (this._elem[lo] <= pivot)) {
      lo ++
    }

    this._elem[hi] = this._elem[lo]
  }

  this._elem[lo] = pivot

  return lo
}
 
let arr = [6,7,1, 2, 3, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5, 1, 5,7,1, 2, 3, 4, 5, 6, 7, 23, 55, 21, 1, 5]
var v = new Vector(arr)
var v2 = new Vector([1,2,7,2,5,6,7,1,223,89])

// console.log(v.binSearch(3, 0, v.length() - 1))

// console.log(v)

// console.log('dedup1: ')
// let date = +new Date()
// v.deduplicate()
// let date2 = +new Date()
// console.log(date2 - date + 'ms')

// console.log(v)
// console.log('dedup2: ')
// let date3 = +new Date()
// v2.deduplicate2()
// let date4 = +new Date()
// console.log(date4 - date3 + 'ms')

// console.log(v2)

let date3 = +new Date()
v2.quickSort(0, v2.length())

let date4 = +new Date()
console.log(date4 - date3 + 'ms')
console.log(v2)