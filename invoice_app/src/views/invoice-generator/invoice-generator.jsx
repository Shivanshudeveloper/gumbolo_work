import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pdfExport from "../../common/pdfExport";

import {
  faDownload,
  faFilePdf,
  faPrint,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class InvoiceGenerator extends Component {
  state = {
    invoice: {
      imgSrc: "",
      uuid: this.uuid(),
      title: "INVOICE",
      invoiceNo: this.randomNumber(1, 999999),
      invoiceDate: "",
      dueDate: "",
      invoiceFrom: "",
      invoiceTo: "",
      items: [],
      discounts: 0,
      shipping: 0,
      terms: "",
    },
    item: {
      title: "",
      quantity: 1,
      rate: 1,
      gst: 0,
      amount: 0,
    },
    invoices: localStorage.getItem("invoices")
      ? JSON.parse(localStorage.getItem("invoices"))
      : [],
    docDefinition: localStorage.getItem("docDefinition")
      ? JSON.parse(localStorage.getItem("docDefinition"))
      : {
          backgroundColor: "#0069D9",
          watermark: {
            text: "",
            opacity: 0.3,
            bold: false,
            italics: false,
          },
          pageSize: "A4",
          pageOrientation: "portrait",
        },
    defaultSettings: localStorage.getItem("defaultSettings")
      ? JSON.parse(localStorage.getItem("defaultSettings"))
      : {
          imgSrc: "",
          invoiceFrom: "",
          terms: "",
          defaultTemplate: "temp1",
        },

    pageSize: [
      "4A0",
      "2A0",
      "A0",
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
    ],
    pageOrientation: ["portrait", "landscape"],
  };

  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHrefClick = this.handleHrefClick.bind(this);
    this.handleRemoveInvoice = this.handleRemoveInvoice.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.openInvoice = this.openInvoice.bind(this);
    this.printInvoice = this.printInvoice.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentDidMount() {
    if (this.props?.location?.state?.uuid) {
      this.setState({
        invoice: this.state.invoices.find(
          (s, i) => s.uuid === this.props?.location?.state?.uuid
        ),
      });
    } else {
      this.addItem();
      this.setDefaultValue();
    }
  }

  render() {
    const {
      imgSrc,
      uuid,
      title,
      invoiceNo,
      invoiceDate,
      dueDate,
      invoiceFrom,
      invoiceTo,
      items,
      discounts,
      shipping,
      terms,
    } = this.state.invoice;
    const { invoices } = this.state;
    return (
      <React.Fragment>
        <div className="row" style={{ backgroundColor: "#eee" }}>
          <div className="col-md-10">
            <div className="papers">
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      {imgSrc !== "" && (
                        <div>
                          <React.Fragment>
                            <img
                              src={imgSrc}
                              className="mr-3 rounded preview-image"
                              alt=""
                            />
                            <button
                              type="button"
                              title="Remove logo"
                              onClick={this.handleRemoveImage}
                              className="btn btn-dark btn-sm preview-image-remove"
                            >
                              &times;
                            </button>
                          </React.Fragment>
                        </div>
                      )}
                      {imgSrc === "" && (
                        <div className="custom-file1 files color">
                          <input
                            type="file"
                            className="custom-file-input1 form-control-sm"
                            accept="image/x-png,image/jpg,image/jpeg"
                            id="customFile"
                            onChange={this.onImageChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <input
                          type="text"
                          name="title"
                          maxLength="20"
                          placeholder="Invoice"
                          className="form-control"
                          value={title}
                          onChange={this.handleUserInput}
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">#</div>
                        </div>
                        <input
                          type="number"
                          min="1"
                          className="form-control"
                          name="invoiceNo"
                          value={invoiceNo}
                          onChange={this.handleUserInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mt-2">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <div className="input-group-text">Invoice Date:</div>
                        </div>
                        <input
                          type="date"
                          className="form-control"
                          name="invoiceDate"
                          value={invoiceDate}
                          onChange={(event) => this.handleUserInput(event)}
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">Due Date:</div>
                        </div>
                        <input
                          type="date"
                          className="form-control"
                          name="dueDate"
                          value={dueDate}
                          onChange={(event) => this.handleUserInput(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="invoiceFrom">Invoice from</label>
                    <textarea
                      className="form-control"
                      id="invoiceFrom"
                      name="invoiceFrom"
                      rows="3"
                      required
                      placeholder="Who is this invoice from? (required)"
                      value={invoiceFrom}
                      onChange={(event) => this.handleUserInput(event)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="invoiceTo">Invoice to</label>
                    <textarea
                      className="form-control"
                      id="invoiceTo"
                      name="invoiceTo"
                      rows="3"
                      required
                      placeholder="Who is this invoice to? (required)"
                      value={invoiceTo}
                      onChange={(event) => this.handleUserInput(event)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-sm">
                      <caption>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={(event) => this.addItem(event)}
                        >
                          &#43; Add Item
                        </button>
                      </caption>
                      <thead>
                        <tr className="d-flex">
                          <th className="col-md-1" scope="col">
                            #
                          </th>
                          <th className="col-md-4" scope="col">
                            Item
                          </th>
                          <th className="col-md-2" scope="col">
                            Quantity
                          </th>
                          <th className="col-md-2" scope="col">
                            Rate
                          </th>
                          <th className="col-md-1" scope="col">
                            GST
                          </th>
                          <th className="col-md-2" scope="col">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index} className="d-flex">
                            <th className="col-md-1" scope="row">
                              {index + 1}
                              <button
                                type="button"
                                title="Remove"
                                onClick={this.handleRemoveItem(index)}
                                className="btn btn-danger btn-sm float-right"
                              >
                                &times;
                              </button>
                            </th>
                            <td className="col-md-4">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Description of service or product..."
                                name="title"
                                value={item.title}
                                onChange={this.handleChange(index)}
                              />
                            </td>
                            <td className="col-md-2">
                              <input
                                type="number"
                                min="0"
                                className="form-control form-control-sm"
                                placeholder="Quantity"
                                name="quantity"
                                value={item.quantity}
                                onChange={this.handleChange(index)}
                              />
                            </td>
                            <td className="col-md-2">
                              <input
                                type="number"
                                min="0"
                                className="form-control form-control-sm"
                                placeholder="Rate"
                                name="rate"
                                value={item.rate}
                                onChange={this.handleChange(index)}
                              />
                            </td>
                            <td className="col-md-1">
                              <div className="input-group input-group-sm">
                                <input
                                  type="number"
                                  min="0"
                                  className="form-control "
                                  name="gst"
                                  value={item.gst}
                                  onChange={this.handleChange(index)}
                                />
                                <div className="input-group-append">
                                  <div className="input-group-text pr-1 pl-1">
                                    %
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="col-md-2">{this.getAmount(item)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <div className="form-group">
                    <label htmlFor="terms">Terms</label>
                    <textarea
                      className="form-control"
                      id="terms"
                      name="terms"
                      rows="3"
                      required
                      placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                      value={terms}
                      onChange={(event) => this.handleUserInput(event)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-5 form-inline">
                  <div className="form-group ml-auto mb-2">
                    <label>Subtotal</label>
                    <input
                      type="text"
                      className="form-control mx-sm-3"
                      disabled
                      readOnly
                      value={this.getSubtotal(items)}
                    />
                  </div>
                  <div className="form-group ml-auto mb-2">
                    <label>Discounts</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control mx-sm-3"
                      name="discounts"
                      value={discounts || 0}
                      onChange={(event) => this.handleUserInput(event)}
                    />
                  </div>
                  <div className="form-group ml-auto mb-2">
                    <label>Shipping</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control mx-sm-3"
                      name="shipping"
                      value={shipping || 0}
                      onChange={(event) => this.handleUserInput(event)}
                    />
                  </div>
                  <div className="form-group ml-auto mb-2">
                    <label>Total</label>
                    <input
                      type="text"
                      className="form-control mx-sm-3"
                      disabled
                      readOnly
                      value={this.getTotal(items, discounts, shipping)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={this.saveInvoice}
            >
              Save Invoice
            </button>

            <div
              className="btn-group btn-block mb-3"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-primary btn-sm"
                title="Download"
                onClick={() => this.downloadInvoice(this.state.invoice)}
              >
                <FontAwesomeIcon icon={faDownload} />
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                title="Open PDF File"
                onClick={() => this.openInvoice(this.state.invoice)}
              >
                <FontAwesomeIcon icon={faFilePdf} />
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                title="Print"
                onClick={() => this.printInvoice(this.state.invoice)}
              >
                <FontAwesomeIcon icon={faPrint} />
              </button>
            </div>

            <div>
              <h6>
                My Invoice{" "}
                <span className="badge badge-primary">{invoices.length}</span>
                <button
                  type="button"
                  title="New Invoice"
                  onClick={this.handleNewInvoice}
                  className="btn btn-outline-primary btn-sm float-right pr-1 pl-1 p-0"
                >
                  New
                </button>
              </h6>
              <hr></hr>
              <div>
                <div className="list-group">
                  {invoices.slice(0, 10).map((item, index) => (
                    <a
                      key={item.uuid + index}
                      href="#!"
                      className={`list-group-item list-group-item-action ${
                        item.uuid === uuid ? "active" : ""
                      }`}
                      onClick={(event) =>
                        this.handleHrefClick(event, item.uuid)
                      }
                    >
                      {item.invoiceNo}{" "}
                      <div className="dropdown float-right">
                        <button
                          className="btn btn-sm btn-secondary dropdown-toggle1"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <React.Fragment>
                            <button
                              type="button"
                              title="Download Invoice"
                              onClick={() => this.downloadInvoice(item)}
                              className="dropdown-item"
                            >
                              Download
                            </button>
                            <button
                              type="button"
                              title="Open PDF Invoice"
                              onClick={() => this.openInvoice(item)}
                              className="dropdown-item"
                            >
                              Open PDF
                            </button>
                            <button
                              type="button"
                              title="Print Invoice"
                              onClick={() => this.printInvoice(item)}
                              className="dropdown-item"
                            >
                              Print
                            </button>
                            <div className="dropdown-divider"></div>
                            <button
                              type="button"
                              title="Delete Invoice"
                              onClick={() => this.handleRemoveInvoice(index)}
                              className="dropdown-item text-danger"
                            >
                              Delete
                            </button>
                          </React.Fragment>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  uuid() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  handleHrefClick = (e, uuid) => {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    if (
      (target === null || target === void 0 ? void 0 : target.tagName) === "A"
    ) {
      this.setState({
        invoice: this.state.invoices.find((s, i) => s.uuid === uuid),
      });
    }
    return true;
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        invoice: {
          ...prevState.invoice,
          [name]: value,
        },
      };
    });
  };

  handleChange = (i) => (event) => {
    const name = event.target.name;
    const value = event.target.value;
    var state = { ...this.state };
    state.invoice.items = state.invoice.items.map((item, index) => {
      if (i !== index) return item;
      if (name === "quantity" || name === "rate" || name === "gst") {
        return { ...item, [name]: value };
      } else {
        return { ...item, [name]: value };
      }
    });
    this.setState({ state });
  };

  getSubtotal = (items) =>
    items
      .reduce((sum, item) => Number(sum) + Number(item.amount), 0)
      .toFixed(2);

  getTotal = (items, discounts, shipping) =>
    (
      this.getSubtotal(items) -
      Number(discounts || 0) +
      Number(shipping || 0)
    ).toFixed(2);

  addItem() {
    var state = { ...this.state };
    state.invoice.items.push(this.state.item);
    this.setState({ state });
  }

  setDefaultValue = () => {
    if (localStorage.getItem("defaultSettings")) {
      let def = JSON.parse(localStorage.getItem("defaultSettings"));
      var state = { ...this.state };
      state.invoice.imgSrc = def.imgSrc;
      state.invoice.invoiceFrom = def.invoiceFrom;
      state.invoice.terms = def.terms;
      this.setState({ state });
    }
  };

  handleRemoveItem = (idx) => () => {
    var state = { ...this.state };
    state.invoice.items = this.state.invoice.items.filter((s, i) => idx !== i);
    this.setState({ state });
  };

  handleRemoveInvoice = (idx) => {
    if (window.confirm("Are you sure you wish to delete this invoice?")) {
      let { invoices } = this.state;
      invoices = this.state.invoices.filter((s, i) => idx !== i);
      this.setState({ invoices });
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  };

  handleRemoveImage = () => {
    let { invoice } = this.state;
    invoice.imgSrc = "";
    this.setState({ invoice });
  };

  handleRemoveImageDefaultSetting = () => {
    let { defaultSettings } = this.state;
    defaultSettings.imgSrc = "";
    this.setState({ defaultSettings }, () =>
      this.setLocalStorage("defaultSettings", defaultSettings)
    );
  };

  handleNewInvoice = () => {
    let { invoice } = this.state;
    invoice = {
      imgSrc: "",
      uuid: this.uuid(),
      title: "INVOICE",
      invoiceNo: this.randomNumber(1, 999999),
      invoiceDate: "",
      dueDate: "",
      invoiceFrom: "",
      invoiceTo: "",
      items: [],
      discounts: 0,
      shipping: 0,
      terms: "",
    };
    invoice.items.push(this.state.item);
    this.setState({ invoice }, () => this.setDefaultValue());
  };

  saveInvoice = () => {
    let { invoices } = this.state;
    let currentUuid = this.state.invoice.uuid;
    let findObject = this.state.invoices.find((s, i) => s.uuid === currentUuid);
    if (findObject) {
      invoices = this.state.invoices.map((item) => {
        if (item.uuid === currentUuid) {
          return Object.assign({}, item, this.state.invoice);
        }
        return item;
      });
      this.setState({ invoices: invoices });
    } else {
      invoices.unshift(this.state.invoice);
      this.setState({
        invoices: invoices,
      });
    }
    localStorage.setItem("invoices", JSON.stringify(invoices));
  };

  getAmount(item) {
    const { quantity, rate, gst } = item;
    let totalAmount = quantity * rate;
    let gstAmount = totalAmount * (gst / 100);
    let grossAmount = (Number(totalAmount) + Number(gstAmount)).toFixed(2);
    item.amount = grossAmount;
    return grossAmount;
  }

  onImageChange = (e) => {
    // this / e.target is current target element.
    // stops the browser from redirecting.
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files;
    var fileCount = files.length;
    var i;
    if (fileCount > 0) {
      for (i = 0; i < fileCount; i = i + 1) {
        var file = files[i];
        // var name = file.name;
        // var size = this.bytesToSize(file.size);
        var reader = new FileReader();
        var state = { ...this.state };
        var self = this;
        // eslint-disable-next-line no-loop-func
        reader.onload = function (e) {
          state.invoice.imgSrc = e.target.result;
          self.setState({
            state,
          });
        };
        reader.readAsDataURL(file);
        this.setState({
          state,
        });
      }
    }
    return false;
  };

  downloadInvoice = (obj) => {
    pdfExport.downloadInvoice(obj);
  };

  openInvoice = (obj) => {
    pdfExport.openInvoice(obj);
  };

  printInvoice = (obj) => {
    pdfExport.printInvoice(obj);
  };
}

export default InvoiceGenerator;
