import _curry2 from './internal/_curry2';
import head from './head.js';
import reduce from './reduce.js';
import tail from './tail.js';


/**
 * Performs left-to-right function composition using transforming function. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (((a, b, ..., n) -> o), [(o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)(g, h, i)(...args) = f(i, f(h, f(g, ...args)))
 */
var pipeWith = _curry2(function pipeWith(xf, list) {
  if (list.length <= 0) {
    throw new Error('composition must contains at least one function');
  }

  return function() {
    return reduce(
      function(result, f) {
        return xf.call(this, f, result);
      },
      head(list).apply(this, arguments),
      tail(list)
    );
  };
});
export default pipeWith;