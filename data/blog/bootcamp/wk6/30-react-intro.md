---
title: Introduction to React
date: '2022-08-05'
tags: ['react']
images: ['/static/images/postImages/logo512.png']
draft: false
summary: Understanding the basics of a React app, and how to use React to build a simple app. Covers JSX, React components, and React lifecycle methods.
---

## Behind the scenes of React

### React.createElement

- Must define the type of **element** to create and any **properties** to pass to the element

**JSX:**

```jsx
const element = <h2 className="name">Name</h2>
```

Although this looks like HTML, it is actually JavaScript. This JSX is converted to JavaScript by the Babel compiler, producing the following code:

**JavaScript:**

```js
const element = React.createElement('h2', { className: 'name' }, 'Name')
```

> **Note**: In JSX we use `className` instead of `class` Many of the css classes are similar to the HTML attributes. Check out the [React documentation](https://reactjs.org/docs/dom-elements.html) for more info.

The `React.createElement(type, [props], [...children])` function allows us to create a hierarchy of **DOM nodes**. The following JSX describes a static tweet.

```jsx
import React from 'react'

function Tweet() {
  return (
    <article className="tweet">
      <header className="tweet__header">
        <img
          className="tweet__header-avatar"
          src="https://api.adorable.io/avatars/64/react@adorable.png"
          alt="Avatar"
        />
        <h2 className="tweet__header-name">React</h2>
      </header>
      <main className="tweet__content">
        <p>A JavaScript library for building user interfaces</p>
      </main>
      <footer className="tweet__footer">May 29th, 2013</footer>
    </article>
  )
}
```

This JSX can be used as a React component.

```jsx
const tweet = <Tweet />.
```

- **Components** must always start with a **capital letter**

### ReactDOM.render

- The `ReactDOM.render(element, container)` function takes a React element and renders it into the DOM.
- This requires some root element to be created.
  - Here we can use `<div id="root"></div>` to create a root element and is declared in the `index.html` file.

In the example below `document.getElementById("root")` in the call to `ReactDOM.render` is used to access the "root" DOM node.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Tweet(props) {
  return (
    <article className="tweet">
      <header className="tweet__header">
        <img className="tweet__header-avatar" src={props.avatar} />
        <h2 className="tweet__header-name">{props.name}</h2>
      </header>
      <main className="tweet__content">
        <p>{props.content}</p>
      </main>
      <footer className="tweet__footer">{props.date}</footer>
    </article>
  )
}

ReactDOM.render(
  <Tweet
    name="React"
    avatar="https://api.adorable.io/avatars/64/react@adorable.png"
    content="A JavaScript library for building user interfaces"
    date="May 29th, 2013"
  />,
  document.getElementById('root')
)
```

Most applications call `ReactDOM.render(element, container)` a **single time** to render the application.

### Expressions In JSX

- We can use and included expressions within JSX.
  - Expressions are wrapped in curly braces `{}`
  - Expressions are evaluated and converted to a string
  - The result of the expression is inserted into the JSX

In this example we pass in the `format` function to the `date` property of the `props` object.

Here the `format` function gets called each time the component is rendered.

```jsx
import { format } from 'date-fns'

function Footer(props) {
  return <footer className="tweet__footer">{format(props.date, 'MMMM Do, YYYY')}</footer>
}

ReactDOM.render(<Footer date="2013-05-29" />, document.getElementById('root'))
```

## JSX Rules

### Tags must be closed

- Use **two tags** (an open tag and a close tag - as with `<div>...</div>` below).
- Use **one self-closing** tag (as with `<Album />` below).

```jsx
<div>
  <img>
  <Album />
</div>
```

> Here we would get an error because the `<img>` tag is not closed. It should look like this: `<img />`

### Close child tags before parent tags

- We are making a hierarchy of tags.
  - The parent tag must be closed before the child tag is closed.
  - The parent tag must be closed before the grandchild tag is closed.

```jsx
<div>
  <ul> // this is the parent!
    <li> // WRONG
    </ul>
  </li> // WRONG
</div>
```

### JSX Expressions can only return one value

This will work:

```jsx
return (
  <div>
    <input />
  </div>
)

/* becomes */

return React.createElement('div', null, React.createElement('input', null))
```

This will not work:

```jsx
return (
  <div>
  </div>
  <input />
)

/* becomes? */

return (
  React.createElement("div", null)
  React.createElement("input", null)
)

/* Nope. Functions can't return multiple values like that. */
```

### No HTML Components

- Can't use HTML comments

BAD:

```jsx
return (
  <div>
    <!--- Not allowed --->
    {/* Allowed */}
  </div>
)
```

## Navigating Create React App Files

```
./
    node_modules/
    public/
    src/
    README.md
    package.json
```

### Public:

```
 ./public/
    favicon.ico
    index.html
    logo192.png
    logo512.png
    manifest.json
    robots.txt
```

- the `public/` folder contains elements that will be accessible to the **browser** when the development server is running.

### src:

```
./src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    reportWebVitals.js
    setupTests.js
```

- the `src/` folder contains all of the **code for our app**.
- the `create-react-app` package creates...
  - one **component** file (`App.js`)
  - an `index.js` that will **render our component** in the previously mentioned `index.html` file.

## how to think about components

### Cutting HTML into Components

![Tweeter](https://i.imgur.com/1llFp5F.png)

- We often have multiple pieces of HTML that need to be rendered.
  - For example in Tweeter, we have a nav, a new tweet, and a list of tweets, and an avatar.
  - We can think of these as **components**.

We need to create components for each of these pieces of HTML.

1. Create a new component file, capitalized, and name it `Nav`.
2. Create a functional component in that file that returns a some JSX.
3. Don't forget to export the functional component.

```jsx
function Navigation() {
  return <h2>I am a navigation component</h2>
}

export default Navigation
```

We would do this for each component.

### Organizing your code

- We can think of our components as **files**.
- We should organize our components into **folders**, therefore, within the `src/` folder we will have a `components/` folder to store all our components.

```
  ./src/
    components/
      Navigation.js
      Profile.js
      TweetList.js
      TweetForm.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    reportWebVitals.js
    setupTests.js
```

## Connecting Our Components

### Remove Styling from `create-react-app`

In the two CSS files generated (`index.css` and `App.css`), we have a lot of styles that we can get rid of.

> Remove unnecessary css by emptying the two CSS files.

### Remove content of `App.js`

The current `App.js` contains some text and logo that we don't need, so we should clean that up too.

> Remove unnecessary JSX.

- Clean your App component so that only `<div className="App"></div>` remains

```jsx
function App() {
  return <div className="App"></div>
}

export default App
```

### Import all your components

The `require() `syntax is based on `CommonJS` and is available inside Node.

More recently, we use the `import .. from ..` syntax which is from the `ES6` standard.

```jsx
import React from 'react'
```

```jsx
import Navigation from './components/Navigation'
import Profile from './components/Profile'
import TweetForm from './components/TweetForm'
import TweetList from './components/TweetList'
```

### Showing the Components

- wrap the name of what we imported between `<>`.

For example:

```jsx
<Navigation />
// use this if the component does not take in any children

// or

<Navigation>
  <h1>Hello</h1>
  <AnotherComponent />

</Navigation>
```

Should look like this:

```jsx
import Navigation from './components/Navigation'
import Profile from './components/Profile'
import TweetForm from './components/TweetForm'
import TweetList from './components/TweetList'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Profile />
      <TweetForm />
      <TweetList />
    </div>
  )
}

