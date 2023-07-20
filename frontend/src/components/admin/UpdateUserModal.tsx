import { ChangeEvent, Dispatch, FormEventHandler, MouseEventHandler, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { IUserInterface } from "../../interfaces/IUserInterface";
import { updateUsersApi } from "../../api/userApi";
import { branches } from "../../data";
import axios from "axios";
import Compressor from "compressorjs";
import Swal from "sweetalert2";

interface PropsInterface {
    getUsers: () => Promise<void>,
    userToEdit?: IUserInterface,
    closeModal: MouseEventHandler<HTMLButtonElement>



}
export default function UpdateUserModal(props: PropsInterface) {
    const [uploadingPhoto, setUploadingPhoto] = useState<boolean>(false);
    const [uploadedPhoto, setUploadedPhoto] = useState<boolean>(false);
    const [formError, setFormError] = useState<any>("");

    const [name, setName] = useState<string | undefined>(props.userToEdit?.name);
    const [image, setImage] = useState<string | undefined>(props.userToEdit?.image);
    const [phone, setPhone] = useState<string | undefined>(props.userToEdit?.phone);
    const [address, setAddress] = useState<string | undefined>(props.userToEdit?.address);
    const [role, setRole] = useState<string | undefined>(props.userToEdit?.role);
    const [branch, setBranch] = useState<string | undefined>(props.userToEdit?.branch);
    const [guarantorName, setGuarantorName] = useState<string | undefined>(props.userToEdit?.guarantorName);
    const [guarantorPhone, setGuarantorPhone] = useState<string | undefined>(props.userToEdit?.email);
    const [email, setEmail] = useState<string | undefined>(props.userToEdit?.email);
    const [username, setUsername] = useState<string | undefined>(props.userToEdit?.username);
    const [password, setPassword] = useState<string | undefined>();
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

    function fileInputChangeHandler(e: any) {

        const file = e.target.files[0];
        new Compressor(file, {
            quality: 0.6, //  Its not recommended to go below 0.6.
            success: (compressedResult: any) => {
                uploadPhoto(compressedResult);
            },
        });
    }

    async function uploadPhoto(file: any) {

        setUploadingPhoto(true)
        setUploadedPhoto(false)
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chidespencils");
        data.append("cloud_name", "chidestech");
        axios.post("https://api.cloudinary.com/v1_1/chidestech/image/upload", data)
            .then(response => {
                setImage(response.data.url);
                setUploadingPhoto(false);
                setUploadedPhoto(true)
            })
            .catch(error => {
                Swal.fire("Error", "Failed To Process Image", "error");
                setUploadingPhoto(false);
            })
    }



    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to update this user?")) return;

        if (!name || !phone) {
            setFormError("All Fields Are Necessary")
            return;
        }

        if (password && password !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        try {
            const { data } = await updateUsersApi(props.userToEdit?._id, { name, phone, address, image, role,branch, guarantorName, guarantorPhone, email, username, password });
            props.getUsers();
            toast.success("User Updated Successfully")
        } catch (error: any) {
            error.response && error.response.data ? setFormError(error.response.data.error) : setFormError("An Internal Server Error Occured")
        }

    }



    return <>
        <div>
            {/* <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#updateUser"><i className="fa fa-plus"></i> Add User</button> */}
            <div className="modal" id="verticallyCentered" style={{ display: 'block' }} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="verticallyCenteredModalLabel">Add User</h5><button onClick={props.closeModal} className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><svg className="svg-inline--fa fa-xmark fs--1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>{/* <span class="fas fa-times fs--1"></span> Font Awesome fontawesome.com */}</button>
                        </div>
                        <div className="modal-body">
                            {formError && <div className="alert alert-danger p-2 mb-3 text-light">{formError}</div>}
                            <div className="row">
                                <div className="col-xl-12">
                                    <form onSubmit={submitHandler} className="row g-3 mb-6">
                                    <div className="mt-4 text-center">
                                            {uploadingPhoto && <h2 style={{ fontSize: "1rem" }} className="">
                                                Processing Image <span style={{ letterSpacing: "7px" }}>...</span>  </h2>}
                                            {uploadedPhoto && <h2 style={{ fontSize: "1rem" }} className="text-success p-1">
                                                Done.</h2>}
                                        </div>
                                        <label className="form-label">Cover Image</label>
                                        <label style={{ textAlign: "center" }} className="input-group file-upload" >
                                            <input style={{ display: "none" }} name="cover-photo" onChange={fileInputChangeHandler} type="file" className="form-control pt-5 ps-3" id="customFile" />
                                            <label style={{ height: "8rem", textAlign: "center", borderStyle: "dashed", borderRadius: "6px", borderColor: "grey", width: "100%" }} className="input-group-text" htmlFor="customFile">Drag And Drop Image Here Or Click To Browse</label>
                                        </label>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Name" /><label htmlFor="floatingInputGrid">Name</label>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Username" /><label htmlFor="floatingInputGrid">Username </label>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={phone} onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Phone Number" /><label htmlFor="floatingInputGrid">Phone Number</label>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={address} onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Address" /><label htmlFor="floatingInputGrid">Address</label>
                                            </div>
                                        </div>
                                        <div className=" col-md-12 mb-3">
                                            <div>
                                                <select value={role} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)} className="form-control" id="floatingInputGrid" placeholder="--- Select Service ---" >
                                                    <option value="">--- Select Role ---</option>
                                                    <option value="barber">Barber</option>
                                                    <option value="secretary">Secretary</option>
                                                    <option value="admin">Admin</option>
                                                        

                                                </select>
                                            </div>
                                        </div>
                                        <div className=" col-md-12 mb-2">
                                            <div>
                                                <select value={branch} onChange={(e: ChangeEvent<HTMLSelectElement>) => setBranch(e.target.value)} className="form-control" id="floatingInputGrid" placeholder="--- Select Branch ---" >
                                                    <option value="">--- Select Branch ---</option>
                                                   {branches.map((branch) => {
                                                    return  <option key={branch.name} value={branch.name}>{branch.name}</option>
                                                    
                                                   })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={guarantorName} onChange={(e: ChangeEvent<HTMLInputElement>) => setGuarantorName(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Guarantor" /><label htmlFor="floatingInputGrid">Guarantor </label>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={guarantorPhone} onChange={(e: ChangeEvent<HTMLInputElement>) => setGuarantorPhone(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Guarantor Phone Number" /><label htmlFor="floatingInputGrid">Guarantor Phone Number</label>
                                            </div>
                                            <hr />

                                            <span>For Administrators</span>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Email" /><label htmlFor="floatingInputGrid">Email </label>
                                            </div>
                                        </div>

                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="User Password" /><label htmlFor="floatingInputGrid">Password </label>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="form-floating">
                                                <input value={confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} className="form-control" id="floatingInputGrid" type="text" placeholder="Confirm Password" /><label htmlFor="floatingInputGrid">Confirm Password </label>
                                            </div>
                                        </div>





                                        <div className="col-12 gy-6">
                                            <div className="row g-3 justify-content-end">

                                                <div><button type="submit" className="btn btn-primary px-5 px-sm-15 w-100" >Update User</button></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer"><button onClick={props.closeModal} className="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Exit</button></div>
                    </div>

                </div>
            </div>
        </div>

    </>
}