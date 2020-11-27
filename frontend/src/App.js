import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Button,
  ListGroup,
  Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';

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
      editItem: ''
    };
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.modaldata = this.modaldata.bind(this);
    this.modaldate = this.modaldate.bind(this);
    this.modalcurrency = this.modalcurrency.bind(this);
    this.update = this.update.bind(this);
    this.isEdit = this.isEdit.bind(this);
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
    console.log("val", val);
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
  submit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('image', this.uploadInput.files[0]);
    axios.post('http://localhost:5000/upload', data)
      .then(res => {
        console.log("result userimage", res.data);
        const data = new FormData();
        data.append('image', this.uploadInput.files[0]);

        var datas = res.data.data;
        var dates = res.data.dates;
        var currencys = res.data.currencys;
        var obj = {
          image: data,
          datas: datas,
          dates: dates,
          currencys: currencys

        }
        console.log("obj", obj);
        console.log("data", data.get('image'));
        axios.post('http://localhost:5000/api/add/', obj)
          .then(ress => {
            console.log("Res", res);
          })
        this.getData();
      })
  }

  stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
  };

  render() {
    return (
      <div className="container-fluid">
        <Modal isOpen={this.state.isModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add /Edit Item List</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Text </Label>
                <Input type="text" name="modaldata" id="name" value={this.state.modaldata} onChange={this.modaldata} />
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
        <div className="container-fluid mt-2">
          <div className="container1">
            <div className="vertical-center">
              <form class="md-form">
                <div class="file-field">
                  <div class="btn btn-outline-primary btn-sm float-left">

                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="uploaded_image" accept="" />

                  </div>

                </div>

              </form>
              <button class="btn btn-outline-success mt-2 float-right" onClick={this.submit}>Upload</button>
            </div>
          </div>

        </div>

        <div className="container-fluid " style={{ marginTop: 100 }}>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Text</th>
                <th scope="col">Date</th>
                <th scope="col">Currency</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>Image</td>
                    <td>{(item.data != null && item.data != 'null'  && item.data != undefined  ) ? item.data : "-"}</td>
                    <td>{(item.date != null  && item.date != 'null' && item.date != undefined) ? item.date : "-"}</td>
                    <td>{(item.currency != null && item.currency != 'null' && item.currency != undefined) ? item.currency : "-"}</td>

                    <td><button onClick={() => this.isEdit(item)} className="btn btn-sm btn-outline-warning">Edit</button></td>
                    <td><button onClick={() => this.onDelete(item)} className="btn btn-sm btn-outline-danger">Delete</button></td>
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
