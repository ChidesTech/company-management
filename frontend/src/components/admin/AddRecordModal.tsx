import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IServiceInterface } from "../../interfaces/IServiceInterface";
import { IUserInterface } from "../../interfaces/IUserInterface";
import { createRecordApi } from "../../api/recordApi";
import { getServicesApi } from "../../api/serviceApi";
import { getUsersApi } from "../../api/userApi";

interface PropsInterface {
    getRecords: () => Promise<void>




}
export default function AddRecordModal(props: PropsInterface) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)
    
    const [services, setServices] = useState<IServiceInterface[]>([]);
    const [loadingServices, setLoadingServices] = useState<boolean>(true);
    const [errorServices, setErrorServices] = useState<any>()
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [errorUsers, setErrorUsers] = useState<any>()
    const [service, setService] = useState<string>();
    const [renderer, setRenderer] = useState<string>();
    const [recorder, setRecorder] = useState<string>();
    const [branch, setBranch] = useState<string>(userInfo.branch);
    const [price, setPrice] = useState<number>();
    const [minPrice, setMinPrice] = useState<number>();
    const [formError, setFormError] = useState<any>("");
    const navigate = useNavigate()


    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to add this record?")) return;

        if (!service || !renderer || !recorder || !price) {
            setFormError("All fields Are Necessary")
            return;
        }

        if (minPrice && price < minPrice) {
            setFormError("You can't go below the minimum service price of ₦" + minPrice + ". Try again.");
            return;
        }



        try {
            const { data } = await createRecordApi({ service, renderer,recorder,  price , branch});
            props.getRecords();
            toast.success("Record Submitted Successfully");            
            cleanVariables()
        } catch (error: any) {
            error.response && error.response.data ? setFormError(error.response.data.error) : setFormError("An Internal Server Error Occured");
        }

    }
    function cleanVariables() {
        setService("")
        setRenderer("")
        setPrice(0);
        setFormError("")

    }

    async function getServices() {
        try {
            const { data } = await getServicesApi();
            setServices(data);
        } catch (error: any) {
            error.response.data && error.response.data ? setErrorServices(error.response.data.error) : setErrorServices("An Internal Server Error Occured")
            setLoadingServices(false)
        }

        setLoadingServices(false)

    }

    async function getUsers() {
        try {
            const { data } = await getUsersApi({branch});
            setUsers(data);
        } catch (error: any) {
            error.response && error.response.data ? setErrorUsers(error.response.data.error) : setErrorUsers("An Internal Server Error Occured")

        }

        setLoadingUsers(false)

    }
   useEffect(() => {
    !userInfo && navigate("/")

   },[])

    useEffect(() => {
        getServices();
        setRecorder(userInfo._id)
    
        getUsers()
    }, []);

    return <>
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addRecord"><i className="fa fa-plus"></i> Add Record</button>
            <div className="modal fade" id="addRecord" tabIndex={3} aria-labelledby="verticallyCenteredModalLabel" style={{ display: 'none' }} aria-hidden="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-service" id="verticallyCenteredModalLabel">{"Add"} Record</h5><button className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><svg className="svg-inline--fa fa-xmark fs--1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>{/* <span class="fas fa-times fs--1"></span> Font Awesome fontawesome.com */}</button>
                        </div>
                        <div className="modal-body">
                            {formError && <div className="alert alert-danger p-2 mb-3 text-light">{formError}</div>}
                            <div className="row">
                                <div className="col-xl-12">
                                    <form onSubmit={submitHandler} className="row g-3 mb-6">
                                        <div className=" col-md-12 mb-3">
                                            <div>
                                                <select value={service} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                    setService(e.target.value);
                                                    let selectedService = services.find(x => x._id === e.target.value);
                                                    setPrice(selectedService?.price);
                                                    setMinPrice(selectedService?.price);

                                                }} className="form-control" id="floatingInputGrid" placeholder="--- Select Service ---" >
                                                    <option value="">--- SELECT SERVICE ---</option>
                                                    {loadingServices ? <option>Loading Services ....</option> : errorServices ? <option>{errorServices}</option> : services.length === 0 ? <option>No Services Added Yet</option> :
                                                        services.map(service => {
                                                            return <option key={service._id} value={service._id}>{service.title}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className=" col-md-12 mb-3">
                                            <div>
                                                <select value={renderer} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRenderer(e.target.value)} className="form-control" id="floatingInputGrid" placeholder="--- Select Service ---" >
                                                    <option value="">--- SELECT RENDERER  ---</option>
                                                    {loadingUsers ? <option>Loading Users ....</option> : errorUsers ? <option>{errorUsers}</option> : users.length === 0 ? <option>No users Added Yet</option> :
                                                        users.map(user => {
                                                            return <option key={user._id} value={user._id}>{user.name}</option>
                                                        })
                                                    }

                                                </select>
                                            </div>
                                        </div>



                                        <div className="col-md-12 ">
                                            <div className="form-floating"><input value={price} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} className="form-control" id="floatingInputBudget" type="number" placeholder="Budget" /><label htmlFor="floatingInputBudget">Service Price</label></div>
                                        </div>
                                        <div className="col-12 gy-6">
                                            <div className="row g-3 justify-content-end">

                                                <div><button type="submit" className="btn btn-primary px-5 px-sm-15 w-100" >{"Create"} Record</button></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer"><button onClick={props.getRecords} className="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Exit</button></div>
                    </div>

                </div>
            </div>
        </div>

    </>
}