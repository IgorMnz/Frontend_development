import './employers-list-item.css'


//каждый отдельный сотрудник который у нас будет находится в приложении. defaultValue в React будет показывать значение по умолчанию
const EmployersListItem = (props) => {
   
    //В константах деструктурируем объект чтобы потом в условиях if просто использовать названия пропсов. Мы навешиваем обработчик события onClick на span и с помощью метода onRise мы добавляем класс like, и при этом отслеживаем какое значение state было до этого, поэтому в this.state выше прописываем что rise: false

    const {name, salary, onDelete, onToggleProp, increase, rise} = props;

    let classNames = 'list-group-item d-flex justify-content-between';

    if (increase) {
        classNames += ' increase'
    }

    if(rise) {
        classNames += ' like'
    }

    return (
        <li className={classNames} tabIndex={0}>
            <span className="list-group-item-label" onClick={onToggleProp} data-toggle="rise">{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary + ' $'}/> 
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-toggle="increase">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployersListItem;