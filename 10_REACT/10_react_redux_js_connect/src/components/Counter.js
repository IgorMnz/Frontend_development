import { connect } from "react-redux"
import * as actions from '../actions'
import { Component } from "react"

const Counter = ({counter, inc, dec, rnd}) => {
    return (
        <div className="jubotron">
            <h1>{counter}</h1>
            <button onClick={inc} className="btn btn-primary">INC</button>
            <button onClick={dec} className="btn btn-primary">DEC</button>
            <button onClick={rnd} className="btn btn-primary">RND</button>
      </div>
    )
}


// class Counter extends Component {
//     render() {

//         const {counter, inc, dec, rnd} = this.props

//         return (
//             <div className="jubotron">
//                 <h1>{counter}</h1>
//                 <button onClick={inc} className="btn btn-primary">INC</button>
//                 <button onClick={dec} className="btn btn-primary">DEC</button>
//                 <button onClick={rnd} className="btn btn-primary">RND</button>
//           </div>
//         )
//     }
// }


//После вызова функции connect у нас объект в этой функции превратится в props (и для пропса counter мы будем передавать значение state) который перейдет в наш компонент Counter. Эта функция должна быть чистой
const mapStateToProps = (state) => {
    return {
        counter: state.value
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(actions, dispatch)
// }

export default connect(mapStateToProps, actions)(Counter)