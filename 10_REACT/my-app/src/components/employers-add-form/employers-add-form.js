import { Component } from 'react/cjs/react.production.min';
import './employers-add-form.css'


//Мы в стейт помещаем значение value из инпута name и salary. Затем в один метод onValueChange мы прокидываем изменение нашего стейта для name и salary путем добавления атрибутов в саму верстку. Все что мы вводим в инпут контролируется при помощт state который записывается в этот компонент, это дает нам то, что стейт синхронизирован с интерфейсом (UI)
class EmployersAddForm extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name} 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary} 
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}


export default EmployersAddForm;