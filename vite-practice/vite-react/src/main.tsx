// import React, {Component} from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from './mini-react/react-dom'
import {useReducer} from './mini-react'

import './index.css'

function FunctionComponent(props) {
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //2
  return (
    <div className="border hh">
      <p>{props.name}</p>
      <p>{count2}</p>
      <button
        onClick={() => {
          setCount2();
          console.log("omg"); //sy-log
        }}>
        <text>click</text>
      </button>
    </div>
  );
}

// class ClassComponent extends Component {
//   render() {
//     return (
//       <div className="border">
//         <p>{this.props.name}</p>
//       </div>
//     );
//   }
// }

const jsx = (
  <div className="border hhs">
    <h1>买买买</h1>
    <a href="https://www.baidu.com/">baidu</a>
    <FunctionComponent name="好好" />
     {/* <ClassComponent name="class" />  */}
    <ul>

      <>
        <li>0</li>
        <li>1</li>
      </>
    </ul>
  </div>
);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(jsx)
ReactDOM.render(jsx, document.getElementById('root'))