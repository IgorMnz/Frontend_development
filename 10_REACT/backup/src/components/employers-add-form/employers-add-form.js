import { Component } from 'react/cjs/react.production.min';
import './employers-add-form.css'


//Мы в стейт помещаем значение value из инпута name и salary. Затем в один метод onValueChange мы прокидываем изменение нашего стейта для name и salary путем добавления атрибутов в саму верстку. Контролируемые компоненты - Все что мы вводим в инпут контролируется при помощт state который записывается в этот компонент, это дает нам то, что стейт синхронизирован с интерфейсом (UI)
class EmployersAddForm extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            name: '',
            salary: ''
        }
    }

    //Создали метод изменение состояния когда в state будет заноситься все что мы ввели в инпут при вводе чего либо в 2 инпута которые мы объединили в один дата атрибут name но для каждого инпута он будет равняться либо name либо salary поэтому в этом метоже мы можем использовать только name
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.name.length && this.state.salary.length !== 0) {
            this.props.onAdd(this.state.name, this.state.salary);
        }



        this.setState ({
            name: '',
            salary: ''
        })
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit = {this.onSubmit}>
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