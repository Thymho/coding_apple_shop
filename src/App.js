import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from './route/Detail';
import axios from 'axios';
import Cart from './route/Cart'

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(0);
  let navigate = useNavigate();

  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>navigate('/')}>ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/cart')}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i)=>{
                    return (
                      <Product key={shoes[i].id} shoes={shoes[i]} i={i} />
                    )
                  })
                }
                {
                  count !== 1?
                    <button onClick={()=>{
                      console.log(count)
                      setCount(++count)
                      axios.get("https://codingapple1.github.io/shop/data2.json")
                      .then((result) => {
                        let copy = result.data
                        console.log(copy)
                        shoes.push(...copy);
                      })
                      .catch(() => {
                        console.log("실패함")
                      })
                      
                      if(count === 1){
                        axios.get("https://codingapple1.github.io/shop/data3.json")
                        .then((result) => {
                          let copy = [...shoes, ...result.data]
                          setShoes(copy)
                        })
                        .catch(() => {
                          console.log("실패함")
                        })
                      } 
                    }}>더보기</button>
                  : null
                } 
              </div>
            </div>
          </>
        }/>
        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
        <Route path="/cart" element={ <Cart /> }/>
        <Route path="*" element={<div>잘못된 접속입니다.</div>}/>
      </Routes>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate();

  return (
    <div className="col-md-4" onClick={() => {
      navigate('/detail/'+(props.i))
    }}>
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width="80%" 
      alt='신발 이미지'/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;