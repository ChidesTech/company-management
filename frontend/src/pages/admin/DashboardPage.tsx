import { ChangeEvent, useEffect, useState } from "react"
import {getRecordsApi } from "../../api/recordApi";
import Footer from "../../components/admin/Footer"
import AddRecordModal from "../../components/admin/AddRecordModal";
import { IRecordInterface } from "../../../../interfaces/IRecordInterface"

import {  format } from "date-fns";
import { getUsersApi } from "../../api/userApi";
import { IUserInterface } from "../../../../interfaces/IUserInterface";
import { DateRange } from "react-date-range";
import { branches } from "../../data";
import { getExpensesApi } from "../../api/expenseApi";
import { IExpenseInterface } from "../../../../interfaces/IExpenseInterface";


export default function DashboardPage() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

    const [records, setRecords] = useState<IRecordInterface[]>([]);
    const [expenses, setExpenses] = useState<IExpenseInterface[]>([]);
    const [error, setError] = useState<any>("");
    const [loadingRecords, setLoadingRecords] = useState<boolean>(true);
    const [loadingExpenses, setLoadingExpenses] = useState<boolean>(true);
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [errorUsers, setErrorUsers] = useState<any>()
    const [renderer, setRenderer] = useState<string>("");
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [branch, setBranch] = useState<string>(userInfo.branch || "")
    const [recorder, setRecorder] = useState<string>("");
    const [date, setDate] = useState<any>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);





    async function getRecords() {
        setLoadingRecords(true)
        try {
            const { data } = await getRecordsApi(
                { renderer, startDate: date[0].startDate.toISOString(), endDate: date[0].endDate.toISOString(), branch }
            );
            setRecords(data);
        } catch (error: any) {
            error.response.data && error.response.data ? setError(error.response.data.error) : setError("An Internal Server Error Occured")
            setLoadingRecords(false)
        }

        setLoadingRecords(false)

    }

    async function getUsers() {
        setLoadingUsers(true);

        try {
            const { data } = await getUsersApi({ branch });
            setUsers(data);
        } catch (error: any) {
            error.response && error.response.data ? setErrorUsers(error.response.data.error) : setErrorUsers("An Internal Server Error Occured")

        }

        setLoadingUsers(false)

    }

    async function getExpenses() {
        setLoadingExpenses(true)
        try {
            const { data } = await getExpensesApi(
                { recorder, startDate: date[0].startDate.toISOString(), endDate: date[0].endDate.toISOString(), branch }
            );
            setExpenses(data);
        } catch (error: any) {
            error.response.data && error.response.data ? setError(error.response.data.error) : setError("An Internal Server Error Occured")
            setLoadingExpenses(false)
        }

        setLoadingExpenses(false)

    }






    useEffect(() => {
        getRecords();
        getExpenses();
    }, [renderer, date, branch]);

    useEffect(() => {
        getUsers();
    }, [branch])




    return <>
        <div className="content">
            <div className="mb-9">
                <div className="row g-2 mb-4">
                    <div className="">
                        <h2 className="mb-0">Dashboard</h2>
                        <div className="d-flex justify-content-between flex-wrap mt-3 align-items-center">

                            {/* <div className="col col-auto">
                                <div className="search-box">
                                    <div>
                                        <label style={{ fontWeight: 600, fontSize: "1rem" }} htmlFor="">Filter By Employee</label>
                                        <select style={{ cursor: "pointer" }} value={renderer} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRenderer(e.target.value)} className="form-control" id="floatingInputGrid" placeholder="--- Select Service ---" >
                                            <option value="">All</option>
                                            {loadingUsers ? <option>Loading Users ....</option> : errorUsers ? <option>{errorUsers}</option> : users.length === 0 ? <option>No users Added Yet</option> :
                                                users.map(user => {
                                                    return <option key={user._id} value={user._id}>{user.name}</option>
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col col-auto mt-2">
                                <div className="search-box">
                                    <div>
                                        <label style={{ fontWeight: 600, fontSize: "1rem" }} htmlFor="">Filter By Branch</label>
                                        <select value={branch} onChange={(e: ChangeEvent<HTMLSelectElement>) => setBranch(e.target.value)} className="form-control" id="floatingInputGrid" placeholder="--- Select Branch ---" >
                                            <option value="">All</option>
                                            {branches.map((branch) => {
                                                return <option key={branch.name} value={branch.name}>{branch.name}</option>

                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-auto mt-2">
                                <div className="search-box">
                                    <div>
                                        <br />
                                        {/* <FontAwesomeIcon onClick={() => { setOpenDatePicker(!openDatePicker); setOpenOptions(false) }} icon={faCalendarDays} className="headerIcon" /> */}
                                        <strong className="form-control date-range" onClick={() => { setOpenDatePicker(!openDatePicker) }}>Filter By Date : {format(date[0].startDate, "dd/MM/yyyy")} -  {format(date[0].endDate, "dd/MM/yyyy")}</strong>
                                        {openDatePicker && <DateRange
                                            editableDateInputs={true}
                                            onChange={(item: any) => setDate([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={date}
                                            className="date-range-picker"
                                            rangeColors={["palevioletred"]}
                                        />}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <AddRecordModal
                                    getRecords={getRecords}
                                ></AddRecordModal>
                            </div>


                        </div>




                    </div>
                </div>
                <h5 className="mb-4 mt-4">Time Frame : {format(date[0].startDate, "dd/MM/yyyy")} -  {format(date[0].endDate, "dd/MM/yyyy")}</h5>
                <div className="row g-4">
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card text-light border bg-primary">
                            <div className="card-body">
                                <h4 className="card-title text-center text-light"><i className="fa fa-users"></i> Total Users </h4>
                                <h4 className="card-text mt-5 text-center text-light ">{loadingUsers ? "checking ...." : users.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card text-white border bg-success">
                            <div className="card-body">
                                <h4 className="card-title text-center text-light"><i className="fa fa-wallet"></i> Total Income Amount </h4>
                                <h4 className="card-text mt-5 text-center text-light">{loadingRecords ? "checking ...." : records.length === 0 ? <span>₦0</span> : <span>₦{(records.reduce((a, c) => a + c.price!, 0)).toLocaleString()}</span>}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card text-dark bg-info border ">
                            <div className="card-body">
                                <h4 className="card-title text-center text-dark"><i className="fa fa-handshake"></i> Total Service Rendered </h4>
                                <h4 className="card-text mt-5 text-center">{loadingRecords ? "checking ...." : records.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card text-light bg-danger border ">
                            <div className="card-body">
                                <h4 className="card-title text-center text-light"><i className="fa fa-wallet"></i> Total Expense Amount </h4>
                                <h4 className="card-text mt-5 text-center text-light ">{loadingExpenses ? "checking ...." : expenses.length === 0 ? <span>₦0</span> : <span>₦{(expenses.reduce((a, c) => a + c.price!, 0)).toLocaleString()}</span>}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card text-white bg-warning border">
                            <div className="card-body">
                                <h4 className="card-title text-center text-white"><i className="fa fa-credit-card"></i> Total Expense Recorded </h4>
                                <h4 className="card-text text-white mt-5 text-center">{loadingExpenses ? "checking ...." : expenses.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card text-dark bg-light border bg-white">
                            <div className="card-body">
                                <h4 className="card-title text-center text-dark"><i className="fa fa-money-bill"></i> NET INCOME </h4>
                                <h4 className="card-text mt-5 text-center">{loadingRecords || loadingExpenses ? "checking ...." : <span>₦{ (records.reduce((a, c) => a + c.price!, 0) - (expenses.reduce((a, c) => a + c.price!, 0))).toLocaleString()}  </span>}</h4>

                            </div>
                        </div>
                    </div>



                </div>
            </div>





            <Footer></Footer>
        </div >



    </>
}