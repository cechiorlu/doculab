import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import ErrorBlock from "../ErrorBlock/ErrorBlock";


interface IFormInput {
    email: String;
    password: String;
}

const Login = () => {
    const [errors, setErrors] = useState<Record<string, string>>({ email: "", password: "" })
    const { register, handleSubmit } = useForm<IFormInput>();
    const history = useHistory();
    const [, login] = useLoginMutation()
    const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
        const response = await login({
            // @ts-ignore
            email, password
        })

        console.log(response)

        if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
            history.push("/");
        }

    }

    return (
        <div className="auth-wrap">
            <div className="form-container login">
                <h2>
                    Sign in
                </h2>
                <p>to continue to Docs</p>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="input-row">
                        <label>Email</label>
                        <input {...register("email")} name={"email"} autoComplete="username" />
                        {errors?.email && <ErrorBlock>{errors.email}</ErrorBlock>}
                    </div>
                    <div className="input-row">
                        <label>Password</label>
                        <input {...register("password")} type={"password"} name={"password"} autoComplete="current-password" />
                        {errors?.password && <ErrorBlock>{errors.password}</ErrorBlock>}
                    </div>

                    <div className="form-footer">
                        <a href="/register">Create account</a>
                        <button className="form-submit-btn" type="submit">Sign in</button>
                    </div>
                </form>

            </ div>
        </div>
    );
}

export default Login