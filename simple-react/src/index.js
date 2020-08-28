// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './lib/myReact';

const ReactDOM = React;

// const App = () => {
//   const [count, setCount] = React.useState(0);

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => {
//         setCount(count + 1)
//       }}>添加</button>
//     </div>
//   )
// }

function handleClick() {
  alert('当当')
}

const App = (
  <div>
    <h1>title</h1>
    <a href="http://www.baidu.com"></a>
    <button onClick={handleClick}>点我</button>
  </div>
)

ReactDOM.render(
  // <App/>,
  App,
  document.getElementById('root')
)