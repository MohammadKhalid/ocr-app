import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Button,
  ListGroup,
  Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table, Progress, Spinner
} from 'reactstrap';

import upload from './images/upload.png';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: [],
      patterns: [],
      documents: [],
      tableData: [],
      isModal: false,
      modaldata: '',
      modaldate: '',
      modalcurrency: '',
      editItem: '',
      isUpload: false,
      isselected: false,
      selected: '',
      progress: false,
      uploadFile: "",
    };
    // this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.selected = this.selected.bind(this);
    this.modaldata = this.modaldata.bind(this);
    this.modaldate = this.modaldate.bind(this);
    this.modalcurrency = this.modalcurrency.bind(this);
    this.update = this.update.bind(this);
    this.isEdit = this.isEdit.bind(this);
  }
  selected = () => {
    this.setState({
      isselected: !this.state.isselected
    })

  }
  modaldata(ev) {
    this.setState({
      modaldata: ev.target.value
    })
  }

  modaldate(ev) {
    this.setState({
      modaldate: ev.target.value
    })
  }

  modalcurrency(ev) {
    this.setState({
      modalcurrency: ev.target.value
    })
  }
  isEdit = (val) => {
    this.setState({
      modaldata: val.data,
      modaldate: val.date,
      modalcurrency: val.currency,
      editItem: val

    })

    this.toggle()
  }
  onDelete = (item) => {
    axios.delete('http://localhost:5000/api/add/' + item.id,)
      .then(res => {
        console.log("get data", res.data);
        this.getData();
      })
  }
  update() {

    let obj = {
      datas: this.state.modaldata,
      dates: this.state.modaldate,
      currencys: this.state.modalcurrency
    }
    this.setState({
      modalname: '',
      modalprice: '',
      currency: '',
    })
    this.toggle()
    console.log("this.state.editItem.id", this.state.editItem.id);
    console.log("url http://localhost:5000/api/add/" + this.state.editItem.id)
    axios.put('http://localhost:5000/api/add/' + this.state.editItem.id, obj)
      .then(res => {
        this.setState({
          tableData: res.data
        })
      })


  }
  toggle = () => {
    this.setState({
      isModal: !this.state.isModal
    })
  }
  getData = () => {
    axios.get('http://localhost:5000/api/add',)
      .then(res => {
        console.log("get data", res.data);
        this.setState({
          tableData: res.data
        })
      })
  }
  componentDidMount() {
    this.getData();
  }


  stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
  };

  selectedItem = (item) => {
    this.setState({
      selected: item
    })
    this.selected()
  }

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      uploadFile: event.target.files[0].name,

    })

    const data = new FormData();
    if (event.target.files[0] == undefined) {
      alert("plz select Image ");

    }
    if (this.state.isUpload) {
      alert("plz wait image processing ")
      return
    }
    else {
      this.setState({
        isUpload: true,
        progress: true
      })
      data.append('image', event.target.files[0]);
      axios.post('http://localhost:5000/upload', data, {
       })
        .then(res => {

          var datas = res.data.data;
          var dates = res.data.dates;
          var currencys = res.data.currencys;
          var obj = {
            image: res.data.image,
            datas: datas,
            dates: dates,
            currencys: currencys

          }
          axios.post('http://localhost:5000/api/add/', obj)
            .then(ress => {
              console.log("Res", res);
              this.setState({
                isUpload: false,
                progress: false,
                uploadFile: '',
              })

              this.getData();
            })
        })
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <Modal isOpen={this.state.isModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader style={{ background: "#007bff", color: "#f2f2f2" }} toggle={this.toggle}>Edit Item</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Text </Label>
                <Input type="textarea" rows="4" cols="50" name="modaldata" id="name" value={this.state.modaldata} onChange={this.modaldata} />
                <Label for="exampleEmail">Date</Label>
                <Input type="text" name="modaldate" id="price" value={this.state.modaldate} onChange={this.modaldate} />

                <Label for="exampleEmail">Currency</Label>
                <Input type="text" name="modalcurrency" id="currency" value={this.state.modalcurrency} onChange={this.modalcurrency} />

              </FormGroup>

            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.update}>
              Edit
            </Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.isselected} toggle={this.selected} className=".modal-xl">
          <ModalHeader style={{ background: "#007bff", color: "#f2f2f2" }} toggle={this.selected}>View Image and Text</ModalHeader>
          <ModalBody>
            <Form>
              <div className="container column">
                <div className="">
                  <img className="" style={{ width: '100%', borderStyle: 'solid', borderWidth: 1, borderColor: "#d2d2d2" }} src={'http://localhost:5000/showdata/' + this.state.selected.image} />
                </div>
                <div className="">
                  <p>{(this.state.selected.data != null && this.state.selected.data != 'null' && this.state.selected.data != undefined) ? this.state.selected.data.replaceAll('^', "'") : "-"}</p>
                </div>
              </div>
            </Form>
          </ModalBody>
        </Modal>
        <div className="container-fluid mt-2">
          <div className="container1">
            <div className="vertical-center uploadFile alert-primary" >

              <div className="center-icon-n">  <i className="fa fa-cloud-upload" aria-hidden="true"></i></div>
              <p>Drag and drop your file here </p>

              <div className="file-field">

                <div className="btn btn-light btn-sm float-left waves-effect waves-light">
                  <span>{(this.state.uploadFile != '') ? this.state.uploadFile : "SELECT FILE"}</span>

                  <input onChange={this.onChangeHandler} type="file" name="uploaded_image" accept="" />
                </div>


              </div>
              <br />
              <br />

              {this.state.progress &&
                <div className="loader file-field"></div>
              }
            </div>

          </div>

        </div>

        <div className="container-fluid " style={{ marginTop: 350 }}>
          <table className="table table-striped table-hover">
            <thead className="" style={{ background: "#007bff" }}>
              <tr style={{ color: "#f2f2f2" }}>
                <th scope="coll">#</th>
                <th scope="coll">Image</th>
                <th scope="coll">Text</th>
                <th scope="coll">Date</th>
                <th scope="coll">Currency</th>
                <th scope="coll">Edit</th>
                <th scope="coll">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.length > 0 &&
                this.state.tableData.map((item, index) => {
                  return (
                    <tr >
                      <th scope="row">{index + 1}</th>
                      <td onClick={() => this.selectedItem(item)}>< img src={'http://localhost:5000/showdata/' + item.image}
                        className="img-fluid img-thumbnail"
                        // className="img-thumbnail"
                        alt="img" /></td>
                      <td style={{ maxWidth: 450 }} onClick={() => this.selectedItem(item)}>{(item.data != null && item.data != 'null' && item.data != undefined) ? item.data.replaceAll('^', "'") : "-"}</td>
                      <td style={{ minWidth: 200 }} onClick={() => this.selectedItem(item)}>{(item.date != null && item.date != 'null' && item.date != undefined) ? item.date.split(",").map((val, index) => <p>{val}</p>) : "-"}</td>
                      <td onClick={() => this.selectedItem(item)}>{(item.currency != null && item.currency != 'null' && item.currency != undefined) ? item.currency.split(",").map((val, index) => <p>{val}</p>) : "-"}</td>

                      <td style={{ zIndex: 2 }}><button onClick={() => this.isEdit(item)} className="btn btn-sm btn-outline-warning">Edit</button></td>
                      <td style={{ zIndex: 2 }}><button onClick={() => this.onDelete(item)} className="btn btn-sm btn-outline-danger">Delete</button></td>
                    </tr>
                  )
                })}

            </tbody>
          </table>

        </div>




      </div>
    )
  }

}

export default App;
