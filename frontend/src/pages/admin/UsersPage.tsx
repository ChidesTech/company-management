import { ChangeEvent, useEffect, useState } from "react"
import { deleteUserApi, getUsersApi } from "../../api/userApi";
import Footer from "../../components/admin/Footer"
import AddUserModal from "../../components/admin/AddUserModal";
import { IUserInterface } from "../../../../interfaces/IUserInterface"
import { toast } from "react-toastify";
import UpdateUserModal from "../../components/admin/UpdateUserModal";
import { branches } from "../../data";


export default function UsersPage() {
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [error, setError] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true)
    const [userToEdit, setUserToEdit] = useState<IUserInterface | undefined>()
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!)
    const [branch, setBranch] = useState<string>(userInfo.branch || "")




    async function getUsers() {
        try {
            const { data } = await getUsersApi({ branch });
            setUsers(data);
        } catch (error: any) {
            error.response && error.response.data ? setError(error.response.data.error) : setError("An Internal Server Error Occured")

        }

        setLoading(false)

    }


    async function deleteHandler(id: any) {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUserApi(id);
            toast.success("User deleted successfully");
            getUsers();


        } catch (error: any) {
            error.response && error.response.data ? setError(error.response.data.error) : setError("An Internal Server Error Occured")
        }
    }

    function closeModal() {
        setUserToEdit(undefined)
    }


    useEffect(() => {
        getUsers()
    }, [branch]);


    return <>

        <div className="content">
            <div className="mb-9">
                <div className="row g-2 mb-4">
                    <div className="">
                        <h2 className="mb-0">Users</h2>
                        <div className="d-flex justify-content-between flex-wrap mt-3 align-items-center">

                            <div className="col col-auto mt-2">
                                <div className="search-box">
                                    <div>
                                        <label style={{ fontWeight: 600, fontSize: "1rem" }} htmlFor="">Filter By Branch</label>
                                        <select value={branch} onChange={(e: ChangeEvent<HTMLSelectElement>) => setBranch(e.target.value)} className="form-control mt-1" id="floatingInputGrid" placeholder="--- Select Branch ---" >
                                            <option value="">All</option>
                                            {branches.map((branch) => {
                                                return <option key={branch.name} value={branch.name}>{branch.name}</option>

                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {userToEdit && <UpdateUserModal getUsers={getUsers} userToEdit={userToEdit} closeModal={closeModal} />}

                            <AddUserModal getUsers={getUsers} />

                        </div>
                    </div>
                </div>


                {loading ? <h4 className="m-3">Loading Users ....</h4> : error ? <div className="alert alert-danger p-2 mb-3 text-light">{error}</div> : users.length === 0 ? <div className="alert alert-info p-2 mb-3">No Users Added Yet</div> :
                    <div className="card-group">
                        {users.map(user => {
                            return <div className="card my-2 mx-auto" style={{ maxWidth: "21rem", minWidth: "21rem" }}>
                                <img className="card-img-top" src={user.image} style={{ height: "18rem" }} alt="..." />
                                <div className="card-body">
                                    <h4 className="card-title">{user.name}</h4>
                                    <p className="card-text"><i className="fa fa-phone"></i> {user.phone}</p>
                                    <p className="card-text"><i className="fa fa-map-marker-alt"></i> {user.address}</p>
                                    <p className="card-text"><i className="fa fa-users"></i> Guarantor: Lacazette Warri</p>
                                    <p className="card-text"><i className="fa fa-phone"></i> Guarantor Phone : 0916366366</p>
                                    <p className="card-text"><i className="fa fa-cog"></i> Role : {user.role}</p>
                                    <p className="card-text"><i className="fa fa-cog"></i> Branch : {user.branch}</p>
                                    <p className="card-text"><i className="fa fa-envelope"></i> Email : {user.email || "Nil"}</p>
                                    <p className="card-text"><i className="fa fa-user"></i> Username : {user.username || "Nil"}</p>

                                    <div className="d-flex justify-content-between">
                                        <button onClick={() => setUserToEdit(user)} className="btn btn-sm btn-info"><i className="fa fa-edit"></i></button>
                                        <button onClick={() => deleteHandler(user._id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash-alt"></i></button>
                                    </div>


                                </div>
                            </div>

                        })
                        }
                    </div>}







            </div>
            <Footer></Footer>
        </div >



    </>
}