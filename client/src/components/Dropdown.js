import React from 'react';
import '../css/dropdown.css';
import { Link } from 'react-router-dom';

const Dropdown = ({ elements }) => {

  return (
      <>
    {/* <div class="navbar"> */}
        {/* <a href="#home">Home</a>
        <a href="#news">News</a> */}
        <div className="dropdown">
            <button className="dropbtn">Settings
                {/* <i className="fa fa-caret-down"></i> */}
            </button>
            <div className="dropdown-content">
                {/* <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a> */}
                {elements.map((element, index) => (
                    <Link key={index} to={element.link}>{element.name}</Link>
                ))}
            </div>
        </div> 
    {/* </div> */}
    </>
  )
}

export default Dropdown