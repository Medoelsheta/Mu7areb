import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
const ProductCustomization = () => {
  let { id } = useParams('id')
  const { data } = useFetch(`products/${id}`)
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [description, setDescription] = useState(null)
  const [category, setCategory] = useState(data?.data?.choosenProduct?.kind)
  const [subCategory, setSubCategory] = useState(data?.data?.choosenProduct?.category)
  const [isTrending, setIstrending] = useState(data?.data?.choosenProduct?.isTrending)
  const token = useSelector(state => state.cart.token)
  const navigate = useNavigate()
  const formHandler = async e => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', name)
    form.append('price', price)
    form.append('description', description)
    form.append('kind', category)
    form.append('isTrending', isTrending)
    form.append('category', subCategory)
    form.append('images', image1)
    form.append('images', image2)
    await axios.patch(
      `https://e-commerce-hh3m.onrender.com/api/products/${id}`,
      {
        name: name ? name : data?.data?.choosenProduct?.name,
        price: price || data?.data?.choosenProduct?.price,
        description: description || data?.data?.choosenProduct?.description,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
    setName('')
    setPrice('')
    setDescription('')
    navigate('/admin/home')
    toast.success('Adding Edites Successfully')
  }
  const image1Handler = e => {
    setImage1(e.target.files[0])
  }
  const image2Handler = e => {
    setImage2(e.target.files[0])
  }
  const categoryHandler = e => {
    setCategory(e.currentTarget.id)
  }
  const subCategoryHandler = e => {
    setSubCategory(e.currentTarget.id)
  }
  const isTrendingHandler = e => {
    setIstrending(e.currentTarget.id)
  }

  return (
    <>
      <form className="productCustomize p-4" onSubmit={formHandler}>
        <h1>Customize product </h1>
        <div>
          <label>Name</label>
          <br />
          <input
            value={name || data?.data?.choosenProduct?.name}
            onChange={e => setName(e.currentTarget.value)}
            className="mt-1 p-1"
            type="text"
            placeholder="New Name"
          />
        </div>

        <label className="mt-3">Price: ${price || data?.data?.choosenProduct?.price}</label>
        <br />
        <input
          className="mt-1  p-1"
          value={price || data?.data?.choosenProduct?.price}
          onChange={e => setPrice(e.currentTarget.value)}
          type="number"
          placeholder="New Price"
        />
        <br />

        <div className="w-300 d-flex justify-content-between align-items-start dash-cat">
          <div>
            <label className="mt-2 h6">sub_categories</label>
            <br />
            <input
              onChange={subCategoryHandler}
              type="radio"
              className="me-2 ms-2"
              name="sub-cat"
              id="dresses"
            />
            <label className=" mt-2" htmlFor="Dresses">
              Dresses
            </label>
            <br />
            <input
              onChange={subCategoryHandler}
              type="radio"
              className="me-2 ms-2"
              name="sub-cat"
              id="hoddies"
            />
            <label className=" mt-2" htmlFor="Hoddies">
              Hoddies
            </label>
            <br />
            <input
              onChange={subCategoryHandler}
              type="radio"
              className="me-2 ms-2"
              name="sub-cat"
              id="jackets"
            />
            <label className=" mt-2" htmlFor="Jackets">
              Jackets
            </label>
            <br />
            <input
              onChange={subCategoryHandler}
              type="radio"
              className="me-2 ms-2"
              name="sub-cat"
              id="t-shirt"
            />
            <label className=" mt-2" htmlFor="T-shirts">
              T-shirts
            </label>
            <br />
            <input
              onChange={subCategoryHandler}
              type="radio"
              className="me-2 ms-2"
              name="sub-cat"
              id="running"
            />
            <label className=" mt-2" htmlFor="Track pants">
              Track pants
            </label>
            <br />
          </div>
          <div>
            <label className="h6 mt-3">Category</label>
            <br />
            <input type="radio" onChange={categoryHandler} className="me-2 ms-2" name="cat" id="Men" />
            <label className=" mt-2" htmlFor="Men">
              Men
            </label>
            <br />
            <input type="radio" onChange={categoryHandler} className="me-2 ms-2" name="cat" id="Women" />
            <label className=" mt-2" htmlFor="Women">
              Women
            </label>
            <br />
            <input type="radio" onChange={categoryHandler} className="me-2 ms-2" name="cat" id="Kids" />
            <label className=" mt-2" htmlFor="Kids">
              Kids
            </label>
            <br />
          </div>
        </div>
        <label className=" mt-3 me-2 mb-2">Is Trending</label>
        <br />
        <input onChange={isTrendingHandler} type="radio" className="me-2 ms-2" name="trend" id="True" />
        <label className=" mt-2" htmlFor="True">
          True
        </label>
        <input onChange={isTrendingHandler} type="radio" className="me-2 ms-2" name="trend" id="False" />
        <label className=" mt-2" htmlFor="False">
          False
        </label>
        <br />
        <h4 className="mt-3 mb-0">Description</h4>

        <textarea
          value={description || data?.data?.choosenProduct?.description}
          onChange={e => setDescription(e.currentTarget.value)}
          placeholder="New Description"
          className="mt-0 p-2"
          rows="4"
          cols="30"
          width="200"
          height="150"
        ></textarea>
        <br />
        <div className="productCustomizeImage d-flex flex-column justify-content-start mt-4 align-items-center">
          {image1 ? (
            <img src={URL.createObjectURL(image1)} alt="img1" />
          ) : (
            <img src={data?.data?.choosenProduct?.images[0]?.url} alt="img1" />
          )}
          <label className="btn  btn-danger mt-4" htmlFor="image-upload1">
            change
          </label>
        </div>
        <div className="productCustomizeImage d-flex flex-column justify-content-start mt-4 align-items-center">
          {image2 ? (
            <img src={URL.createObjectURL(image2)} alt="img2" />
          ) : (
            <img src={data?.data?.choosenProduct?.images[1]?.url} alt="img" />
          )}
          <label className="btn  btn-danger mt-4" htmlFor="image-upload2">
            change
          </label>
        </div>
        <input
          className="d-none"
          type="file"
          onChange={image1Handler}
          id="image-upload1"
          accept="image/jpeg, image/png, image/jpg"
        />
        <input
          className="d-none"
          type="file"
          onChange={image2Handler}
          id="image-upload2"
          accept="image/jpeg, image/png, image/jpg"
        />
        <br />
        <button type="submit" className="btn btn-primary btn-lg mt-3 p-2 w-300">
          Send
        </button>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default ProductCustomization
