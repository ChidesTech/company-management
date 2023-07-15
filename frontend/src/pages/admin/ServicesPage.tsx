import {useEffect, useState } from "react"
import { deleteServiceApi, getServicesApi} from "../../api/serviceApi";
import Footer from "../../components/admin/Footer"
import AddServiceModal from "../../components/admin/AddServiceModal";
import { IServiceInterface } from "../../interfaces/IServiceInterface"
import UpdateServiceModal from "../../components/admin/UpdateServiceModal";
import {toast} from "react-toastify";


export default function ServicesPage() {
  const [services, setServices] = useState<IServiceInterface[]>([]);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [serviceToEdit, setServiceToEdit] = useState<IServiceInterface>();





  async function getServices() {
    try {
      const { data } = await getServicesApi();
      setServices(data);
    } catch (error: any) {
      error.response.data && error.response.data? setError(error.response.data.error) : setError("An Internal Server Error Occured");
      setLoading(false)
    }

    setLoading(false)

  }



  async function deleteHandler(id: any) {
    if(!window.confirm("Are you sure you want to delete this service?")) return;


    try {
      await deleteServiceApi(id);
      getServices();
      toast.success("Service Successfully Deleted")
    } catch (error: any) {
     error.response &&  error.response  ? setError(error.response.data.error) : setError("An Internal Server Error Occured")

    }
  }






  useEffect(() => {
    getServices();
  }, []);


  return <>
    <div className="content">
      <div className="mb-9">
        <div className="row g-2 mb-4">
          <div className=" d-flex justify-content-between">
            <h2 className="mb-0">Services</h2>
 
   
            {serviceToEdit && <UpdateServiceModal
              getServices={getServices}
              title={serviceToEdit.title}
              serviceToEdit={serviceToEdit}
              closeModal={() => setServiceToEdit(undefined)}

            ></UpdateServiceModal>

            }

            <AddServiceModal
              getServices={getServices}
            ></AddServiceModal>


          </div>
        </div>
        <div className="row g-4">
          {loading ? <h4 className="m-3">Loading Services ....</h4> : error ? <div className="alert alert-danger p-2 mb-3 text-light">{error}</div> : services.length === 0 ? <div className="alert alert-primary p-2 mb-3">No Services Added Yet</div> :
            services.map(service => {
              return <div key={service._id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card border " style={{ boxShadow: "1px 1px 1px 1px lightgray" }}>
                  <div className="card-body">
                    <h4 className="card-title text-center">{service.title} </h4>
                    <h4 className="card-title text-center">Min. Price : <span style={{ textDecoration: "line-through" }}> N</span>{service.price && service.price.toLocaleString()} </h4>
                    <p className="card-text text-center">{service.description}</p>
                    <div className="d-flex justify-content-between">
                      <button onClick={() => setServiceToEdit(service)} className="btn btn-sm btn-info"><i className="fa fa-edit"></i></button>
                      <button onClick={() => deleteHandler(service._id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash-alt"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            })}
        </div>
      </div>









      <Footer></Footer>
    </div >



  </>
}