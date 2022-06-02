const array = [5, 2, 4, 3, 6, 2, 1];

const newArray = array.filter((item) => item % 2 !== 0).sort();
let key = 0;
const output = array.map((i) => {
  if(i%2 !== 0) {
    i = newArray[key];
    key++;    
  }
  return i;
});


console.log(output);