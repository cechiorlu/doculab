import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "../../generated/graphql";
import inputResolver from "../../utils/inputResolver";


export interface IFormInput {
    name: String;
    email: String;
    password: String;
}

const Register = () => {
    const [, registerMutation] = useRegisterMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: inputResolver });
    const onSubmit: SubmitHandler<IFormInput> = async ({name, email, password}) => {
        // const response = await registerMutation({name, email, password})
        console.log(name)

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
                        <input {...register("name")} />
                        {/* {errors?.name && <p>{errors.name.message}</p>} */}
                    </div>
                    <div className="input-row">
                        <label>Email</label>
                        <input {...register("email")} />
                        {/* {errors?.email && <p>{errors.email.message}</p>} */}
                    </div>
                    <div className="input-row">
                        <label>Password</label>
                        <input {...register("password")} type={"password"} />
                        {/* {errors?.password && <p>{errors.password.message}</p>} */}
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