import EmployersListItem from "../employers-list-item/employers-list-item"
import './employers-list.css'


const EmployersList = ({data, onDelete, onToggleProp}) => {

    const elements = data.map(item => {
        //Деструктуризация по остаточному принипу, то есть мы вытаскиваем только значение пропса id а все остальные пропсы объединяем в itemProps
        const {id, ...itemProps} = item;
        return (
            //Результатом работы map будет являться новый массив сформированный из колбэк фукнции то в elements лежим массив со всеми компонентами которые приходят с сервера name={item.name} salary={item.salary} increase={item.increase}. Либо мы можем развернуть объект внутри массива на отдельные элементы с помощью spread оператора - {...item}
            <EmployersListItem 
                key={id} 
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}/>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;