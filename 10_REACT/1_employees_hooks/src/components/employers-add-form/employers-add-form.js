import { useState } from 'react';

import './employers-add-form.scss'


//Мы в стейт помещаем значение value из инпута name и salary. Затем в один метод onValueChange мы прокидываем изменение нашего стейта для name и salary путем добавления атрибутов в саму верстку. Контролируемые компоненты - Все что мы вводим в инпут контролируется при помощт state который записывается в этот компонент, это дает нам то, что стейт синхронизирован с интерфейсом (UI)
const EmployersAddForm = (props) => {    

    const [name, setName] = useState('')
    const [salary, setSalary] = useState('')

    //Создали метод изменение состояния когда в state будет заноситься все что мы ввели в инпут при вводе чего либо в 2 инпута которые мы объединили в один дата атрибут name но для каждого инпута он будет равняться либо name либо salary поэтому в этом метоже мы можем использовать только name
    const onNameChange = (e) => {
        setName(e.target.value)        
    }

    const onSalaryChange = (e) => {
        setSalary(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (name.length && salary.length !== 0) {
            props.onAdd(name, salary);
        }

        setName('')
        setSalary('')
    }

    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form
                className="add-form d-flex"
                onSubmit={onSubmit}>
                <input type="text"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?"
                    name="name"
                    value={name} 
                    onChange={onNameChange}/>
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?"
                    name="salary"
                    value={salary} 
                    onChange={onSalaryChange}/>

                <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )


}

export default EmployersAddForm;


