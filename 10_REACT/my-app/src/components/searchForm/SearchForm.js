import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { useState } from 'react';

import useMarvelService from '../../services/MarvelService';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import './searchForm.scss';

const SearchForm = () => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    // const errorMessage = error ? <div className="error"><ErrorMessage /></div> : null;

    const errorMessage = <ErrorMessage component="div" className="error" name="charName" />

    const results = !char ? null : char.length > 0 ?
                    <div className="form__basics">
                        <div className="form__success">There is! Visit {char[0].name} page?</div>
                        <div className='form__btns'>
                        <Link to={`/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                        </div>
                    </div> :
                    <div className="error">
                        The character was not found. Check the name and try again
                    </div>

    console.log()



    return (
        <div className="form">

            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string()
                            .required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
            {props => {

                return (
                <Form>
                    <label className="form__title" htmlFor="charName">Find a character by name:</label>
                        <div className="form__basics">
                                <Field
                                    id="charName"
                                    name="charName"
                                    type="text"
                                    placeholder="Enter name"
                                    className="form__input"/>
                                <button 
                                    type="submit" 
                                    className="button button__main"
                                    disabled={loading}>
                                    <div className="inner">Find</div>
                                </button>
                        </div>
                        {props.dirty === false ? errorMessage : results}
                </Form>
                )
            }}
            </Formik>
            
            {/* {errorMessage} */}
        </div>
    )

}



export default SearchForm