// buat array 1-100
const array = Array.from({ length: 100 }, (_, i) => i + 1);

// fungsi untuk mengecek apakah itu bilangan prima atau bukan
const isPrime = (n) => {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const changedFooBar = array.filter(num => !isPrime(num)).reverse().map(n => n % 3 == 0 && n % 5 == 0 ? "FooBar" : n % 3 == 0 ? "Foo" : n % 5 == 0 ? "Bar" : n)

  console.log(changedFooBar.join(', '))