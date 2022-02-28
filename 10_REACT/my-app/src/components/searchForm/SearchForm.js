import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'

import './searchForm.scss'

const SearchForm = () => {

    return (
        <Formik
            initialValues = {{
                name: ''
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .required('This field id required')
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >

        <Form className="form">
            <div className="form__title">Find a character by name:</div>
                <div className="form__basics">

                    <div>
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            className="form__input"
                            // style={formik.errors.name && formik.touched.name ? {border: "red solid 1px"} : {border: "lightgrey solid 1px"}}
                        />
                        <ErrorMessage className="error" name="name" component="div"/>
                        <label htmlFor="name"></label>
                    </div>

                    <div className="form__btns">
                        <button type="submit" className="button button__main">
                            <div className="inner">Find</div>
                        </button>
                        <Link to={`/`} className="button button__secondary">    
                                <div className="inner">To Page</div>
                        </Link>
                    </div>
                </div>
        </Form>


        </Formik>
    )

}

export default SearchForm