import { Component } from 'react/cjs/react.production.min';
import './employers-list-item.css'


//каждый отдельный сотрудник который у нас будет находится в приложении. defaultValue в React будет показывать значение по умолчанию
class EmployersListItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            increase: false,
            rise: false
        }
    }

    onIncrease = () => {
        this.setState(({increase}) =>({
            increase: !increase
        }))
    }

    onRise = () => {
        this.setState(({rise}) =>({
            rise: !rise
        }))
    }

    //В константах деструктурируем объект чтобы потом в условиях if просто использовать названия пропсов. Мы навешиваем обработчик события onClick на span и с помощью метода onRise мы добавляем класс like, и при этом отслеживаем какое значение state было до этого, поэтому в this.state выше прописываем что rise: false
    render() {
        const {name, salary} = this.props;
        const {increase, rise} = this.state;

        let classNames = 'list-group-item d-flex justify-content-between';

        if (increase) {
            classNames += ' increase'
        }

        if(rise) {
            classNames += ' like'
        }
    
    
        return (
            <li className={classNames}>
                <span className="list-group-item-label" onClick={this.onRise}>{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + ' $'}/> 
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={this.onIncrease}>
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            className="btn-trash btn-sm ">
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }

}

export default EmployersListItem;


//<span className="list-group-item-label" onClick={this.onLike}>{name}</span>