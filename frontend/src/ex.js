import React, { Component } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import pic from "../../images/profile_pic.jpg";
import Stats from "./Stats";
import History from "./History";
import { Link } from 'react-router-dom';
import { GetProfile, UpdateProfile, userimage } from '../../store/Actions/profileAction';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import profile_pic from '../../images/profile_profile2.jpg'
import stats_pic from '../../images/profile_stats.jpg'
import history_pic from '../../images/profile_history2.jpg'

import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickManager: "profile",
      currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : '',
      userProfile: [],
      isEdit: false,
      email: '',
      phone: '',
      first_name: '',
      last_name: '',
      password: '',
      repassword: '',
      user_id: '',
      isvalid: false,
      errormsg: '',
      file: '',
      name: '',
      imagechangestate: false,
      modal: false
    };

    this.onclick_profile = this.onclick_profile.bind(this);
    this.onclick_stats = this.onclick_stats.bind(this);
    this.onclick_history = this.onclick_history.bind(this);

    this.StateChange = this.StateChange.bind(this);
    this.Edit = this.Edit.bind(this);
    this.fileStateChange = this.fileStateChange.bind(this);
    this.submit = this.submit.bind(this);
    this._picChange = this._picChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onclick_profile() {
    this.setState({
      clickManager: "profile"
    });
  }
  onclick_stats() {
    this.setState({
      clickManager: "stats"
    });
  }
  onclick_history() {
    this.setState({
      clickManager: "history"
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  _picChange(e) {
    const file = e.target.files[0];
    const file1 = e.target.files;
    this.setState({ file: file })
    var filename = file.name
  }

  submit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('user_name', this.props.UserProfile[0].first_name + '_' + this.props.UserProfile[0].last_name)
    data.append('user_email', this.props.UserProfile[0].email)
    data.append('user_id', this.props.UserProfile[0].user_id)
    this.toggle()
    this.props.isuserimage(data);
  }

  fileStateChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }
  Edit() {
    this.setState({ isEdit: true },
      this.setState({
        email: this.props.UserProfile[0].email,
        phone: this.props.UserProfile[0].phone = null ? '' : this.props.UserProfile[0].phone,
        first_name: this.props.UserProfile[0].first_name,
        last_name: this.props.UserProfile[0].last_name,
        password: this.props.UserProfile[0].password,
        user_id: this.props.UserProfile[0].user_id,
      }))
  }
  validation() {
    if (this.state.first_name == "") {
      alert("plz Enter First Name")
      this.setState({ errormsg: "Plz Enter First Name ", isvalid: false })
    }
    if (this.state.last == "") {
      alert("plz Enter Last Name")
      this.setState({ errormsg: "Plz Enter Last Name ", isvalid: false })
    }
    if (this.state.phone == "") {
      alert("plz Enter Phone Number")
      this.setState({ errormsg: "Plz Enter Phone Number ", isvalid: false })
    }
    else if (this.state.first_name != '' && this.state.last_name != '' && this.state.phone != '') {
      this.setState({
        isvalid: true,
        errormsg: ''
      })
    }
  }

  profileUpdate() {
    this.validation();
    if (this.state.isvalid == true) {
      let obj = {
        email: this.state.email,
        phone: this.state.phone,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_id: this.state.user_id
      }
      this.props.isUpdateProfile(obj);
      this.setState({
        isEdit: false
      })
    }
  }

  StateChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }
  componentWillMount() {
    this.props.isGetProfile(this.state.currentUserid)
    let socket = socketIOClient(this.state.endpoint)
    socket.emit("ONLINE_FRIENDS", this.state.currentUserid)
  }

  componentDidMount() {

    let socket = socketIOClient(this.state.endpoint)
    socket.on("SHOW_ONLINE_FRIENDS", data => {
      this.setState({
        show_online_friends: data
      },
        console.log("show_online_friends", this.state.show_online_friends)
      )
    })
  }

  render() {

    let prof = [];
    prof = this.props.UserProfile;
    if (this.state.clickManager == "profile") {
      return (
        <div className="img-full-profile">
          <Navbar />



          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <form enctype="multipart/form-data" onSubmit={this.submit}>
              <ModalBody>
                <div className="form-group">
                  <label className="col-md-3 control-label">Profile Image</label>
                  <div className="col-sm-9">
                    <input ref={(ref) => { this.uploadInput = ref; }} className="form-control" type="file" name="uploaded_image" accept="" />
                  </div>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.submit}>Update</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </form>
          </Modal>


          <div className="row w-100 p-2 m-0" style={{ height: "75vh" }}>
            <div className="col-3">
              <div
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_profile}
              ><img class="card-img" src={profile_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">Profile</h5>
                </div>
              </div>

              <button
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_stats}
              ><img class="card-img" src={stats_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">Statistics</h5>
                </div>
              </button>

              <div
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_history}
              >
                <img class="card-img" src={history_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">History</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <div className="container border" style={{ height: "100%" }}>
                  <p className="display-4 m-0 mt-2">Profile</p>
                  <div className="row">
                    <div className="col-4 mt-3">
                      {(prof.length > 0 && prof[0].profile_image != '' && prof[0].profile_image != null) ?
                        <img
                          className="img-fluid w-70"
                          style={{ borderRadius: "100%", }}

                          onMouseEnter={() => this.setState({ imagechangestate: true })} onMouseLeave={() => this.setState({ imagechangestate: false })}
                          src={`/images/upload_images/${prof[0].email}/${prof[0].profile_image}`}
                          alt="profile pic"
                        />
                        :
                        <img
                          className="img-fluid w-70"
                          style={{ borderRadius: "100%" }}
                          onMouseEnter={() => this.setState({ imagechangestate: true })} onMouseLeave={() => this.setState({ imagechangestate: false })}
                          src={pic} alt="profile pic" />
                      }

                      {this.state.imagechangestate == true &&

                        <div>

                          <button onClick={this.toggle}
                            onMouseEnter={() => this.setState({ imagechangestate: true })} onMouseLeave={() => this.setState({ imagechangestate: false })}
                            style={{
                              bottom: '2px', width: "130px", height: '40px', left: '125px', position: 'absolute', borderBottomLeftRadius: '180px 180px', borderBottomRightRadius: '180px 180px'
                            }} className="btn btn-info editprofile"><i class="fas fa-pen-square my-auto" style={{fontSize: '34px'}}></i></button>
                        </div>
                      }
                    </div>
                    {this.state.isEdit == true &&
                      <div className="col-sm-6 ">
                        <div className="d-block mt-4">

                          <div className="form-group">
                            <label >Email address</label>
                            <input className="form-control" value={this.state.email} type="email" disabled />
                          </div>
                          <div className="form-group">
                            <label >First Name</label>
                            <input type="text" name="first_name" value={this.state.first_name} onChange={this.StateChange} className="form-control" placeholder="First Name" />
                          </div>
                          <div className="form-group">
                            <label >Last Name</label>
                            <input type="text" name="last_name" value={this.state.last_name} onChange={this.StateChange} className="form-control" placeholder="Last Name" />
                          </div>
                          <div className="form-group">
                            <label >Phone No</label>
                            <input type="text" name="phone" value={this.state.phone} onChange={this.StateChange} className="form-control" placeholder="Phone Number" />
                          </div>

                          <button onClick={this.profileUpdate.bind(this)} className="btn btn-primary">Update Profile</button>
                        </div>
                      </div>
                    }
                    {(prof.length > 0 && this.state.isEdit == false) ?
                      <div className="col-8 mt-3 pt-3 pl-3">
                        <div>
                          <div className="row">
                            <div className="col-2">
                              <p className="font-weight-bold font_size_24 ">
                                Name :
                       </p>
                            </div>
                            <div className="col-6">
                              <p className=" font_size_24 ">
                                {prof[0].first_name + ' ' + prof[0].last_name}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-2">
                              <p className="font-weight-bold font_size_24 ">
                                Email :
                       </p>
                            </div>
                            <div className="col-6">
                              <p className=" font_size_24 ">
                                {prof[0].email}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-2">
                              <p className="font-weight-bold font_size_24 ">
                                Phone  :
                       </p>
                            </div>
                            <div className="col-6">
                              <p className=" font_size_24 ">
                                {prof[0].phone}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-2">
                              <p className="font-weight-bold font_size_24 ">
                                Level :
                       </p>
                            </div>
                            <div className="col-6">
                              <p className=" font_size_24 ">
                                {prof[0].level}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-2">
                              <p className="font-weight-bold font_size_24 ">
                                Score :
                       </p>
                            </div>
                            <div className="col-6">
                              <p className=" font_size_24 ">
                                {prof[0].score}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button onClick={this.Edit} className="btn btn-outline-warning">Edit</button>
                      </div>

                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickManager == "stats") {
      return (
        <div className="img-full-profile">
          <Navbar />
          <div className="row w-100 p-2 m-0 " style={{ height: "75vh" }}>
            <div className="col-3 ">
            <div
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_profile}
              ><img class="card-img" src={profile_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">Profile</h5>
                </div>
              </div>

              <button
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_stats}
              ><img class="card-img" src={stats_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left text-left">
                  <h5 class="card-title">Statistics</h5>
                </div>
              </button>

              <div
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_history}
              >
                <img class="card-img" src={history_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">History</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <Stats />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickManager == "history") {
      return (
        <div className="img-full-profile">
          <Navbar />
          <div className="row w-100 p-2 m-0" style={{ height: "75vh" }}>
            <div className="col-3">
            <div
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_profile}
              ><img class="card-img" src={profile_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">Profile</h5>
                </div>
              </div>

              <button
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_stats}
              ><img class="card-img" src={stats_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">Statistics</h5>
                </div>
              </button>

              <div
                class="card my-3 hover_pointer border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_history}
              >
                <img class="card-img" src={history_pic} alt="Card image" />
              <div class="card-body card-img-overlay text-left">
                  <h5 class="card-title">History</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <History />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {

  return {
    UserProfile: state.profileReducerRoot.profile,
    currentUser: state.root.currentUser,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isGetProfile: (id) => {
      dispatch(GetProfile(id))
    },
    isUpdateProfile: (obj) => {
      dispatch(UpdateProfile(obj))
    },
    isuserimage: (data) => {
      dispatch(userimage(data))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);