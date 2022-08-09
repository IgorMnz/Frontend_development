import { useState } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

const App = () => {

    const [data, setData] = useState([
        {name: 'Leanne Graham', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Ervin Howell', salary: 3000, increase: true, rise: false, id: 2},
        {name: 'Clementine Bauch', salary: 500, increase: false, rise: false, id: 3},
        {name: 'Patricia Lebsack', salary: 1000, increase: false, rise: true, id: 4},
        {name: 'Chelsey Dietrich', salary: 2900, increase: true, rise: false, id: 5},
        {name: 'Dennis Schulist', salary: 999, increase: false, rise: false, id: 6},
        {name: 'Kurtis Weissnat', salary: 4560, increase: false, rise: true, id: 7},
        {name: 'Nicholas Runolfsdottir', salary: 10000, increase: true, rise: false, id: 8},
        {name: 'Glenna Reichert', salary: 2385, increase: false, rise: false, id: 9},
        {name: 'Clementine DuBuque', salary: 200, increase: false, rise: false, id: 10},
    ])
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [maxId, setMaxId] = useState(11)

    //Создаем метод для удаления орпеделенного элемента массива data по его id. Мы используем метод массива findIndex который принимает колбэк функцию которая запускается и если эта функциюя вернет тру, то из этого метода у нас будет возвращен номер элемента на котором сработала эта функция, где elem это каждый элемент массива по порядку и потом мы сравниваем то что вернулось из функции с тем id который у нас присвоен и когда мы найдем это совпадение то мы получим индекс того элемента который нужно будет удалить
    const deleteItem = (id) => {

        //Мы с помощью метода filter создаем новый массив у которого не будет того элемента который был получен путем нажатия на кнопку удаления. То есть данные отфильтруются и останутся только те элементы id которых не совподают с тем id который к нам пришел как аргумент в deleteItem
        setData(data => data.filter(item => item.id !== id))
    }

    //Создаем метод добавления нового сотрудника как добавление нового элемента в массив data:
    const addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: maxId
        }

        setMaxId(maxId => maxId + 1)
        setData(data => [...data, newItem])
    }

    //Этот метод будет изменять параметр Increase на противоположный у определенного элемента массива. В newItem создается новый объект в массив в котором после разворота ...old если мы пишем свойство которое входит в него, оно заменяется на то, что мы запишем после
    const onToggleProp = (id, prop) => {

        //Объект стейта мы изменять напрямую не можем, поэтому мы здесь возвращаем новый объект у которого будет свойство data и там будет формироваться новый массив через map причем через колбэк функцию которая находится внутри, когда у нас идет перебор всех объектов в массиве подряд если вдруг у нас совпали id то значит мы нашли нужный нам объект в таком случае мы будет возвращать новый обхект который будет содержать все старые свойства + поменянный на противоположный increase. Если же условие не совпало мы просто возвращаем этот объект
        setData(data => data.map(item => {
            if (item.id === id) {
                return {...item, [prop]: !item[prop]}
            }
            return item;
        }))
    }

    //Реализуем метод поиска. в Условии проверяем чтобы у нас было хоть что то введено в поле поиска и если что то введено делаем filter по тому массиву который передаем и с помощью метода indexOf пытаемся найти те совпадения которые есть в item.name и введеное в строку поиска term. если возвращается -1 то занчит ничего не найдено и если найдено возвращает массив элементов в которых есть совпадение
    const searchEmp = (items, term) => {        
        if (term.length === 0) {
            return items;
        } else 
        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1            
        })
        
    }

    const onUpdateSearch2 = (term) => {
        setTerm(term)
    }

    const filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    const onFilterSelect = (filter) => {
        setFilter(filter)
    }

    const employees = data.length
    const increased = data.filter(item => item.increase).length
    const visibleData = filterPost(searchEmp(data, term), filter);

    const dataLength = visibleData.length

    return(
        <div className="app">
            <AppInfo
                employees = {employees}
                increased = {increased}
            />

            <div className="search-panel">
                <SearchPanel onUpdateSearch2={onUpdateSearch2}/>
                <AppFilter filter={filter} onFilterSelect={onFilterSelect}/>
            </div>


            <EmployersList 
                dataLength={dataLength}
                data={visibleData}
                onDelete={deleteItem}
                onToggleProp={onToggleProp}
            />
            <EmployersAddForm onAdd={addItem}/>
        </div>
    );

}

export default App;