export default App
```

## Importing HTML In Components

So far we have our components, but we haven't imported any HTML.

- Don't forget about closing all tags!

```jsx
<br> // WRONG
<br /> // RIGHT
```

### Importing Styling

- We can import styling in our components.
- Same as before.
- Any any external CSS links in the `public/index/html` file that should be imported in our components.

```html
<!-- External CSS -->
<link rel="stylesheet" href="/vendor/normalize-4.1.1.css" type="text/css" />
<!-- external font from Google -->
<link
  href="https://fonts.googleapis.com/css?family=Bungee|Source+Sans+Pro:300,400,600"
  rel="stylesheet"
/>
<!-- font awesome (stretch) -->
<link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
  integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
  crossorigin="anonymous"
/>
```

### Converting Our HTML Content

Instead of hard coding the HTML into our JSX, we can have the JSX accept variables.

```jsx
function Tweet() {
  const tweet = {
    avatar: 'https://i.imgur.com/73hZDYK.png',
    firstName: 'Isaac',
    lastName: 'Newton',
    handle: '@SirIsaac',
    body: 'If I have seen further it is by standing on the shoulders of giants',
    age: '10 days ago',
  }

  const { avatar, firstName, lastName, handle, body, age } = tweet

  return (
    <article class="tweet">
      <header class="tweet--header">
        <img class="tweet--avatar" src={avatar} alt="head" />
        <h2 class="tweet--name">{firstName}</h2>
        <small class="tweet--handle">{handle}</small>
      </header>

      <div class="tweet--body">
        <p>{body}</p>
      </div>

      <footer class="tweet--footer">
        <small class="footer--age">
          {age}
          <small>
            <span class="footer--actions">
              <a href="#">
                <i class="fa fa-flag"></i>
              </a>
              <a href="#">
                <i class="fa fa-retweet"></i>
              </a>
              <a href="#">
                <i class="fa fa-heart"></i>
              </a>
              '
            </span>
          </small>
        </small>
      </footer>
    </article>
  )
}

export default Tweet
```

The issue here is we have two of the exact same components in our app.

```jsx
import Tweet from './Tweet'

function TweetList() {
  return (
    <section class="tweets">
      <Tweet />
      <Tweet />
    </section>
  )
}

export default TweetList
```

Before we can resolve this issue we need to cover event handling in React.

## Event Handling React

- Event handlers are specified with keywords on the HTML tags which specify the type of event.
- We specify a function that should be run when the event fires.
- In React, when we write JSX, the keywords are _camelCase_ (`onClick`).

`onClick` is the _keyword_ we use to listen for a **click** event on the `<button>`. When the button is clicked, the specified function will run:

```jsx
function Button() {
  return <button onClick={() => console.log('Button Clicked')}>Click me!</button>
}
```

If we have functions with multiple lines of code, we often pass a function reference to the component.

Note that the function reference is passed below:

- the function **isn't actually called** (`doStuff` is passed, not `doStuff()` with parentheses).

```jsx
function Button() {
  const doStuff = () => {
    console.log('Do stuff.')
    console.log('Do more stuff.')
    console.log('Do EVEN MORE stuff!')
  }

  return <button onClick={doStuff}>Click me!</button>
}
```

### Using The Event Parameter In Callback Functions

- The primary event handlers we use in React are...
  - `onClick`
  - `onChange`
  - `onSubmit`

When any of these events fire, an `event` object is automatically passed to the function that is invoked.

This `event` object may not be used, but it can contain a low of useful information.

For example, the x and y screen coordinates are printed to the console when a `<div>` is clicked.

```jsx
function MyClickableDiv() {
  return (
    <div
      onClick={(event) => {
        console.log(
          `The mouse coordinates of this click event are: x: ${event.screenX} and y: ${event.screenY}`
        )
      }}
    ></div>
  )
}
```