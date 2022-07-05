---
title: Intro to Async Control Flow and Filesystem Operations
date: '2022-08-04'
tags: ['Async', 'Filesystem']
images: ['/static/images/postImages/nordwood-themes-kRNZiGKtz48-unsplash.jpg']
draft: false
summary: Introduction to how async programming works in Node.js
---

Async programming is a new way to handle control flow in Node.js. It allows your code to start executing a potentially long-running task, while still allowing you to continue to do other things. Once the task is complete, your program can present the result. This is a powerful way to handle control flow in Node.js.

There are many functions enabled by browsers to handle asynchronous tasks. For example, the `fetch` function is used to make a request to a remote server. The `Promise` object is used to handle asynchronous tasks. One of the easiest ways to learn about asycn programming is to look at `setTimeout()`.

Why do we need to use async programming? Because Node.js is a single threaded language, and it is not possible to make requests to a remote server in the same thread as the code that is running.

The problem created with these long-running tasks is that the code that is running is not aware of when the task is complete. This means that the code that is running is not aware of the result of the task. Therefore, we need a way to:

- Start a long-running task
- Have a function start the operation and return something right away (allows the program to be responsive to the user)
- Tell us when the result of the task is available and is complete

When we talk about synchronous programming, we talk about code running in-order, from the top of the file to the bottom of the file.

## Blocking Code

Lets say we have a function that takes a very long time.

Since JavaScript is single threaded, it is not possible to run two functions at the same time. This means means that the code above must finish before moving on to the line below.

**Blocking code** is a function that takes a long time, preventing the code below from running.

What async code does is it starts, but gets out the way, allowing other functions to run. It does not block the code below.

## setTimeout

`setTimeout()` is a function that runs a function after a certain amount of time. We can specify how long it should wait before running the function by passing the duration in milliseconds as the second argument.

Can read more about setTimeout [here](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

Syntax:

```js
setTimeout(functionRef, delay)
```

## Mixing Async and Sync Code

Example:

```js
console.log('line one')

setTimeout(() => {
  console.log('timeout log')
}, 1000)

console.log('last line')
```

The code above will print out the following:

```
first line
last line
timeout line
```

> timeout line will appear after 1 second.

Once **all the synchronous code completes**, then the asynchronous code will start running.

### Why do we use setTimeout?

- We want to run a function after a certain amount of time.
- A site may use setTimeout to run a function after a certain amount of time.

### canceling setTimeout - `clearTimeout`

The function `setTimeout` returns an `object`. However, in the browser, the return value is a `number`. This is the ID of the timeout.

Back in node.js, we can use the `clearTimeout` function to cancel the timeout.

`clearTimeout(timeoutID)` accepts an ID of the timeout to cancel. We could have multiple timeouts running at the same time.

```js
const returnVal = setTimeout(() => {
  console.log('timeout log')
}, 1000)

console.log(returnVal) // prints out the ID of the timeout

clearTimeout(returnVal) // cancels the timeout
```

## multiple setTimeouts

We started all the timeouts at the same time. Therefore, it will print out in the order or the delay duration.

## SetInterval

Very similar to setTimeout, except it runs a function repeatedly. The syntax is the same as setTimeot (passing a callback and a delay in milliseconds).

When we use setInterval, we can pass in a callback function. The callback function will be run every time the interval is reached.

As soon as the interval ends, then the next interval will start.

```js
setInterval(() => {
  console.log('interval log')
}, 1000)
```

Use case:

- a countdown timer

# Filesystem Functions (`fs`) and Async Programming

## Reading Files

We do not need to install the `fs` module. It is already installed in Node.js. However, we do need to `require` it.

```js
const fs = require('fs')
```

If we were to console.log() the `fs` object, we would see the following:

```
{
  readFile: [Function: readFile],
  writeFile: [Function: writeFile],
  appendFile: [Function: appendFile],
  exists: [Function: exists],
  ...
}
```

> The `fs` object contains a number of functions that we can use to read files.

`fs.readFileSync('./somePath')` is a function that reads a file and returns a the **buffer** of the path. The buffer is a way to represent the contents of a file. It is an array of bytes.

We need to specify the **encoding** of the file. See node docs [here](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fsreadfilesyncpath-options).

```js
fs.readFileSync('./somePath', 'utf8')
```

What about the asynchronous version of the function? `fs.readFile` is a function that takes a **callback** function. The callback function will be called when the file is read.

```
fs.readFile(path[, options], callback)
```

```js
fs.readFile('./somePath', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

If we can read the data, then `err` will be `null`, and `data` will contain the contents of the file.

## Example with `fs.readFile` and async programming

```js
const fs = require('fs')

const breedDetailsFromFile = function (breed) {
  console.log('breedDetailsFromFile: Calling readFile...')
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.")
    // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
    if (!error) return data
  })
  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so breedDetailsFromFile function returns undefined.
}

