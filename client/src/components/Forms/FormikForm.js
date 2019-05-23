import React, {Component} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router";
import {Button, Form} from "react-bootstrap";

import {Formik} from 'formik/dist/index';
import * as yup from 'yup';

import InputField from "./InputField";
import CheckBoxField from "./CheckBoxField";
import SelectField from "./SelectField";


class FormikForm extends Component {

    render() {

        console.log("[FOFORM]: FormikForm Component: Props: ", this.props);
        if (this.state.redirect) return <Redirect to={this.props.onSuccessLink}/>;

        const schemaPrep = {};
        Object.entries(this.props.fieldList).map(x => schemaPrep[x[0]] = x[1].validation);

        const schema = yup.object({...schemaPrep})
        return (
            <Formik
              validationSchema = {schema}
              onSubmit = { this.props.onSubmit }
              initialValues = {{ ...this.props.initialValues }}

              render={ props => {
                  const fields = Object.entries(this.props.fieldList).map(field => {
                       const key = field[0];
                       const value = field[1];
                       const type = field[1].type || "text";
                       const inputProps = {
                           name: key,
                           type: type,
                           title: value.title,
                           sm: value.sm || 12,
                           key,
                           ...props,
                           ...field[1]
                       }

                       switch(type){
                        default:
                        case 'text':
                        case 'password':
                            return <InputField {...inputProps } />

                        case 'select':
                            return <SelectField {...inputProps } />

                        case 'textarea':
                            return <InputField {...inputProps } as={'textarea'}/>

                        case 'checkbox':
                            return <CheckBoxField {...inputProps}/>

                       }

                      });

                  return <Form noValidate onSubmit={props.handleSubmit}>
                      <Form.Row>
                          { fields }
                      </Form.Row>
                      <Button type="submit">Save</Button>
                  </Form>
              }
              }
            />

    );
        }
};



export default FormikForm;

