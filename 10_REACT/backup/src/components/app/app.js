import { Component } from 'react/cjs/react.production.min';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Smith', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex Shepard', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl Wilson', salary: 500, increase: false, rise: false, id: 3},
            ],
            term: ''
        }
        this.maxId = 4;
    }

    //Создаем метод для удаления орпеделенного элемента массива data по его id. Мы используем метод массива findIndex который принимает колбэк функцию которая запускается и если эта функциюя вернет тру, то из этого метода у нас будет возвращен номер элемента на котором сработала эта функция, где elem это каждый элемент массива по порядку и потом мы сравниваем то что вернулось из функции с тем id который у нас присвоен и когда мы найдем это совпадение то мы получим индекс того элемента который нужно будет удалить
    deleteItem = (id) => {
        this.setState(({data}) => {
            
            // const index = data.findIndex(elem => elem.id === id)            
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];

            //Мы с помощью метода filter создаем новый массив у которого не будет того элемента который был получен путем нажатия на кнопку удаления. То есть данные отфильтруются и останутся только те элементы id которых не совподают с тем id который к нам пришел как аргумент в deleteItem
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    //Создаем метод добавления нового сотрудника как добавление нового элемента в массив data:
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    //Этот метод будет изменять параметр Increase на противоположный у определенного элемента массива. В newItem создается новый объект в массив в котором после разворота ...old если мы пишем свойство которое входит в него, оно заменяется на то, что мы запишем после
    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];

        //     return {
        //         data: newArr
        //     }
        // })

        //Объект стейта мы изменять напрямую не можем, поэтому мы здесь возвращаем новый объект у которого будет свойство data и там будет формироваться новый массив через map причем через колбэк функцию которая находится внутри, когда у нас идет перебор всех объектов в массиве подряд если вдруг у нас совпали id то значит мы нашли нужный нам объект в таком случае мы будет возвращать новый обхект который будет содержать все старые свойства + поменянный на противоположный increase. Если же условие не совпало мы просто возвращаем этот объект
        this.setState(({data}) =>({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    //Реализуем метод поиска. в Условии проверяем чтобы у нас было хоть что то введено в поле поиска и если что то введено делаем filter по тому массиву который передаем и с помощью метода indexOf пытаемся найти те совпадения которые есть в item.name и введеное в строку поиска term. если возвращается -1 то занчит ничего не найдено и если найдено возвращает массив элементов в которых есть совпадение
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onUpdateSearch2 = (term) => {
        this.setState({term: term})
    }

    // onToggleRise = (id) => {
    //     this.setState(({data}) =>({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    render() {

        //Посчитаем количество сотрудников и сколько получат премию которое берем из стейта массива
        const {data, term} = this.state
        const employees = this.state.data.length
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.searchEmp(data, term);

        return(
            <div className="app">
                <AppInfo
                employees = {employees}
                increased = {increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch2={this.onUpdateSearch2}/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;