import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFilePdf,
  faPrint,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default class ActionRenderer extends Component {
  constructor(props) {
    super(props);
    this.invokeParentMethod = this.invokeParentMethod.bind(this);
    this.invokeParentMethodOpenPDF = this.invokeParentMethodOpenPDF.bind(this);
    this.invokeParentMethodDownloadPDF = this.invokeParentMethodDownloadPDF.bind(
      this
    );
    this.invokeParentMethodPrintPDF = this.invokeParentMethodPrintPDF.bind(
      this
    );
    this.invokeParentMethodDeleteInvoice = this.invokeParentMethodDeleteInvoice.bind(
      this
    );
  }

  invokeParentMethod() {
    this.props.context.componentParent.methodFromParent(this.props, "edit");
  }

  invokeParentMethodDownloadPDF() {
    this.props.context.componentParent.methodFromParent(
      this.props,
      "downloadPDF"
    );
  }

  invokeParentMethodOpenPDF() {
    this.props.context.componentParent.methodFromParent(this.props, "openPDF");
  }

  invokeParentMethodPrintPDF() {
    this.props.context.componentParent.methodFromParent(this.props, "printPDF");
  }

  invokeParentMethodDeleteInvoice() {
    this.props.context.componentParent.methodFromParent(
      this.props,
      "deleteInvoice"
    );
  }

  render() {
    return (
      <span>
        <button
          onClick={this.invokeParentMethod}
          className="btn bnt-sm btn-info mr-1"
        >
          Open
        </button>
        <button
          onClick={this.invokeParentMethodDownloadPDF}
          className="btn bnt-sm btn-primary mr-1"
          title="Download PDF"
        >
          <FontAwesomeIcon icon={faDownload} />
        </button>
        <button
          onClick={this.invokeParentMethodOpenPDF}
          className="btn bnt-sm btn-primary mr-1"
          title="Open PDF"
        >
          <FontAwesomeIcon icon={faFilePdf} />
        </button>
        <button
          onClick={this.invokeParentMethodPrintPDF}
          className="btn bnt-sm btn-primary mr-1"
          title="Print PDF"
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
        <button
          onClick={this.invokeParentMethodDeleteInvoice}
          className="btn bnt-sm btn-danger"
          title="Delete Invoice"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </span>
    );
  }
}
