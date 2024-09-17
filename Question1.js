const integerArray = [10, 9, 2, 5, 3, 7, 101, 18];

const subsequence = (integerArray /* Getting array as parameter */) => {
    let subsequenceArray = []; // Store longest ubsequence

    integerArray.forEach((num, i)=>{
        let sub = [num];
        let lastNumber = num;

        for (let j = i + 1; j < integerArray.length; j++) {
            // Add number in sub array if lastnumer is less than current nummer
            if (integerArray[j] > lastNumber) {
                sub.push(integerArray[j]);
                lastNumber = integerArray[j]; // Update lastnumber to newly added number
            }
        }

        // Update subsequenceArray if subsequenceArray less than sub array
        if (subsequenceArray.length < sub.length) {
            subsequenceArray = sub;
        }
    })

    return subsequenceArray;
}

// Call the function and console the oputput
console.log(subsequence(integerArray)); // Passing integerAarray aarray as aargument
