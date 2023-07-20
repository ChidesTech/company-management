import { ChangeEvent, useEffect, useState } from "react"
import { deleteExpenseApi, getExpensesApi } from "../../api/expenseApi";
import Footer from "../../components/admin/Footer"
import AddExpenseModal from "../../components/admin/AddExpenseModal";
import { IExpenseInterface } from "../../interfaces/IExpenseInterface"
import UpdateServiceModal from "../../components/admin/UpdateServiceModal";
import { toast } from "react-toastify";
import { compareAsc, format } from "date-fns";
import { getUsersApi } from "../../api/userApi";
import { IUserInterface } from "../../interfaces/IUserInterface";
import { DateRange } from "react-date-range";
import { branches } from "../../data";
import Pagination from "../../components/Pagination";


export default function ExpensesPage() {
    //PAGINATION STARTS
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [nPages, setNPages] = useState<number>(0);
    //PAGINATION ENDS


    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

    const [expenses, setExpenses] = useState<IExpenseInterface[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<IExpenseInterface[]>([]);

    const [error, setError] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [errorUsers, setErrorUsers] = useState<any>()
    const [recorder, setRecorder] = useState<string>("");
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [branch, setBranch] = useState<string>(userInfo.branch || "")
    const [date, setDate] = useState<any>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);





    async function getExpenses() {
        setLoading(true)
        try {
            const { data } = await getExpensesApi(
                { recorder, startDate: date[0].startDate.toISOString(), endDate: date[0].endDate.toISOString(), branch }
            );
            
             setTotalExpenses(data);
             // Expenses to be displayed on the current page
             setExpenses(data.slice(indexOfFirstRecord, indexOfLastRecord));
             setNPages(Math.ceil(data.length / recordsPerPage));
             setCurrentPage(1);
        } catch (error: any) {
            error.response.data && error.response.data ? setError(error.response.data.error) : setError("An Internal Server Error Occured")
            setLoading(false)
        }

        setLoading(false)

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


    async function deleteHandler(id: any) {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;


        try {
            await deleteExpenseApi(id);
            getExpenses();
            toast.success("Expense Successfully Deleted")
        } catch (error: any) {
            error.response && error.response ? setError(error.response.data.error) : setError("An Internal Server Error Occured")

        }
    }






    useEffect(() => {
        getExpenses();
    }, [recorder, date, branch, currentPage]);

    useEffect(() => {
        getUsers();
    }, [branch])




    return <>
        <div className="content">
            <div className="mb-9">
                <div className="row g-2 mb-4">
                    <div className="">
                        <h2 className="mb-0">Expenses</h2>
                        <div className="d-flex justify-content-between flex-wrap mt-3 align-items-center">

                            {userInfo && userInfo.isAdmin &&
                                <div className="col ">
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
                            }

                            <div className="col ">
                                <div className="search-box">
                                    <div>
                                        <label style={{ fontWeight: 600, fontSize: "1rem" }} htmlFor="">Filter By Employee</label>
                                        <select style={{ cursor: "pointer" }} value={recorder} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRecorder(e.target.value)} className="form-control" id="floatingInputGrid" placeholder="--- Select Service ---" >
                                            <option value="">All</option>
                                            {loadingUsers ? <option>Loading Users ....</option> : errorUsers ? <option>{errorUsers}</option> : users.length === 0 ? <option>No users Added Yet</option> :
                                                users.map(user => {
                                                    return <option key={user._id} value={user._id}>{user.name}</option>
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col ">
                                <div className="search-box">
                                    <div>

                                        {/* <FontAwesomeIcon onClick={() => { setOpenDatePicker(!openDatePicker); setOpenOptions(false) }} icon={faCalendarDays} className="headerIcon" /> */}
                                        <label style={{ fontWeight: 600, fontSize: "1rem" }} htmlFor="">Filter By Date</label>

                                        <strong className="form-control date-range " onClick={() => { setOpenDatePicker(!openDatePicker) }}>Filter By Date : {format(date[0].startDate, "dd/MM/yyyy")} -  {format(date[0].endDate, "dd/MM/yyyy")}</strong>
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
                            {!userInfo.isAdmin &&  
                            
                            <div className="mt-4">
                            <AddExpenseModal
                                getExpenses={getExpenses}
                            ></AddExpenseModal>
                        </div>
                            }
                           


                        </div>




                    </div>
                </div>
                <h5 className="mb-4 mt-4">Time Frame : {format(date[0].startDate, "dd/MM/yyyy")} -  {format(date[0].endDate, "dd/MM/yyyy")}</h5>
                <h5 className="mb-4">Total Expenses Amount  : {loading ? "calculating ...." : totalExpenses.length === 0 ? <span>₦0</span> : <span>₦{(totalExpenses.reduce((a, c) => a + c.price!, 0)).toLocaleString()}</span>}   </h5>
                <div className="table-responsive scrollbar ms-n1 ps-1">
                    {
                        loading ? <h4 className="m-3">Loading Expenses ....</h4> : error ? <div className="alert alert-danger p-2 mb-3 text-light">{error}</div> : totalExpenses.length === 0 ? <div className="alert alert-primary p-2 mb-3">No Expenses Added Yet</div> :

                            <table className="table table-sm fs--1 mb-0">

                                <thead>
                                    <tr>
                                        {/* <th className="white-space-nowrap fs--1 align-middle py-4 ps-0">
                                            <div className="form-check mb-0 fs-0"><input className="form-check-input" id="checkbox-bulk-members-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;members-table-body&quot;}" /></div>
                                        </th> */}
                                        <th className="sort align-middle py-4" scope="col" data-sort="customer" style={{ width: '15%', minWidth: 200 }}>DESCRIPTION</th>
                                        <th className="sort align-middle py-4" scope="col" data-sort="email" style={{ width: '15%', minWidth: 200 }}>PRICE(₦)</th>
                                        <th className="sort align-middle py-4" scope="col" data-sort="city" style={{ width: '10%' }}>RECORDER</th>
                                        {userInfo && userInfo.isAdmin &&
                                            <th className="sort align-middle py-4 text-end" scope="col" data-sort="last_active" style={{ width: '21%', minWidth: 200 }}>BRANCH</th>}
                                        <th className="sort align-middle py-4 text-end" scope="col" data-sort="last_active" style={{ width: '21%', minWidth: 200 }}>DATE</th>
                                        <th className="sort align-middle py-4 text-end pe-0" scope="col" data-sort="joined" style={{ width: '19%', minWidth: 200 }}>TIME</th>
                                        {userInfo && userInfo.isAdmin &&
                                            <th className="sort align-middle py-4 text-end pe-0" scope="col" data-sort="joined" style={{ width: '19%', minWidth: 200 }}>ACTIONS</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody className="list" id="members-table-body">
                                    {expenses.map(expense => {
                                        return <tr key={expense._id} className="hover-actions-trigger btn-reveal-trigger position-static">
                                            {/* <td className="fs--1 align-middle py-4 ps-0 py-3">
                                                <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/32.webp&quot;,&quot;name&quot;:&quot;Carry Anna&quot;},&quot;email&quot;:&quot;annac34@gmail.com&quot;,&quot;mobile&quot;:&quot;+912346578&quot;,&quot;city&quot;:&quot;Budapest&quot;,&quot;lastActive&quot;:&quot;34 min ago&quot;,&quot;joined&quot;:&quot;Dec 12, 12:56 PM&quot;}" /></div>
                                            </td> */}
                                            <td className="customer align-middle py-4 white-space-nowrap">
                                                {expense.description && expense.description}
                                            </td>
                                            <td className="email align-middle py-4 white-space-nowrap">{expense.price && expense.price.toLocaleString()}</td>

                                            <td className="city align-middle py-4 white-space-nowrap text-900"> <a className="d-flex align-items-center text-900 text-hover-1000" href="#!">
                                                <div className="avatar avatar-m"><img className="rounded-circle" src={expense.recorder && expense.recorder.image} /></div>
                                                <h6 className="mb-0 ms-3 fw-semi-bold">{expense.recorder && expense.recorder.username}</h6>
                                            </a></td>

                                            {userInfo && userInfo.isAdmin &&
                                                <td className="last_active align-middle py-4 text-end white-space-nowrap text-700">{expense.branch}</td>
                                            }
                                            <td className="last_active align-middle py-4 text-end white-space-nowrap text-700">{expense.createdAt && (new Date(expense.createdAt)).toString().substr(0, 11)}</td>
                                            <td className="joined align-middle py-4 white-space-nowrap text-700 text-end">{format(new Date(expense.createdAt), "hh : mm a")}</td>
                                            {userInfo && userInfo.isAdmin &&
                                                <td className="joined align-middle py-4 white-space-nowrap text-700 text-end">
                                                    <button onClick={() => deleteHandler(expense._id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash-alt"></i></button>

                                                </td>
                                            }
                                        </tr>
                                    })}

                                </tbody>
                            </table>

                    }
                </div>


            </div>








{!loading &&  <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />}           
            <Footer></Footer>
        </div >



    </>
}