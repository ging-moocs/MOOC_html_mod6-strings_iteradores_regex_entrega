// We won´t use fs promises because in windows 10 and Ubuntu writefile breaks promises in node 12
// we will use the standard callback version and promisify it
// const fs = require('fs').promises;
const fs = require("fs");

const {promisify} = require("util");
const access = promisify(fs.access);

const REG_URL = /(\b(http|ftp|https|ftps):\/\/[-A-ZáéíóúÁÉÍÓÚ0-9+&@#\/%?=~_|!:,.;]*[-A-ZáéíóúÁÉÍÓÚ0-9+&@#\/%=~_|])/ig;

const TestUtils = {};


TestUtils.checkFileExists = async (filepath) => {
    try {
        await access(filepath, fs.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

TestUtils.to = (promise) => promise.
    then((data) => [
        null,
        data
    ]).
    catch((err) => [err]);

TestUtils.getURL = (string) => {
    const urls = string.match(REG_URL);
    let url = null;

    if (urls instanceof Array) {
        [url] = urls;
    }
    return url;
};

// eslint-disable-next-line no-undefined
TestUtils.exists = (thing) => thing !== undefined && thing !== null;

TestUtils.isString = (thing) => typeof thing === "string" || thing instanceof String;

TestUtils.isObject = (thing) => typeof thing === "object" || thing instanceof Object;

TestUtils.isNumber = (thing) => {
    let number = false;

    if (TestUtils.exists(thing)) {
        number = typeof parseInt(thing, 10) === "number";
    }
    return number;
};

TestUtils.isArray = (thing) => thing instanceof Array;

TestUtils.isURL = (thing) => {
    if (TestUtils.isString(thing)) {
        return REG_URL.test(thing);
    }
};

TestUtils.isRegExp = (thing) => thing instanceof RegExp;

TestUtils.isJSON = (thing) => {
    try {
        JSON.parse(thing);
        return true;
    } catch (e) {
        return false;
    }
};

TestUtils.search = (b, a) => {
    if (TestUtils.isRegExp(b)) {
        if (TestUtils.isString(a) && a.length > 0) {
            return b.test(a);
        }
        return false;
    }
    if (TestUtils.isArray(a)) {
        let result = false;

        for (const item in a) {
            if (TestUtils.search(b, a[item])) {
                result = true;
            }
        }
        return result;
    }
    if (TestUtils.isString(a.toString())) {
        return a.toString().toLowerCase().
            indexOf(b.toLowerCase()) > -1;
    }
};


var wordList = [
  // Borrowed from xkcd password generator which borrowed it from wherever
  "ability","able","aboard","about","above","accept","accident","according",
  "account","accurate","acres","across","act","action","active","activity",
  "actual","actually","add","addition","additional","adjective","adult","adventure",
  "advice","affect","afraid","after","afternoon","again","against","age",
  "ago","agree","ahead","aid","air","airplane","alike","alive",
  "all","allow","almost","alone","along","aloud","alphabet","already",
  "also","although","am","among","amount","ancient","angle","angry",
  "animal","announced","another","answer","ants","any","anybody","anyone",
  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
  "appropriate","are","area","arm","army","around","arrange","arrangement",
  "arrive","arrow","art","article","as","aside","ask","asleep",
  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
  "attention","audience","author","automobile","available","average","avoid","aware",
  "away"]


TestUtils.randomArrayOfWordsGenerator = () => {
   let nItems = Math.floor(Math.random() * 20 ) + 2;
   let randomWords = [];
   let randomPos = Math.floor(Math.random() * (wordList.length - 1));
   while (nItems > 0 ) {
       randomPos =  Math.floor(Math.random() * (wordList.length - 1));
       if (randomWords.indexOf(wordList[randomPos]) === -1) {
           randomWords.push(wordList[randomPos]);
           nItems--;
       }
   }
   return randomWords;
}


module.exports = TestUtils;
