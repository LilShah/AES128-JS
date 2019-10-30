/* let originalLog = console.log;
console.log = obj => originalLog(JSON.stringify(obj));
 */
class AES128 {
  //Constructor. Takes in input text and key
  /*******************************************************/
  constructor(text, key) {
    this.text = text;
    this.textArr = [];
    this.key = key;
    this.roundKeys = [];
    this.cipherText = [];
    this.sBox = [
      [
        0x63,
        0x7c,
        0x77,
        0x7b,
        0xf2,
        0x6b,
        0x6f,
        0xc5,
        0x30,
        0x01,
        0x67,
        0x2b,
        0xfe,
        0xd7,
        0xab,
        0x76
      ],
      [
        0xca,
        0x82,
        0xc9,
        0x7d,
        0xfa,
        0x59,
        0x47,
        0xf0,
        0xad,
        0xd4,
        0xa2,
        0xaf,
        0x9c,
        0xa4,
        0x72,
        0xc0
      ],
      [
        0xb7,
        0xfd,
        0x93,
        0x26,
        0x36,
        0x3f,
        0xf7,
        0xcc,
        0x34,
        0xa5,
        0xe5,
        0xf1,
        0x71,
        0xd8,
        0x31,
        0x15
      ],
      [
        0x04,
        0xc7,
        0x23,
        0xc3,
        0x18,
        0x96,
        0x05,
        0x9a,
        0x07,
        0x12,
        0x80,
        0xe2,
        0xeb,
        0x27,
        0xb2,
        0x75
      ],
      [
        0x09,
        0x83,
        0x2c,
        0x1a,
        0x1b,
        0x6e,
        0x5a,
        0xa0,
        0x52,
        0x3b,
        0xd6,
        0xb3,
        0x29,
        0xe3,
        0x2f,
        0x84
      ],
      [
        0x53,
        0xd1,
        0x00,
        0xed,
        0x20,
        0xfc,
        0xb1,
        0x5b,
        0x6a,
        0xcb,
        0xbe,
        0x39,
        0x4a,
        0x4c,
        0x58,
        0xcf
      ],
      [
        0xd0,
        0xef,
        0xaa,
        0xfb,
        0x43,
        0x4d,
        0x33,
        0x85,
        0x45,
        0xf9,
        0x02,
        0x7f,
        0x50,
        0x3c,
        0x9f,
        0xa8
      ],
      [
        0x51,
        0xa3,
        0x40,
        0x8f,
        0x92,
        0x9d,
        0x38,
        0xf5,
        0xbc,
        0xb6,
        0xda,
        0x21,
        0x10,
        0xff,
        0xf3,
        0xd2
      ],
      [
        0xcd,
        0x0c,
        0x13,
        0xec,
        0x5f,
        0x97,
        0x44,
        0x17,
        0xc4,
        0xa7,
        0x7e,
        0x3d,
        0x64,
        0x5d,
        0x19,
        0x73
      ],
      [
        0x60,
        0x81,
        0x4f,
        0xdc,
        0x22,
        0x2a,
        0x90,
        0x88,
        0x46,
        0xee,
        0xb8,
        0x14,
        0xde,
        0x5e,
        0x0b,
        0xdb
      ],
      [
        0xe0,
        0x32,
        0x3a,
        0x0a,
        0x49,
        0x06,
        0x24,
        0x5c,
        0xc2,
        0xd3,
        0xac,
        0x62,
        0x91,
        0x95,
        0xe4,
        0x79
      ],
      [
        0xe7,
        0xc8,
        0x37,
        0x6d,
        0x8d,
        0xd5,
        0x4e,
        0xa9,
        0x6c,
        0x56,
        0xf4,
        0xea,
        0x65,
        0x7a,
        0xae,
        0x08
      ],
      [
        0xba,
        0x78,
        0x25,
        0x2e,
        0x1c,
        0xa6,
        0xb4,
        0xc6,
        0xe8,
        0xdd,
        0x74,
        0x1f,
        0x4b,
        0xbd,
        0x8b,
        0x8a
      ],
      [
        0x70,
        0x3e,
        0xb5,
        0x66,
        0x48,
        0x03,
        0xf6,
        0x0e,
        0x61,
        0x35,
        0x57,
        0xb9,
        0x86,
        0xc1,
        0x1d,
        0x9e
      ],
      [
        0xe1,
        0xf8,
        0x98,
        0x11,
        0x69,
        0xd9,
        0x8e,
        0x94,
        0x9b,
        0x1e,
        0x87,
        0xe9,
        0xce,
        0x55,
        0x28,
        0xdf
      ],
      [
        0x8c,
        0xa1,
        0x89,
        0x0d,
        0xbf,
        0xe6,
        0x42,
        0x68,
        0x41,
        0x99,
        0x2d,
        0x0f,
        0xb0,
        0x54,
        0xbb,
        0x16
      ]
    ];
    this.rCon = [
      [0x00, 0x00, 0x00, 0x00],
      [0x01, 0x00, 0x00, 0x00],
      [0x02, 0x00, 0x00, 0x00],
      [0x04, 0x00, 0x00, 0x00],
      [0x08, 0x00, 0x00, 0x00],
      [0x10, 0x00, 0x00, 0x00],
      [0x20, 0x00, 0x00, 0x00],
      [0x40, 0x00, 0x00, 0x00],
      [0x80, 0x00, 0x00, 0x00],
      [0x1b, 0x00, 0x00, 0x00],
      [0x36, 0x00, 0x00, 0x00]
    ];
  }
  /*******************************************************/

