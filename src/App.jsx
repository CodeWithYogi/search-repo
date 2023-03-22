import React, { useState, useEffect, useRef } from 'react';
import Loading from './Loading';


export default function Posts() {

  // state declaration 
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLading] = useState(false)
  const [searchInput, setSearchInput] = useState('');

  // fetching the products 
  const fetchProducts = async () => {
    setLading(true)
    try {
      const response = await fetch(`https://dummyjson.com/products`)
      const data = await response.json()
      setAPIData(data.products)
      setLading(false)
      console.log(data.products);
    } catch (error) {
      console.log(error);
      setLading(false)
    }
  }

  // initial rendering of products 
  useEffect(() => {
    fetchProducts()
  }, [])

  
// filtering and sorting of array 
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      filteredData.sort((a, b) => {
        return b.price - a.price;
      })
      setFilteredResults(filteredData)
      console.log(filteredData);
    }
    else {
      setFilteredResults(APIData)
      console.log(APIData)
    }
  }

  // style the Component 
  const myStyle = {
    padding: '1em',
    maxWidth: '700px',
    margin: 'auto'
  }

  if(loading){
    return <Loading/>
  }


  return (
    <div style={myStyle}>
      <input
        placeholder='Search...'
        onChange={(e) => searchItems(e.target.value)}
        className='form-control'
      />
      <div itemsPerRow={3} style={{ marginTop: 20 }}>
        <table className="table">
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
            </tr>
          </thead>
          <tbody>
           
              {
                searchInput.length > 1 ? filteredResults.map((item)=>{
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>${item.price}</td>
                    </tr>
                  )
                }) : 
                APIData.map((item)=>{
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>${item.price}</td>
                    </tr>
                  )
                })
              }
           
          </tbody>
        </table>
      </div>
    </div>
  )
}