import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { useSelector, useDispatch } from "react-redux";

import {inc, dec, rnd} from '../actions';

const Counter = () => {

    const counter = useSelector(state => state.counter)
    const dispstch = useDispatch()

    return (
        <div className="jumbotron">
            <h1>{counter}</h1>
            <button onClick={() => dispstch(dec())} className="btn btn-primary">DEC</button>
            <button onClick={() => dispstch(inc())} className="btn btn-primary">INC</button>
            <button onClick={() => dispstch(rnd())} className="btn btn-primary">RND</button>
        </div>
    )
}

// //В этой функции мы должны указать те свойства которые хотим вытащить из стейта, а нашем случае это счетчик(counter). Когда запустится connect то объект который возвращается из этой функции превратится в props для данного компонента Counter
// const mapStateToProps = (state) => {
//     return {
//         counter: state.value
//     }
// }

// // const mapDispatchToProps = (dispatch) => {
// //     return bindActionCreators(actions, dispatch)
     
// // }

// export default connect(mapStateToProps, actions)(Counter)
export default Counter