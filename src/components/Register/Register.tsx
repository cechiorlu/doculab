import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "../../generated/graphql";
// import inputResolver from "../../utils/inputResolver";
import { useHistory } from "react-router-dom";
import { toErrorMap } from "../../utils/toErrorMap";
import { useState } from "react";
import ErrorBlock from "../ErrorBlock/ErrorBlock";


export interface IFormInput {
    name: String;
    email: String;
    password: String;
}

const Register = () => {
    const [errors, setErrors] = useState<Record<string, string>>({ name: "", email: "", password: "" })
    const history = useHistory();
    const [, registerMutation] = useRegisterMutation()
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async ({ name, email, password }) => {

        const response = await registerMutation({
            // @ts-ignore
            options: { name, email, password }
        })

        console.log(response)

        if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
            history.push("/");
        }

    }


    return (
        <div className="auth-wrap">
            <div className="form-container">

                <h2>
                    Create your Account
                </h2>
                <p>to continue to Docs</p>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="input-row">
                        <label>Name</label>
                        <input {...register("name", { required: true })} />
                        {errors?.name && <ErrorBlock>{errors.name}</ErrorBlock>}
                    </div>
                    <div className="input-row">
                        <label>Email</label>
                        <input {...register("email", { required: true })} autoComplete="username" name={"email"} />
                        {errors?.email && <ErrorBlock>{errors.email}</ErrorBlock>}
                    </div>
                    <div className="input-row">
                        <label>Password</label>
                        <input {...register("password", { required: true })} name={"password"} autoComplete="new-password" type={"password"} />
                        {errors?.password && <ErrorBlock>{errors.password}</ErrorBlock>}
                    </div>

                    <div className="form-footer">
                        <a href="/login">Sign in instead</a>
                        <button className="form-submit-btn" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register