  //Start here
  /*******************************************************/
  runAes = () => {
    this.key = this.keyPadding(this.key);
    //console.log(this.key);
    let keyArr = this.toHex(this.key);
    let w0 = keyArr.slice(0, 4);
    let w1 = keyArr.slice(4, 8);
    let w2 = keyArr.slice(8, 12);
    let w3 = keyArr.slice(12);

    let w4 = this.wXor(w0, this.getNextW(w3, 1));
    let w5 = this.wXor(w1, w4);
    let w6 = this.wXor(w2, w5);
    let w7 = this.wXor(w3, w6);
    let w8 = this.wXor(w4, this.getNextW(w7, 2));
    let w9 = this.wXor(w5, w8);
    let w10 = this.wXor(w6, w9);
    let w11 = this.wXor(w7, w10);
    let w12 = this.wXor(w8, this.getNextW(w11, 3));
    let w13 = this.wXor(w9, w12);
    let w14 = this.wXor(w10, w13);
    let w15 = this.wXor(w11, w14);
    let w16 = this.wXor(w12, this.getNextW(w15, 4));
    let w17 = this.wXor(w13, w16);
    let w18 = this.wXor(w14, w17);
    let w19 = this.wXor(w15, w18);
    let w20 = this.wXor(w16, this.getNextW(w19, 5));
    let w21 = this.wXor(w17, w20);
    let w22 = this.wXor(w18, w21);
    let w23 = this.wXor(w19, w22);
    let w24 = this.wXor(w20, this.getNextW(w23, 6));
    let w25 = this.wXor(w21, w24);
    let w26 = this.wXor(w22, w25);
    let w27 = this.wXor(w23, w26);
    let w28 = this.wXor(w24, this.getNextW(w27, 7));
    let w29 = this.wXor(w25, w28);
    let w30 = this.wXor(w26, w29);
    let w31 = this.wXor(w27, w30);
    let w32 = this.wXor(w28, this.getNextW(w31, 8));
    let w33 = this.wXor(w29, w32);
    let w34 = this.wXor(w30, w33);
    let w35 = this.wXor(w31, w34);
    let w36 = this.wXor(w32, this.getNextW(w35, 9));
    let w37 = this.wXor(w33, w36);
    let w38 = this.wXor(w34, w37);
    let w39 = this.wXor(w35, w38);
    let w40 = this.wXor(w36, this.getNextW(w39, 10));
    let w41 = this.wXor(w37, w40);
    let w42 = this.wXor(w38, w41);
    let w43 = this.wXor(w39, w42);
    let key0 = w0.concat(w1, w2, w3);
    let key1 = w4.concat(w5, w6, w7);
    let key2 = w8.concat(w9, w10, w11);
    let key3 = w12.concat(w13, w14, w15);
    let key4 = w16.concat(w17, w18, w19);
    let key5 = w20.concat(w21, w22, w23);
    let key6 = w24.concat(w25, w26, w27);
    let key7 = w28.concat(w29, w30, w31);
    let key8 = w32.concat(w33, w34, w35);
    let key9 = w36.concat(w37, w38, w39);
    let key10 = w40.concat(w41, w42, w43);
    for (let i = 0; i < 16; ++i) {
      key0[i] = key0[i].toString(16);
      key1[i] = key1[i].toString(16);
      key2[i] = key2[i].toString(16);
      key3[i] = key3[i].toString(16);
      key4[i] = key4[i].toString(16);
      key5[i] = key5[i].toString(16);
      key6[i] = key6[i].toString(16);
      key7[i] = key7[i].toString(16);
      key8[i] = key8[i].toString(16);
      key9[i] = key9[i].toString(16);
      key10[i] = key10[i].toString(16);
    }
    this.roundKeys.push(
      key0,
      key1,
      key2,
      key3,
      key4,
      key5,
      key6,
      key7,
      key8,
      key9,
      key10
    );
    //single digit hex to double digit
    for (let i = 0; i < this.roundKeys.length; ++i) {
      for (let j = 0; j < this.roundKeys[i].length; ++j) {
        if (this.roundKeys[i][j].length === 1)
          this.roundKeys[i][j] = "0" + this.roundKeys[i][j];
      }
    }
    //console.log(this.roundKeys);
    //key hex to int
    for (let i = 0; i < this.roundKeys.length; ++i) {
      for (let j = 0; j < this.roundKeys[i].length; ++j) {
        this.roundKeys[i][j] = parseInt(this.roundKeys[i][j], 16);
      }
    }
    //console.log(this.roundKeys);
    let lasti = 0;
    for (let i = 0; i < this.text.length; ++i) {
      if (i > 0 && i % 16 === 0) {
        let x = this.text.slice(i - 16, i);
        this.textArr.push(x);
        lasti = i;
      }
    }
    let x = "";
    for (let i = lasti; i < lasti + 16; ++i) {
      if (i < this.text.length) {
        x = x + this.text.charAt(i);
      } else x = x + "0";
    }

    this.textArr.push(x);
    //console.log(this.textArr);
    //plain text to hex
    for (let i = 0; i < this.textArr.length; ++i)
      this.textArr[i] = this.toHex(this.textArr[i]);
    //console.log(this.textArr);
    //round 0
    this.cipherText = this.textArr.slice();

    this.addRoundKey(0);

    //round 1-9
    for (let round = 1; round < 10; ++round) {
      this.subBytes(round);
      this.shiftRows(round);
      this.mixColumns(round);
      this.addRoundKey(round);
    }
    //round 10
    this.subBytes(10);
    this.shiftRows(10);
    this.addRoundKey(10);
    for (let i = 0; i < this.cipherText.length; ++i) {
      for (let j = 0; j < this.cipherText[i].length; ++j) {
        this.cipherText[i][j] = this.cipherText[i][j].toString(16);
      }
      this.cipherText[i] = this.cipherText[i].join("");
    }
    this.cipherText = this.cipherText.join("");
    return this.cipherText;
    //console.log("10: " + this.cipherText);
  };
  /*******************************************************/

