import { ChangeEvent, useEffect, useState } from "react"
import { deleteRecordApi, getRecordsApi } from "../../api/recordApi";
import Footer from "../../components/admin/Footer"
import AddRecordModal from "../../components/admin/AddRecordModal";
import { IRecordInterface } from "../../interfaces/IRecordInterface"
import { toast } from "react-toastify";
import {  format } from "date-fns";
import { getUsersApi } from "../../api/userApi";
import { IUserInterface } from "../../interfaces/IUserInterface";
import { DateRange } from "react-date-range";
import { branches } from "../../data";
import Pagination from "../../components/Pagination";


export default function RecordsPage() {
    //PAGINATION STARTS
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(1);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [nPages, setNPages] = useState<number>(0);
    //PAGINATION ENDS

    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

    const [records, setRecords] = useState<IRecordInterface[]>([]);
    const [totalRecords, setTotalRecords] = useState<IRecordInterface[]>([]);
    const [error, setError] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [errorUsers, setErrorUsers] = useState<any>()
    const [renderer, setRenderer] = useState<string>("");
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [branch, setBranch] = useState<string>(userInfo.branch || "");
    const [date, setDate] = useState<any>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);





    async function getRecords() {
        setLoading(true)
        try {
            const { data } = await getRecordsApi(
                { renderer, startDate: date[0].startDate.toISOString(), endDate: date[0].endDate.toISOString(), branch }
            );
            // Records to be displayed on the current page
            setTotalRecords(data);
            setRecords(data.slice(indexOfFirstRecord, indexOfLastRecord));
            setNPages(Math.ceil(data.length / recordsPerPage));
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
        if (!window.confirm("Are you sure you want to delete this record?")) return;


        try {
            await deleteRecordApi(id);
            getRecords();
            toast.success("Record Successfully Deleted")
        } catch (error: any) {
            error.response && error.response ? setError(error.response.data.error) : setError("An Internal Server Error Occured")

        }
    }








    useEffect(() => {
       getRecords();
    }, [renderer, date, branch, currentPage]);

    useEffect(() => {
       getUsers();
    }, [branch])




    return <>
        <div className="content">
            <div className="mb-9">
                <div className="row g-2 mb-4">
                    <div className="">
                        <h2 className="mb-0">Records</h2>
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
                            </div>
                            <div className="col ">
                                <div className="search-box">
                                    <div>
                                        <label style={{ fontWeight: 600, fontSize: "1rem" }} htmlFor="">Filter By Date</label>

                                        {/* <FontAwesomeIcon onClick={() => { setOpenDatePicker(!openDatePicker); setOpenOptions(false) }} icon={faCalendarDays} className="headerIcon" /> */}
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
                            <AddRecordModal
                                getRecords={getRecords}
                            ></AddRecordModal>
                        </div>

                            }
                           

                        </div>




                    </div>
                </div>
                <h5 className="mb-4 mt-4">Time Frame : {format(date[0].startDate, "dd/MM/yyyy")} -  {format(date[0].endDate, "dd/MM/yyyy")}</h5>
                <h5 className="mb-4">Total Amount Generated : {loading ? "calculating ...." : totalRecords.length === 0 ? <span>₦0</span> : <span>₦{(totalRecords.reduce((a, c) => a + c.price!, 0)).toLocaleString()}</span>}   </h5>
                <div className="table-responsive scrollbar ms-n1 ps-1">
                    {
                        loading ? <h4 className="m-3">Loading Records ....</h4> : error ? <div className="alert alert-danger p-2 mb-3 text-light">{error}</div> : records.length === 0 ? <div className="alert alert-primary p-2 mb-3">No Records Added Yet</div> :

                            <table className="table table-sm fs--1 mb-0">

                                <thead>
                                    <tr>
                                        {/* <th className="white-space-nowrap fs--1 align-middle py-4  ps-0">
                                            <div className="form-check mb-0 fs-0"><input className="form-check-input" id="checkbox-bulk-members-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;members-table-body&quot;}" /></div>
                                        </th> */}
                                        <th className="sort align-middle py-4 " scope="col" data-sort="customer" style={{ width: '15%', minWidth: 200 }}>SERVICE</th>
                                        <th className="sort align-middle py-4 " scope="col" data-sort="email" style={{ width: '15%', minWidth: 200 }}>PRICE(₦)</th>
                                        <th className="sort align-middle py-4  pe-3" scope="col" data-sort="mobile_number" style={{ width: '20%', minWidth: 200 }}>RENDERER</th>
                                        <th className="sort align-middle py-4 " scope="col" data-sort="city" style={{ width: '10%' }}>RECORDER</th>
                                        {userInfo && userInfo.isAdmin &&
                                            <th className="sort align-middle py-4  text-end" scope="col" data-sort="last_active" style={{ width: '21%', minWidth: 200 }}>BRANCH</th>
                                        }
                                        <th className="sort align-middle py-4  text-end" scope="col" data-sort="last_active" style={{ width: '21%', minWidth: 200 }}>DATE</th>
                                        <th className="sort align-middle py-4  text-end pe-0" scope="col" data-sort="joined" style={{ width: '19%', minWidth: 200 }}>TIME</th>
                                        {userInfo && userInfo.isAdmin &&
                                            <th className="sort align-middle py-4  text-end pe-0" scope="col" data-sort="joined" style={{ width: '19%', minWidth: 200 }}>ACTIONS</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody className="list" id="members-table-body">
                                    {records.map(record => {
                                        return <tr key={record._id} className="hover-actions-trigger btn-reveal-trigger position-static">
                                            <td className="customer align-middle py-4  white-space-nowrap">
                                                {record.service && record.service.title}
                                            </td>
                                            <td className="email align-middle py-4  white-space-nowrap">{record.price && record.price.toLocaleString()}</td>
                                            <td className="mobile_number align-middle py-4  white-space-nowrap"> <a className="d-flex align-items-center text-900 text-hover-1000" href="#!">
                                                <div className="avatar avatar-m"><img className="rounded-circle" src={record.renderer && record.renderer.image} /></div>
                                                <h6 className="mb-0 ms-3 fw-semi-bold">{record.renderer && record.renderer.username}</h6>
                                            </a></td>
                                            <td className="city align-middle py-4  white-space-nowrap text-900"> <a className="d-flex align-items-center text-900 text-hover-1000" href="#!">
                                                <div className="avatar avatar-m"><img className="rounded-circle" src={record.recorder && record.recorder.image} /></div>
                                                <h6 className="mb-0 ms-3 fw-semi-bold">{record.recorder && record.recorder.username}</h6>
                                            </a></td>

                                            {userInfo && userInfo.isAdmin &&
                                                <td className="last_active align-middle py-4  text-end white-space-nowrap text-700">{record.branch}</td>
                                            }
                                            <td className="last_active align-middle py-4  text-end white-space-nowrap text-700">{record.createdAt && (new Date(record.createdAt)).toString().substr(0, 11)}</td>
                                            <td className="joined align-middle py-4  white-space-nowrap text-700 text-end">{format(new Date(record.createdAt), "hh : mm a")}</td>
                                            {userInfo && userInfo.isAdmin &&
                                                <td className="joined align-middle py-4  white-space-nowrap text-700 text-end">
                                                    <button onClick={() => deleteHandler(record._id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash-alt"></i></button>

                                                </td>
                                            }
                                        </tr>
                                    })}

                                </tbody>
                            </table>

                    }
                </div>


            </div>




{!loading &&   <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />}
           

            <Footer></Footer>
        </div >



    </>
}