// we try to get the return value
const bombay = breedDetailsFromFile('Bombay')
console.log('Return Value: ', bombay) // => will NOT print out details, instead we will see undefined!
```

Solution:

```js
const fs = require('fs')

const breedDetailsFromFile = function (breed, functionToRunWhenThingsAreDone) {
  console.log('breedDetailsFromFile: Calling readFile...')
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    // CHANGE: Pass data into callback instead of returning it directly
    console.log("In readFile's Callback: it has the data.")
    if (!error) functionToRunWhenThingsAreDone(data)
  })
}

// CHANGE 1: Moved the console.log into a new function:
const printOutCatBreed = (breed) => {
  console.log('Return Value: ', breed) // => print out details correctly.
}

// CHANGE 2: we're now passing two arguments into breedDetailsFromFile: breed string and a callback function
breedDetailsFromFile('Bombay', printOutCatBreed)
```

> Here we are passing in a callback function. The callback function will be called when the file is read.

# Typewriter mini-project

We can use `process.stdout.write` to write to the console.

Print out each letter of a string in a typewriter effect.

```js
let index = 0

// printing each letter one at a time
const typewriter = setInterval(() => {
  if (index < sentence.length) {
    process.stdout.write(sentence[index])
    index++
  }

  if (index === sentence.length) {
    process.stdout.write('\n') // new line at the end
    clearInterval(typewriter)
  }
}, 50)
```

# Spinner mini-project

We can use the `\r` character to move the cursor back to the beginning of the line.

Example:

```js
process.stdout.write('hello spinner.js 👍 \rsuuuup\n')
```

We can use `\r` to fake an animation by replacing and re-writing a new character.

```js
setTimeout(() => {
  process.stdout.write('\r|   ')
}, 100)

setTimeout(() => {
  process.stdout.write('\r/   ')
}, 300)

setTimeout(() => {
  process.stdout.write('\r-   ')
}, 500)

setTimeout(() => {
  // Need to escape the backslash since it's a special character.
  process.stdout.write('\r\\   ')
}, 700)
```

## Breakout

### Recap

What are callbacks?

- a function within a function
- function gets passed in as another variable

### Difference between async and sync

With async, we can run code in the background while we wait for the result. It will be executed AFTER the main code is executed.

### setTimeout && setInterval

Both are called the same way.

```js
setTimeout(() => {
  console.log('timeout log')
}, 1000)
```

```js
setInterval(() => {
  console.log('timeout log')
}, 1000)
```

> The difference is that `setInterval` will run again and again till we clear it.

What is the difference between `setTimeout` and `setInterval`?

- with `setInterval` it is creating an interval that will run **again** and **again**, every time the interval is reached.
- `setTimeout` is creating a timeout that will **run once**.

### stdin && stdout

`process.stdout.write()` is a function that writes to the console. It is very similar to `console.log();`.

However, what `console.log()` actually creates a **line break**.

`process.stdout` does NOT create a line break. It is a stream.

Need to use `process.stdout.write("Hello\n")` to write to the console with a line break at the end.

#### readline

Can read more on [readline here](https://nodejs.org/dist/latest-v16.x/docs/api/readline.html). or [here](https://github.com/nodejs/node/blob/main/doc/api/readline.md).

Syntax:

```js
rl.question('string query'[, options], callback)
```

`readline` is a module that allows us to read from the console. It is already installed in Node.js. We only need to require it.

```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('What is your favorite food?', (answer1) => {
  console.log(`${answer1} is my favorite too!`)
  rl.close()
})
```

> Only once it has the `answer1` will it execute the next line.

What is you want to ask another question?

We can chain multiple `rl.question` calls by passing in a callback function.

```js
rl.question('What is your favorite food?', (answer1) => {
  console.log(`${answer1} is my favorite too!`)
  // callback function
  rl.question('What is your name?', (answer2) => {
    console.log(`Nice to meet you, ${answer2}. My favorite food is also ${answer1}!`)
    rl.close()
  })
})
```

> We can chain multiple `rl.question` calls by passing in a callback function.