  //W operations
  /******************************************************/
  getNextW = (xw, round) => {
    //by value
    let w = xw.slice();
    //left shift
    w.push(w.shift());
    //sBox replacement
    let nw = [];
    for (let i = 0; i < w.length; ++i) {
      let temp = w[i].toString(16);
      if (temp.length === 1) temp = "0" + temp;
      let x = this.sBox[parseInt(temp.charAt(0), 16)][
        parseInt(temp.charAt(1), 16)
      ];
      x = x ^ this.rCon[round][i];
      nw.push(x);
    }
    return nw;
  };
  /******************************************************/

  //XOR
  /*******************************************************/
  wXor = (w1, w2) => {
    let nw = [];
    for (let i = 0; i < w1.length; ++i) {
      let x = w1[i] ^ w2[i];
      nw.push(x);
    }
    return nw;
  };
  /*******************************************************/

  //ASCII to hex
  /*******************************************************/
  toHex = str => {
    let keyArr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
      let hex = Number(str.charCodeAt(i)).toString(16);
      keyArr.push(parseInt(hex, 16));
    }
    return keyArr;
  };

  /******************************************************/

  //Autokey padding
  /******************************************************/
  keyPadding = key => {
    while (key.length < 16) key += this.text.slice(0, 16 - key.length);
    return key.slice(0, 16);
  };
  /******************************************************/

  //ASCII to binary and back
  /*******************************************************/
  _toAscii = bin => {
    return bin.replace(/\s*[01]{8}\s*/g, bin => {
      return String.fromCharCode(parseInt(bin, 2));
    });
  };

  toBinary = str => {
    return str.replace(/[\s\S]/g, str => {
      str = this.zeroPad(str.charCodeAt().toString(2));
      return str;
    });
  };

  zeroPad = num => {
    return "00000000".slice(String(num).length) + num;
  };
  /******************************************************/

  //Round start
  /******************************************************/
  subBytes = () => {
    for (let i = 0; i < this.cipherText.length; ++i) {
      for (let j = 0; j < this.cipherText[i].length; ++j) {
        let temp = this.cipherText[i][j].toString(16);
        if (temp.length === 1) temp = "0" + temp;
        this.cipherText[i][j] = this.sBox[parseInt(temp.charAt(0), 16)][
          parseInt(temp.charAt(1), 16)
        ];
      }
    }
  };

  shiftRows = () => {
    for (let i = 0; i < this.cipherText.length; ++i) {
      [
        this.cipherText[i][1],
        this.cipherText[i][5],
        this.cipherText[i][9],
        this.cipherText[i][13],
        this.cipherText[i][2],
        this.cipherText[i][6],
        this.cipherText[i][10],
        this.cipherText[i][14],
        this.cipherText[i][7],
        this.cipherText[i][11],
        this.cipherText[i][15],
        this.cipherText[i][3]
      ] = [
        this.cipherText[i][5],
        this.cipherText[i][9],
        this.cipherText[i][13],
        this.cipherText[i][1],
        this.cipherText[i][10],
        this.cipherText[i][14],
        this.cipherText[i][2],
        this.cipherText[i][6],
        this.cipherText[i][3],
        this.cipherText[i][7],
        this.cipherText[i][11],
        this.cipherText[i][15]
      ];
    }
  };

  mixColumns = () => {
    let matrix = [[2, 1, 1, 3], [3, 2, 1, 1], [1, 3, 2, 1], [1, 1, 3, 2]];
    matrix = matrix[0].map((col, i) => matrix.map(row => row[i]));
    for (let i = 0; i < this.cipherText.length; ++i) {
      let newArr = [];
      for (let j = 1; j <= 4; ++j)
        newArr.push(this.cipherText[i].slice((j - 1) * 4, 4 * j));
      newArr = newArr[0].map((col, i) => newArr.map(row => row[i]));
      let result = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      for (let j = 0; j < 4; ++j) {
        for (let k = 0; k < 4; ++k) {
          for (let l = 0; l < 4; ++l) {
            let x = 0;
            if (matrix[j][l] === 1) x = newArr[l][k];
            else if (matrix[j][l] === 2) x = newArr[l][k] << 1;
            else x = (newArr[l][k] << 1) ^ newArr[l][k];
            if (x > 255) {
              x %= 256;
              x ^= 0x1b;
            }
            result[j][k] ^= x;
          }
        }
      }
      for (let l = 0; l < result.length; ++l) {
        for (let j = 0; j < result[i].length; ++j) {
          result[l][j] = result[l][j].toString(16);
          if (result[l][j].length === 1) result[l][j] = "0" + result[l][j];
        }
      }
      result = result[0].map((col, i) => result.map(row => row[i]));
      result = [].concat(...result);
      this.cipherText[i] = result.slice();
    }
  };

  addRoundKey = (round, encrypt = true) => {
    if (encrypt) {
      for (let i = 0; i < this.cipherText.length; ++i) {
        this.cipherText[i] = this.wXor(
          this.roundKeys[round],
          this.cipherText[i]
        );
      }
    }
  };
  /******************************************************/
}

main = button => {
  let input = document.getElementById("inputBox").value;
  let key = document.getElementById("keyBox").value;
  let output = document.getElementById("outputBox");
  output.value = "";
  if (button.id === "buttonAES") {
    let tester = new AES128(input, key);
    output.value = tester.runAes();
  }
  console.log(output.value);
};
