import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createExpenseApi } from "../../api/expenseApi";


interface PropsInterface {
    getExpenses: () => Promise<void>




}
export default function AddExpenseModal(props: PropsInterface) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)



    const [description, setDescription] = useState<string>();
    const [recorder, setRecorder] = useState<string>();
    const [branch, setBranch] = useState<string>(userInfo.branch);
    const [price, setPrice] = useState<number>();

    const [formError, setFormError] = useState<any>("");
    const navigate = useNavigate()


    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to add this expense?")) return;

        if (!description || !recorder || !price) {
            setFormError("All fields Are Necessary")
            return;
        }





        try {
            const { data } = await createExpenseApi({ description, recorder, price, branch });
            props.getExpenses();
            toast.success("Expense Submitted Successfully");
            cleanVariables()
        } catch (error: any) {
            error.response && error.response.data ? setFormError(error.response.data.error) : setFormError("An Internal Server Error Occured");
        }

    }
    function cleanVariables() {
        setDescription("")
        setRecorder("")
        setPrice(0);
        setFormError("")

    }




    useEffect(() => {
        !userInfo && navigate("/")

    }, [])

    useEffect(() => {

        setRecorder(userInfo._id)


    }, []);

    return <>
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addExpense"><i className="fa fa-plus"></i> Add Expense</button>
            <div className="modal fade" id="addExpense" tabIndex={3} aria-labelledby="verticallyCenteredModalLabel" style={{ display: 'none' }} aria-hidden="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-service" id="verticallyCenteredModalLabel">{"Add"} Expense</h5><button className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><svg className="svg-inline--fa fa-xmark fs--1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>{/* <span class="fas fa-times fs--1"></span> Font Awesome fontawesome.com */}</button>
                        </div>
                        <div className="modal-body">
                            {formError && <div className="alert alert-danger p-2 mb-3 text-light">{formError}</div>}
                            <div className="row">
                                <div className="col-xl-12">
                                    <form onSubmit={submitHandler} className="row g-3 mb-6">
                                        <div className="col-12 gy-6">
                                            <div className="form-floating"><textarea value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} className="form-control" id="floatingProjectOverview" placeholder="Expense Description" style={{ height: 150 }} defaultValue={""} /><label htmlFor="floatingProjectOverview">Expense Description</label></div>
                                        </div>

                                        <div className="col-md-12 ">
                                            <div className="form-floating"><input value={price} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} className="form-control" id="floatingInputBudget" type="number" placeholder="Price" /><label htmlFor="floatingInputBudget">Expense Price</label></div>
                                        </div>
                                        <div className="col-12 gy-6">
                                            <div className="row g-3 justify-content-end">

                                                <div><button type="submit" className="btn btn-primary px-5 px-sm-15 w-100" >{"Create"} Expense</button></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer"><button onClick={props.getExpenses} className="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Exit</button></div>
                    </div>

                </div>
            </div>
        </div>

    </>
}