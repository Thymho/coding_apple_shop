import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { plusCount } from './store';

function Cart() {
    let state = useSelector((state) => state);
    let dispatch = useDispatch();

    return (
        <>
            {state.user.name}의 장바구니
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(plusCount(state.cart[i].id))
                                        }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </>
    );
}

export default Cart;