
function test(str) {
	function E (i) {
		return E1(T(i))
	}

	function E1 (i) {
		if (str[i] === '+') {
			return E1(T(i + 1))
		}
		return i
	}

	function T (i) {
		return T1(F(i))
	}

	function T1 (i) {
		if (str[i] === '*') {
			return T1(F(i + 1))
		}
		return i
	}

	function F (i) {
		if (str[i] === '-') {
			return F(i + 1)
		}
		if (str[i] === '(') {
			const newPos = E(i + 1)
			if (str[newPos] !== ')') {
				throw Error(`')' expected at ${newPos}`)
			}
			return newPos + 1
		}
		if (str[i] === '7' || str[i] === 'a') {
			return i + 1
		}
		throw Error(`unexpected symbol '${str[i]}' at ${i + 1}`)
	}

	try {
		const endPos = E(0)
		if (endPos !== str.length) {
			return `unexpected symbol '${str[endPos]}' at ${endPos + 1}`
		}
		return true
	}
	catch (e) {
		return e.message
	}
}

const plus = [
	'a',
	'-7',
	'a+a',
	'(a+a)',
	'(-(a+a)+7)',
	'a*7',
	'7*-a',
	'--7*-a',
	'-(((-a)))',
	'a*a*a*a*7+(-a)',
	'(a+(a+a)+a+a)*7*a+7+7',
]

const minus = [
	'a a',
	'a+*a',
	'lalala',
	'a(',
	'(',
	'(()()',
	'+7',
	'(a+((a+a)+a+a)*7*a',
]

console.log('=======================')
plus.forEach(str => console.log(test(str)))
console.log()
minus.forEach(str => console.log(test(str)))
