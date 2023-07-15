import { Link } from "react-router-dom";

export default function Header() {
    return <>

        <nav className="navbar navbar-top fixed-top navbar-expand-lg" id="navbarTop">
            <div className="navbar-logo">
                <button className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTopCollapse" aria-controls="navbarTopCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line" /></span></button>
                <a className="navbar-brand me-1 me-sm-3" href="index-2.html">
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center"><img src="assets/img/icons/logo.png" alt="phoenix" width={27} />
                            <p className="logo-text ms-2 d-none d-sm-block">phoenix</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="collapse navbar-collapse navbar-top-collapse order-1 order-lg-0 justify-content-center" id="navbarTopCollapse">
                <ul className="navbar-nav navbar-nav-top" data-dropdown-on-hover="data-dropdown-on-hover">
                    {/* <li className="nav-item dropdown"><Link className="nav-link lh-5 me-5 " to="/" ><span className="uil  me-2 fs-3 uil-chart-pie" />Dashboard</Link>
      </li>
      <li className="nav-item dropdown"><Link className="nav-link lh-5 me-5 " to="/services" ><span className="uil  me-2 fs-3 uil-cube" />Services</Link>
      </li>
      <li className="nav-item dropdown"><Link className="nav-link lh-5 me-5 " to="/users" ><span className="uil  me-2 fs-3 uil-user"  />Users</Link>
      </li>
      <li className="nav-item dropdown"><Link className="nav-link lh-5 me-5 " to="/records" ><span className="uil  me-2 fs-3 uil-document-layout-right" />Records</Link>
      </li>
      <li className="nav-item dropdown"><Link className="nav-link lh-5 me-5 " to="/messages" ><span className="uil  me-2 fs-3 uil-files-landscapes-alt " />Messages</Link>
      </li> */}
                </ul>
            </div>
            <ul className="navbar-nav navbar-nav-icons flex-row">
                <li className="nav-item"  >
                    <div className="theme-control-toggle fa-icon-wait  pe-3 py-1 d-flex ">
                        <input className="form-check-input ms-0 theme-control-toggle-input" type="checkbox" data-theme-control="phoenixTheme" defaultValue="dark" id="themeControlToggle" />
                        <label className="mb-0 theme-control-toggle-label theme-control-toggle-light " htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme">
                            <span className="icon fa fa-moon" data-feather="moon" />
                        </label>
                        <label className="mb-0 theme-control-toggle-label theme-control-toggle-dark" htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme">
                            <span className="icon fa fa-sun" data-feather="sun" />
                        </label>
                    </div>
                </li>
                <li className="nav-item"><a className="nav-link btn btn-outline-primary me-2" href="#" >Register</a></li>
                
                <li className="nav-item"><Link className="nav-link btn btn-primary btn-sm" to="/login" >Login</Link></li>
                {/* <li className="nav-item dropdown">
      <a className="nav-link" href="#" style={{minWidth: '2.5rem'}} role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-auto-close="outside"><span data-feather="bell" style={{height: 20, width: 20}} /></a>
    </li> */}
                <li className="nav-item dropdown"><a className="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar avatar-l ">
                        <img className="rounded-circle " src="assets/img/team/40x40/57.webp" />
                    </div>
                </a>
                    <div className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300" aria-labelledby="navbarDropdownUser">
                        <div className="card position-relative border-0">
                            <div className="card-body p-0">
                                <div className="text-center pt-4 pb-3">
                                    <div className="avatar avatar-xl ">
                                        <img className="rounded-circle " src="assets/img/team/72x72/57.webp" />
                                    </div>
                                    <h6 className="mt-2 text-black">Jerry Seinfield</h6>
                                </div>
                            </div>
                            <div className="overflow-auto scrollbar" style={{ height: '6rem' }}>
                                <ul className="nav d-flex flex-column mb-2 pb-1">
                                    <li className="nav-item"><a className="nav-link px-3" href="#!"> <span className="me-2 text-900" data-feather="user" /><span>Profile</span></a></li>
                                    <li className="nav-item"><a className="nav-link px-3" href="#!"><span className="me-2 text-900" data-feather="pie-chart" />Dashboard</a></li>
                                    <li className="nav-item"><a className="nav-link px-3" href="#!"> <span className="me-2 text-900" data-feather="settings" />Settings &amp; Privacy </a></li>
                                </ul>
                            </div>
                            <hr />
                            <div className="px-3"> <a className="btn btn-phoenix-secondary d-flex flex-center w-100 mb-3" href="#!"> <span className="me-2" data-feather="log-out"> </span>Sign out</a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    </>
}