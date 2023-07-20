import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../api/userApi";
export default function LoginPage() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        if (!email || !password) {
            setError("Please Fill All Fields.");
            return;
        }
        
        try {
            const { data } = await loginUser({ email, password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            toast.success("Login Successful")
            navigate("/records")
            window.location.reload();


        } catch (error: any) {
            error.response.data && error.response.data ? setError(error.response.data.error) : setError("An Internal Server Error Occured");

        }


    }

    useEffect(() => {
      userInfo && navigate("/dashboard")
    },[])
    return <>
        <div>
            <div className="container">
                <form className="row flex-center min-vh-100 py-5" onSubmit={submitHandler}>
                    <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3"><a className="d-flex flex-center text-decoration-none mb-4" href="../../../index-2.html">
                        <div className="d-flex align-items-center fw-bolder fs-5 d-inline-block"><img src="../../../assets/img/icons/logo.png" alt="phoenix" width={58} /></div>
                    </a>
                        <div className="text-center mb-7">
                            <h3 className="text-1000">Sign In</h3>
                            <p className="text-700">Get access to your account</p>
                        </div>
                        <button style={{ display: "none" }} className="btn btn-phoenix-secondary w-100 mb-3"><span className="fab fa-google text-danger me-2 fs--1" />Sign in with google</button><button style={{ display: "none" }} className="btn btn-phoenix-secondary w-100"><span className="fab fa-facebook text-primary me-2 fs--1" />Sign in with facebook</button>
                        <div style={{ display: "none" }} className="position-relative">
                            <hr className="bg-200 mt-5 mb-4" />
                            <div className="divider-content-center">or use email</div>
                        </div>
                        {error && <div className="alert alert-danger p-2">{error}</div> }
                        
                        <div className="mb-3 text-start"><label className="form-label" htmlFor="email">Email address</label>
                            <div className="form-icon-container">
                                <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="form-control form-icon-input py-3" id="email" type="email" placeholder="Enter Email Address" /><span className="fas fa-user text-900 fs--1 form-icon" /></div>
                        </div>
                        <div className="mb-3 text-start"><label className="form-label" htmlFor="password">Password</label>
                            <div className="form-icon-container">
                                <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className="form-control form-icon-input py-3" id="password" type="password" placeholder="Password" /><span className="fas fa-key text-900 fs--1 form-icon" /></div>
                        </div>
                        <div className="row flex-between-center mb-7">
                            <div className="col-auto">
                                <div className="form-check mb-0"><input className="form-check-input" id="basic-checkbox" type="checkbox" defaultChecked /><label className="form-check-label mb-0" htmlFor="basic-checkbox">Remember me</label></div>
                            </div>
                            <div className="col-auto"><a className="fs--1 fw-semi-bold" >Forgot Password?</a></div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Sign In</button>
                    </div>
                </form>
            </div>
        </div>

    </>
}