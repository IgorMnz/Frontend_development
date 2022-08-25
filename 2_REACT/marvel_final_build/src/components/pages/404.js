
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'width': '200px', 'border': '1px solid', 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '40px', 'margin': '0 auto', 'borderRadius': '10px', 'padding': '10px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;