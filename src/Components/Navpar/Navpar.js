import React from 'react'
// import {AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FaArrowDown } from 'react-icons/fa'

const Navpar = () => {
  return (
    <nav className="container pt-2 pb-2 links ">
      <div className="nav-content row ">
        <div className=" category-list col-lg-6 col-md-6 d-flex justify-content-center align-items-center catIcon position-relative">
          {/* <AiOutlineBars  className='text-white fs-1 me-2' /> */}
          <h3 className="text-white ">
            Shop Categories
            <FaArrowDown className="ms-2" />
          </h3>
          <ul className=" altLinks text-black">
            <li>
              <Link to="/products/Men">Men</Link>
            </li>
            <li>
              <Link to="/products/Women">Women</Link>
            </li>
          </ul>
        </div>
        <div className="mainLinks col-lg-6 col-md-6 ">
          <ul className="d-flex justify-content-around align-items-center pt-3">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="text-white">
                OurStore
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navpar
