import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";

const axios = require("axios");

class WeightProcess extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      id: "",
      name: "",
      qty: 0,
      price: "",
      select: false,
      update: false,
    };
  }

  componentDidUpdate() {
    this.setState({
      stores: this.props.stores,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: this.state.name,
      qty: this.state.qty,
      price: this.state.price,
    };
    try {
      const responce = await axios({
        method: "post",
        url: "http://localhost:5000/store",
        data: data,
      });
      console.log(responce);

      this.setState({
        id: "",
        name: "",
        qty: 0,
        price: "",
      });
    } catch (ex) {
      console.log(ex);
    }
    console.log("Save");
  };

  handleEdit = (id, name, qty, price) => {
    this.setState({
      id: id,
      name: name,
      qty: qty,
      price: price,
    });
    console.log("edit");
  };

  handleUpdateProduct = async () => {

    const updateData = {
      name: this.state.name,
      qty: this.state.qty,
      price: this.state.price,
    };

    axios
      .patch("http://localhost:5000/store/" + this.state.id, updateData)
      .then((res) => console.log(res.data));
    this.setState({
      id: "",
      name: "",
      qty: 0,
      price: "",
      select: false,
      update: false,
    });
  };

  handleDelete = async (id) => {
    await axios
      .delete("http://localhost:5000/store/" + id)
      .then((res) => this.setState({ select: false }));
  };

  render() {
    return (
      <div class="row">
        <div class="col-md-4">
          {this.state.update ? (
            <form onSubmit={this.handleUpdateProduct}>
              <h1>Update Store</h1>
              <br />
              <div class="mb-3">
                <label for="lblName" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="lblQty" class="form-label">
                  Qty
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="qty"
                  name="qty"
                  min="0"
                  max="1000"
                  value={this.state.qty}
                  onChange={this.handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="lblDescription" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  name="price"
                  maxlength="15"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" class="btn btn-warning">
                &nbsp;&nbsp; Update &nbsp;&nbsp;
              </button>
              &nbsp;&nbsp;
              <button class="btn btn-danger">Cancel</button>
            </form>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <h1>Add Store</h1>
              <br />
              <div class="mb-3">
                <label for="lblName" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="lblQty" class="form-label">
                  Qty
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="qty"
                  name="qty"
                  min="0"
                  max="1000"
                  value={this.state.qty}
                  onChange={this.handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="lblDescription" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  name="price"
                  maxlength="15"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                &nbsp;&nbsp; Save &nbsp;&nbsp;
              </button>
              &nbsp;&nbsp;
              <button class="btn btn-danger">Cancel</button>
            </form>
          )}
        </div>
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stores.map((stores) => (
                <tr>
                  <td>{stores.name}</td>
                  <td>{stores.qty}</td>
                  <td>{stores.price}</td>
                
                  <td>
                    <button
                      type="button"
                      class="btn btn-success btn-sm"
                      onClick={() => {
                        this.setState({ select: true, update: true });
                        this.handleEdit(
                          stores._id,
                          stores.name,
                          stores.qty,
                          stores.price,
                        );
                      }}
                    >
                      <i class="fa fa-edit fa-lg"></i>
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      onClick={() => {
                        this.setState({ select: true });
                        this.handleDelete(stores._id);
                      }}
                    >
                      <i class="fa fa-trash fa-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WeightProcess;
