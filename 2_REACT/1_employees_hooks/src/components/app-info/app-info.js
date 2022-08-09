import './app-info.css';

const AppInfo = ({increased, employees}) => {
    return(
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h4>Общее число сотрудников: {employees}</h4>
            <h4>Премию получат: {increased}</h4>
        </div>
    )
}

export default AppInfo;