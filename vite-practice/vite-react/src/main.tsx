import React from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from './mini-react/react-dom'

import './index.css'

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
      <button
        onClick={() => {
          console.log("omg"); //sy-log
        }}>
        click
      </button>
    </div>
  );
}

class ClassComponent extends React.Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <h1>买买买</h1>
    <a href="https://www.baidu.com/">baidu</a>
    <FunctionComponent name="好好" />
    {/* <ClassComponent name="class" /> */}
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