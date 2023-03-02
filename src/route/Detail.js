import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {plusObject} from './store';

function Detail(props) {
    let {id} = useParams();
    let find = props.shoes.find((x) => x.id == id)
    let [timeAlert, setAlert] = useState(true);
    let [checkNum, checkAlert] = useState('');
    let [tab, changeTab] = useState(0);
    let [fade2, setFade2] = useState('');
    let state = useSelector((state)=> state);
    let dispatch = useDispatch();

    useEffect(() => {
        // 여기 적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
        // 근데 html 렌더링 이후에
        let time = setTimeout(() => {
            setAlert(false)
        }, 2000)

        return () => {
            clearTimeout(time)
        }
    }, [checkNum]);

    useEffect(() => {
        setFade2('end');
        return () => {
            setFade2('')
        }
    }, [])

    return (
        <div className={"container start " + fade2}>
            {
                timeAlert == true
                ? <div className="alert alert-warning">2초 후에 사라집니다.</div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(Number(id)+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{find.title}</h4>
                    <p>{find.conent}</p>
                    <p>{find.price}원</p>
                    <button className="btn btn-danger"
                    onClick={() => {
                        dispatch(plusObject({id: find.id, name: find.title, count: 1}, state))
                    }}
                    >주문하기</button>
                </div>
                <Nav variant="tabs"  defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link onClick={()=>{
                            changeTab(0)
                        }}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={()=>{
                            changeTab(1)
                        }}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={()=>{
                            changeTab(2)
                        }}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab} className="tabContent"/>
            </div>
        </div> 
    );
}

function TabContent({tab}){
    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => {setFade('end')}, 100)

        return () => {
            setFade('')
        }
    }, [tab])

    return (
        <div className={'start ' + fade}>
            { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
}

export default Detail;