import { Component } from 'react/cjs/react.production.min';

import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: 1
        }
    }

    changeTab (tabActive) {
        return () => {
            this.setState({ tabActive: tabActive });
            this.props.changeTab(tabActive)
        };
    }

    getClassName(tabActive) {
        return (this.state.tabActive === tabActive ? 'btn btn-light' : 'btn btn-outline-light');
    }

    render() {
        return (
            <div className="btn-group">
                <button 
                    className={ this.getClassName(1)}
                    onClick={ this.changeTab(1) }
                    type="button">Все сотрудники
                </button>
                <button 
                    className={ this.getClassName(2)}
                    onClick={ this.changeTab(2) }
                    type="button">На повышение
                </button>
                <button 
                    className={ this.getClassName(3)}
                    onClick={ this.changeTab(3)}
                    type="button">З/П больше 1000$
                </button>
            </div>
        )
    }

}

export default AppFilter;