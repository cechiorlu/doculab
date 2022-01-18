import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInput {
    Email: String;
    Password: String;
}

const Login = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

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
                        <input {...register("Email")} required/>
                    </div>
                    <div className="input-row">
                        <label>Password</label>
                        <input {...register("Password")} required type={"password"}/>
                    </div>
                </form>

                <div className="form-footer">
                    <a href="/register">Create account</a>
                    <button className="form-submit-btn" type="submit">Sign in</button>
                </div>
            </ div>
        </div>
    );
}

export default Login