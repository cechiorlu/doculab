import { Resolver } from "react-hook-form";
import { IFormInput } from "../components/Register/Register";



const inputResolver: Resolver<IFormInput> = async (values) => {
    const getErrorField = () => {
        if (!values.password) {
            return {
                password: {
                    type: 'required',
                    message: 'This field is required.',
                },
            }
        }
        if (!values.email) {
            return {
                email: {
                    type: 'required',
                    message: 'This field is required.',
                }
            }
        }
        if (!values.name) {
            return {
                name: {
                    type: 'required',
                    message: 'This field is required.',
                }
            }
        }
        else {
            return {}
        }
    }

    return {
        values: values.email && values.password ? values : {},
        errors: getErrorField()
    };
};

export default inputResolver