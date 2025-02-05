/** @param {NS} ns */
import { alphabet, lowercaseAlphabet, numbers } from 'base-library.js';
import { getPrimeFactors } from '/library/math-functions.js';

export const solverList = {
  "Merge Overlapping Intervals": "MergeOverlappingIntervals",
  "Total Ways To Sum": "TotalWaysToSum",
  "Array Jumping Game": "ArrayJumpingGameI",

  "Algorithmic Stock Trader I": "AlgorithmicStockTraderI",
  "Algorithmic Stock Trader II": "AlgorithmicStockTraderII",
  
  "Encryption I: Caesar Cipher": "CeaserCipher",
  "Encryption II: Vigenère Cipher": "VigenereCipher",

  "Compression I: RLE Compression": "RLECompression",

  "HammingCodes: Encoded Binary to Integer": "HammingCode",

  "Spiralize Matrix": "SpiralizeMatrix"
};

export const allSolvers = {
  SpiralizeMatrix: function(ns, matrix){
    let matrixList = [];

    matrix.forEach((subMatrix) => {
      subMatrix.forEach((matrixEntry) => {
        matrixList.push(matrixEntry);
      })
    })

    function findNext(matrixPointer, dir){

    }

    findNext(0, "L")
  },

  AlgorithmicStockTraderI: function(ns, data){
    const stocks = data;

    let smallest = 999;
    let biggestProfit = 0;

    stocks.forEach((stock) => {
      ns.print("Current Stock: ", stock)
      if(stock < smallest){
        smallest = stock
        ns.print("--NEW")
        ns.print("Smallest Stock: ", stock)
      }

      if((stock - smallest) > biggestProfit){
        biggestProfit = stock - smallest
        ns.print("--NEW")
        ns.print("Biggest Profit: ", stock - smallest)
      }
    })

    ns.print("//////////////////")
    ns.print("Biggest Profit: ", biggestProfit)

    return biggestProfit
  },

  AlgorithmicStockTraderII: function(ns, data){
    const stocks = data;

    let profit = 0;

    stocks.forEach((stock, stockIndex) => {
      ns.tprint("Current Stock: ", stock);
      ns.tprint("Past Stock: ", stocks[stockIndex - 1]);

      const possibleProfit = stock - stocks[stockIndex - 1];

      if(possibleProfit > 0){
        profit += possibleProfit
      };

      // if(stock < smallest){
      //   smallest = stock
      //   ns.print("--NEW")
      //   ns.print("Smallest Stock: ", stock)
      // }

      // if((stock - smallest) > biggestProfit){
      //   biggestProfit = stock - smallest
      //   ns.print("--NEW")
      //   ns.print("Biggest Profit: ", stock - smallest)
      // }
    })

    ns.tprint("//////////////////")
    ns.tprint("Profit: ", profit)

    return profit
  },

  VigenereCipher: function(ns, input, cipherKey){
    const inputArray = input.split('');
    let key = cipherKey.split('');

    if(key.length < inputArray.length){
      while(key.length < inputArray.length){
        key = key.concat(key)
      }
    }

    function vigenere(ns, keyLetter, ciphertext){
      const keyIndex = alphabet.indexOf(keyLetter);
      const cipherIndex = alphabet.indexOf(ciphertext);

      return alphabet[(keyIndex + cipherIndex) % 26]
    }

    let encrypted = "";

    inputArray.forEach((cipher, index) => {
      encrypted = encrypted.concat(vigenere(ns, key[index], cipher))
    })

    return encrypted
  },

  TotalWaysToSum: function(ns, number) {
    let sums = 0;

    for(let i = 1; i < number; i++){
      for(let j = 1 + i; j <= number; j++){
        if(i + j == number){
          sums++
        }
      }
    }
    return sums;
  },

  MergeOverlappingIntervals: function(ns, intervals){
  //  Given the following array of arrays of numbers representing a list of intervals, merge all overlapping intervals.

  //  [[4,12],[21,31],[5,10],[1,2],[9,18],[10,12],[3,7],[4,9],[20,23],[1,11],[7,16],[24,33],[7,13],[12,21],[15,22],[3,11],[19,23],[11,16],[25,27]]

  //  Example:

  //  [[1, 3], [8, 10], [2, 6], [10, 16]]

  //  would merge into [[1, 6], [8, 16]].

  //  The intervals must be returned in ASCENDING order. You can assume that in an interval, the first number will always be smaller than the second.

    function expandIntervals(ns, intervalArray){
      let expanded = [];

      for(let counter = intervalArray[0]; counter < intervalArray[1] + 1; counter++){
        ns.print(counter);
        expanded.push(counter);
      }

      ns.print(expanded);

      return expanded;
    }

    let group = [];

    let intervalGroup = intervals;

    intervalGroup.forEach((interval) => {
      group.push(expandIntervals(ns, interval));
    })

    group.sort((a, b) => a[0] - b[0]);

    let condensed = [];

    for(let parentIndex = 0; parentIndex < group.length; parentIndex++){
      let parent = group[parentIndex];

      let childIndex = 0;

      for(childIndex = parentIndex; childIndex < group.length; childIndex++){
        let child = group[childIndex];

        if(parentIndex !== childIndex){
          ns.print(parent, " | ", child);

          const endRange = child[child.length - 1];

          if(parent.includes(child[0]) || child.includes(parent[0])){
            if(endRange + 1 > parent[parent.length - 1]){
              ns.print("CONDENSED: ", parent[0], " | ", endRange);

              parent = expandIntervals(ns, [parent[0], endRange])
            } else {
              ns.print("CONDENSED: ", parent[0], " | ", parent[parent.length - 1]);
            }

            group.splice(childIndex, 1)

            if(parentIndex > childIndex){
              parentIndex -= 1
            }

            childIndex -= 1
          }
        }
      }

      group[parentIndex] = parent;
      ns.print(group);
    }

    function recondense(ns, numberArray){
      return [numberArray[0], numberArray[numberArray.length - 1]]
    }

    group.forEach((numberGroup, index) => {
      group[index] = recondense(ns, numberGroup)
    })

    group.sort((a, b) => a[0] - b[0])

    return group
  },

  HammingCode: function(ns, message){
    // You are given the following encoded binary string:
    // '1100100010000000000000000001110101001101010010110101101100110011'

    // Decode it as an 'extended Hamming code' and convert it to a decimal value.
    // The binary string may include leading zeroes.
    // A parity bit is inserted at position 0 and at every position N where N is a power of 2.
    // Parity bits are used to make the total number of '1' bits in a given set of data even.
    // The parity bit at position 0 considers all bits including parity bits.
    // Each parity bit at position 2^N alternately considers 2^N bits then ignores 2^N bits, starting at position 2^N.
    // The endianness of the parity bits is reversed compared to the endianness of the data bits:
    // Data bits are encoded most significant bit first and the parity bits encoded least significant bit first.
    // The parity bit at position 0 is set last.
    // There is a ~55% chance for an altered bit at a random index.
    // Find the possible altered bit, fix it and extract the decimal value.

    // Examples:

    // '11110000' passes the parity checks and has data bits of 1000, which is 8 in binary.
    // '1001101010' fails the parity checks and needs the last bit to be corrected to get '1001101011', after which the data bits are found to be 10101, which is 21 in binary.
    
    const messageArray = message.split("")

    function parityCheck(ns, parityBit, messageBits){
      let parity = 0;

      messageBits.forEach((bit) => {
        if(bit == 1){
          parity += 1;
        }
      })

      if(parity % 2 == 0){
        return 1
      } else {
        return 0
      }
    }

    parityCheck(ns, 0, messageArray)

  },

  RLECompression: function (ns, string){
    const trueAlphabet = alphabet.concat(lowercaseAlphabet, numbers);

    const stringArray = string.split('');

    ns.print(trueAlphabet);

    function compress(stringIndex){
      const letter = stringArray[stringIndex];

      let pointer = stringIndex

      let length = 0;

      while(stringArray[pointer] == letter && stringArray[pointer] !== undefined){
        length++
        
        ns.print(pointer, " => ", stringArray[pointer], " (", length, " so far)")

        pointer++
      }

      return([length, pointer])
    }

    let stringPointer = 0;

    let output = "";

    for(let i = 0; stringArray[stringPointer] !== undefined; i++){
      const result = compress(stringPointer);

      if(result[0] > 9){
        output += 9 + stringArray[stringPointer];
        output += ((result[0] % 10) + 1) + stringArray[stringPointer];
      } else {
        output += result[0] + stringArray[stringPointer];
      }

      stringPointer = result[1];
      
      ns.print(output)
    }

    return output
  },

  CeaserCipher: function (ns, data){
    const string = data[0];
    const shift = data[1];

    ns.print(string, " | ", shift);

    let encoded = "";

    const inputArray = string.split('');

    inputArray.forEach((letter) => {
      const letterIndex = alphabet.indexOf(letter);

      const newIndex = (letterIndex - shift) % 26;

      if(letterIndex == -1){
        encoded += " ";
      } else {
        if(newIndex < 0){
          ns.print(alphabet[letterIndex], " (", letterIndex, ")", " => ", alphabet[26 + newIndex], " (", newIndex, ")");

          encoded += alphabet[26 + newIndex];
        } else {
          ns.print(alphabet[letterIndex], " (", letterIndex, ")", " => ", alphabet[newIndex], " (", newIndex, ")");
          
          encoded += alphabet[newIndex];
        }
      }
    })

    return encoded
  },

  ArrayJumpingGameI: function(ns, array) {
    // Go through every jump.

    // If at any point you can only reach 0, delete the jump from the list and reiterate.

    // 1, 5, 0, 0, 1, 0, 4, 3, 0, 1, 4, 2, 1, 1, 2

    ns.print(array);

    let solvable = false;

    function iterate(currentJump) {
      ns.print("NEXT JUMP: ", array[currentJump]);

      for(let jumpIndex = 1; jumpIndex < array[currentJump] + 1; jumpIndex++){
        const newPos = currentJump + jumpIndex;

        ns.print(newPos, " => ", array[newPos]);

        if(newPos == array.length - 1 || solvable == true){
          solvable = true;
          jumpIndex = 999;
        } else {
          iterate(newPos);
        }
      }

      if(array[currentJump] == 0){
        ns.print("Found Cap! Going Back..")
      }
    }

    iterate(0);

    if(solvable == false){
      return 0;
    } else {
      return 1;
    }

  },

  ArrayJumpingGameII: function(ns, array) {
    // Iterate through every jump, then find the biggest jump out of those, and iterate through THOSE jumps.

    // If at any point you can only reach 0, delete the jump from the list and reiterate.

    // Profit.

    ns.tprint(array);

    let solvable = false;

    function iterate(currentJump) {
      ns.tprint("NEXT JUMP: ", array[currentJump]);

      for(let jumpIndex = 1; jumpIndex < array[currentJump] + 1; jumpIndex++){
        const newPos = currentJump + jumpIndex;

        ns.tprint(newPos, " => ", array[newPos]);

        if(newPos == array.length - 1 || solvable == true){
          solvable = true;
          jumpIndex = 999;
        } else {
          iterate(newPos);
        }
      }

      if(array[currentJump] == 0){
        ns.tprint("Found Cap! Going Back..")
      }
    }

    iterate(0);

    if(solvable == false){
      return 0;
    } else {
      return 1;
    }
  }
}
