import { Component } from "react/cjs/react.production.min";
import ErrorMessage from "../errorMessage/ErrorMessage";


class ErrorBoundary extends Component {
    state = {
        error: false
    }

    //Этот хук нужен для отлавливания ошибки. Он принимает в себя 2 аргумента err, info (err - это сама ошибка, errorinfo - информация о том компоненте, в котором произошла ошибка)
    componentDidCatch(err, errorinfo) {
        console.log(err, errorinfo);
        this.setState({
            error: true
        })
    }
    //В методе рендер мы проверяем если у нас стейт error = true тогда мы отрисовываем надпись что у нас что то сломалось. В обратном случаем мы возвращаем тот компонент который вложен в этот компонент (его children) и потом оборачиваем нашим предохранителем тот компнент или компоненты в которых мы ожидаем что могут произойти ошибки
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;