import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ActionRenderer from "./actionRenderer.jsx";
import pdfExport from "../../common/pdfExport";

class InvoiceList extends Component {
  state = {
    context: { componentParent: this },
    frameworkComponents: {
      actionRenderer: ActionRenderer,
    },
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    columnDefs: [
      {
        headerName: "Invoice No",
        field: "invoiceNo",
      },
      {
        headerName: "Invoice Date",
        field: "invoiceDate",
      },
      {
        headerName: "Due Date",
        field: "dueDate",
      },
      {
        headerName: "Invoice To",
        field: "invoiceTo",
      },
      {
        headerName: "Action",
        field: "invoiceNo",
        cellRenderer: "actionRenderer",
        colId: "params",
        width: 180,
      },
    ],
    rowData: localStorage.getItem("invoices")
      ? JSON.parse(localStorage.getItem("invoices"))
      : [],
  };

  constructor() {
    super();
    this.methodFromParent = this.methodFromParent.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <h5>Invoices</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              style={{ height: "400px", width: "100%" }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                rowSelection="single"
                context={this.state.context}
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                defaultColDef={this.state.defaultColDef}
                onGridReady={this.onGridReady}
                frameworkComponents={this.state.frameworkComponents}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll(false);
  };

  autoSizeAll = (skipHeader) => {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  methodFromParent = (props, action) => {
    if (action === "edit") {
      this.props.history.push("/", { uuid: props.data.uuid });
    } else {
      const item = this.state.rowData.find(
        (s, i) => s.uuid === props.data.uuid
      );
      if (action === "downloadPDF") {
        pdfExport.downloadInvoice(item);
      } else if (action === "openPDF") {
        pdfExport.openInvoice(item);
      } else if (action === "printPDF") {
        pdfExport.printInvoice(item);
      } else if (action === "deleteInvoice") {
        if (window.confirm("Are you sure you wish to delete this invoice?")) {
          let state = this.state;
          state.rowData = state.rowData.filter(
            (s, i) => s.uuid !== props.data.uuid
          );
          this.setState(state);
          localStorage.setItem("invoices", JSON.stringify(state.rowData));
        }
      }
    }
  };
}

export default InvoiceList;
