import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class pdfExport {
  static defaultSettings = localStorage.getItem("defaultSettings")
    ? JSON.parse(localStorage.getItem("defaultSettings"))
    : {
        imgSrc: "",
        invoiceFrom: "",
        terms: "",
        defaultTemplate: "temp1",
      };

  static docDefinition = localStorage.getItem("docDefinition")
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
      };

  static setSettings = () => {
    if (localStorage.getItem("defaultSettings")) {
      this.defaultSettings = JSON.parse(
        localStorage.getItem("defaultSettings")
      );
    }
    if (localStorage.getItem("docDefinition")) {
      this.docDefinition = JSON.parse(localStorage.getItem("docDefinition"));
    }
  };

  static downloadInvoice = (obj) => {
    this.setSettings();
    let docDefinition = this.getTemplateWithDef(obj);
    pdfMake.createPdf(docDefinition).download("Invoice No#" + obj.invoiceNo);
  };

  static openInvoice = (obj) => {
    this.setSettings();
    let docDefinition = this.getTemplateWithDef(obj);
    pdfMake.createPdf(docDefinition).open();
  };

  static printInvoice = (obj) => {
    this.setSettings();
    let docDefinition = this.getTemplateWithDef(obj);
    pdfMake.createPdf(docDefinition).print();
  };

  static getSubtotal = (items) =>
    items
      .reduce((sum, item) => Number(sum) + Number(item.amount), 0)
      .toFixed(2);

  static getTotal = (items, discounts, shipping) =>
    (
      this.getSubtotal(items) -
      Number(discounts || 0) +
      Number(shipping || 0)
    ).toFixed(2);

  static getTemplateWithDef = (obj) => {
    let docDef = null;
    switch (this.defaultSettings.defaultTemplate) {
      case "temp1":
        docDef = this.generateDocDef(obj);
        break;
      case "temp2":
        docDef = this.generateDocDefTemplate2(obj);
        break;
      case "temp3":
        docDef = this.generateDocDefTemplate3(obj);
        break;
      case "temp4":
        docDef = this.generateDocDefTemplate4(obj);
        break;
      default:
        docDef = this.generateDocDef(obj);
        break;
    }
    return docDef;
  };
  // Template 1 (Default)
  static generateDocDef = (obj) => {
    const {
      backgroundColor,
      watermark,
      pageSize,
      pageOrientation,
    } = this.docDefinition;
    let itemBody = [
      [
        { text: "#", style: "tableHeader" },
        { text: "Item", style: "tableHeader" },
        { text: "Qty", style: "tableHeader", alignment: "center" },
        { text: "Rate", style: "tableHeader", alignment: "right" },
        { text: "GST", style: "tableHeader", alignment: "center" },
        { text: "Amount", style: "tableHeader", alignment: "right" },
      ],
    ];
    let itemArr = ["", "", "", "", "", ""];
    if (obj.items.length === 0) itemBody.push(itemArr);
    for (let index = 0; index < obj.items.length; index++) {
      const element = obj.items[index];
      itemBody.push([
        index + 1,
        element.title,
        { text: element.quantity, alignment: "center" },
        { text: element.rate, alignment: "right" },
        { text: element.gst, alignment: "center" },
        { text: element.amount, alignment: "right" },
      ]);
    }
    var docDefinition = {
      pageSize: pageSize,
      pageOrientation: pageOrientation,
      watermark: {
        text: watermark.text,
        color: backgroundColor,
        opacity: Number(watermark.opacity),
        bold: watermark.bold,
        italics: watermark.italics,
      },
      info: {
        title: "Invoice No#" + obj.invoiceNo,
        author: "Bhaumik Patel",
        subject: "Invoice No#" + obj.invoiceNo,
        keywords: "Invoice No#" + obj.invoiceNo,
      },
      footer: function (currentPage, pageCount, pageSize) {
        return [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: pageSize.width,
                h: 5,
                color: backgroundColor,
              },
            ],
          },
          {
            text: "Page " + currentPage.toString() + " of " + pageCount + "   ",
            alignment: "right",
            margin: [0, 10, 40, 0],
          },
        ];
      },
      header: function (currentPage, pageCount, pageSize) {
        return [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 10,
                w: pageSize.width,
                h: 15,
                color: backgroundColor,
              },
            ],
          },
        ];
      },
      content: [
        {
          columns: [
            {
              width: "auto",
              columns: [
                {
                  image: obj.imgSrc
                    ? obj.imgSrc
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                  width: 100,
                  height: 100,
                },
              ],
            },
            {
              width: "*",
              text: [
                {
                  text: "Invoice No: #" + obj.invoiceNo,
                  fontSize: 15,
                  bold: true,
                  alignment: "right",
                  lineHeight: 1.2,
                },
                "\n",
                {
                  text: "Invoice Date: " + obj.invoiceDate,
                  alignment: "right",
                },
                "\n",
                {
                  text: "Due Date: " + obj.dueDate,
                  alignment: "right",
                },
              ],
            },
          ],
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["auto", "*"],
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [
                { text: "Bill From", style: "tableHeader" },
                { text: "Bill For", style: "tableHeader" },
              ],
              [obj.invoiceFrom, obj.invoiceTo],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex === 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["auto", "*", 50, 60, 30, 80],
            // keepWithHeaderRows: 1,
            body: itemBody,
          },
          layout: "lightHorizontalLines",
        },
        {
          columns: [
            {
              width: "*",
              text: [
                {
                  text: obj.terms !== "" ? "Terms\n" + obj.terms : "",
                  fontSize: 10,
                },
              ],
            },
            {
              width: "auto",
              columns: [
                {
                  width: "*",
                  text: [
                    {
                      text: "Subtotal",
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: "Discounts",
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: "Shipping",
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 5,
                          x2: 250,
                          y2: 5,
                          lineWidth: 3,
                        },
                      ],
                    },
                    {
                      text: "Total",
                      fontSize: 12,
                      bold: true,
                      alignment: "right",
                    },
                  ],
                },
                {
                  width: "auto",
                  text: [
                    {
                      text: this.getSubtotal(obj.items),
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text:
                        obj.discounts > 0 ? "-" + obj.discounts : obj.discounts,
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: obj.shipping,
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: this.getTotal(
                        obj.items,
                        obj.discounts,
                        obj.shipping
                      ),
                      fontSize: 12,
                      bold: true,
                      alignment: "right",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        columnGap: 15,
      },
    };

    return docDefinition;
  };

  // Template 2
  static generateDocDefTemplate2 = (obj) => {
    const {
      backgroundColor,
      watermark,
      pageSize,
      pageOrientation,
    } = this.docDefinition;
    let itemBody = [
      [
        { text: "#", style: "tableHeader", alignment: "right", color: "white" },
        { text: "Item", style: "tableHeader", color: "white" },
        {
          text: "Qty",
          style: "tableHeader",
          alignment: "center",
          color: "white",
        },
        {
          text: "Rate",
          style: "tableHeader",
          alignment: "right",
          color: "white",
        },
        {
          text: "GST",
          style: "tableHeader",
          alignment: "center",
          color: "white",
        },
        {
          text: "Amount",
          style: "tableHeader",
          alignment: "right",
          color: "white",
        },
      ],
    ];
    let itemArr = ["", "", "", "", "", ""];
    if (obj.items.length === 0) itemBody.push(itemArr);
    for (let index = 0; index < obj.items.length; index++) {
      const element = obj.items[index];
      itemBody.push([
        { text: index + 1, alignment: "right" },
        element.title,
        { text: element.quantity, alignment: "center" },
        { text: element.rate, alignment: "right" },
        { text: element.gst, alignment: "center" },
        { text: element.amount, alignment: "right" },
      ]);
    }
    pdfMake.tableLayouts = {
      exampleLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0;
          }
          return i === node.table.headerRows ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i, node) {
          return i === 1 ? "black" : "#aaa";
        },
        fillColor: function (i, node) {
          return i === 0 ? backgroundColor : i % 2 === 0 ? "#CCCCCC" : null;
        },
        paddingLeft: function (i) {
          return i === 0 ? 8 : 8;
        },
        paddingRight: function (i, node) {
          //return i === node.table.widths.length - 1 ? 0 : 8;
          return 3;
        },
        paddingTop: function (i, node) {
          return 3;
        },
        paddingBottom: function (i, node) {
          return 3;
        },
      },
    };
    var docDefinition = {
      pageSize: pageSize,
      pageOrientation: pageOrientation,
      watermark: {
        text: watermark.text,
        color: backgroundColor,
        opacity: Number(watermark.opacity),
        bold: watermark.bold,
        italics: watermark.italics,
      },
      info: {
        title: "Invoice No#" + obj.invoiceNo,
        author: "Bhaumik Patel",
        subject: "Invoice No#" + obj.invoiceNo,
        keywords: "Invoice No#" + obj.invoiceNo,
      },
      footer: function (currentPage, pageCount, pageSize) {
        return [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: pageSize.width,
                h: 5,
                color: backgroundColor,
              },
            ],
          },
          {
            text: "Page " + currentPage.toString() + " of " + pageCount + "   ",
            alignment: "right",
            margin: [0, 10, 30, 0],
          },
        ];
      },
      header: function (currentPage, pageCount, pageSize) {
        return [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 10,
                w: pageSize.width,
                h: 3,
                color: backgroundColor,
              },
            ],
          },
        ];
      },
      content: [
        {
          columns: [
            {
              width: "auto",
              columns: [
                {
                  image: obj.imgSrc
                    ? obj.imgSrc
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                  width: 100,
                  height: 100,
                },
              ],
            },
            {
              width: "*",
              text: [
                {
                  text: obj.invoiceFrom,
                },
              ],
            },
            {
              width: "*",
              text: [
                {
                  text: "Invoice No: #" + obj.invoiceNo,
                  fontSize: 15,
                  bold: true,
                  alignment: "right",
                  lineHeight: 1.2,
                },
                "\n",
                {
                  text: "Invoice Date: " + obj.invoiceDate,
                  alignment: "right",
                },
                "\n",
                {
                  text: "Due Date: " + obj.dueDate,
                  alignment: "right",
                },
              ],
            },
          ],
        },

        "\nBill To",
        {
          canvas: [
            { type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
          ],
        },
        obj.invoiceTo,
        "\n",
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["auto", "*", 50, 60, 30, 80],
            // keepWithHeaderRows: 1,
            body: itemBody,
          },
          layout: "exampleLayout",
          dontBreakRows: true,
        },
        {
          columns: [
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              columns: [
                {
                  width: "*",
                  text: [
                    {
                      text: "Subtotal",
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: "Discounts",
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: "Shipping",
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: "\t\t\tTotal",
                      fontSize: 12,
                      bold: true,
                      alignment: "right",
                      background: backgroundColor,
                      color: "#FFF",
                    },
                  ],
                },
                {
                  width: "auto",
                  text: [
                    {
                      text: this.getSubtotal(obj.items),
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text:
                        obj.discounts > 0 ? "-" + obj.discounts : obj.discounts,
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: obj.shipping,
                      alignment: "right",
                      lineHeight: 1.2,
                    },
                    "\n",
                    {
                      text: this.getTotal(
                        obj.items,
                        obj.discounts,
                        obj.shipping
                      ),
                      fontSize: 12,
                      bold: true,
                      alignment: "right",
                      background: backgroundColor,
                      color: "#FFF",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: [
            {
              text: obj.terms !== "" ? "\nTerms\n" + obj.terms : "",
              fontSize: 10,
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        columnGap: 15,
      },
    };

    return docDefinition;
  };

  // Template 3
  static generateDocDefTemplate3 = (obj) => {
    const {
      backgroundColor,
      watermark,
      pageSize,
      pageOrientation,
    } = this.docDefinition;
    let itemBody = [
      [
        { text: "#", style: "tableHeader", alignment: "right", color: "white" },
        { text: "Item", style: "tableHeader", color: "white" },
        {
          text: "Qty",
          style: "tableHeader",
          alignment: "center",
          color: "white",
        },
        {
          text: "Rate",
          style: "tableHeader",
          alignment: "right",
          color: "white",
        },
        {
          text: "GST",
          style: "tableHeader",
          alignment: "center",
          color: "white",
        },
        {
          text: "Amount",
          style: "tableHeader",
          alignment: "right",
          color: "white",
        },
      ],
    ];
    let itemArr = ["", "", "", "", "", ""];
    if (obj.items.length === 0) itemBody.push(itemArr);
    for (let index = 0; index < obj.items.length; index++) {
      const element = obj.items[index];
      itemBody.push([
        { text: index + 1, alignment: "right" },
        element.title,
        { text: element.quantity, alignment: "center" },
        { text: element.rate, alignment: "right" },
        { text: element.gst, alignment: "center" },
        { text: element.amount, alignment: "right" },
      ]);
    }
    pdfMake.tableLayouts = {
      totalLayout: {
        hLineWidth: function (i, node) {
          return 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i, node) {
          return "#aaa";
        },
        fillColor: function (i, node) {
          return i === 0 ? "#e8e8e8" : i % 2 === 0 ? "#e8e8e8" : null;
        },
        paddingLeft: function (i) {
          return i === 0 ? 8 : 8;
        },
        paddingRight: function (i, node) {
          //return i === node.table.widths.length - 1 ? 0 : 8;
          return 3;
        },
        paddingTop: function (i, node) {
          return 3;
        },
        paddingBottom: function (i, node) {
          return 3;
        },
      },
      exampleLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0;
          }
          return i === node.table.headerRows ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i, node) {
          return i === 1 ? "black" : "#aaa";
        },
        fillColor: function (i, node) {
          return i === 0 ? backgroundColor : i % 2 === 0 ? "#e8e8e8" : null;
        },
        paddingLeft: function (i) {
          return i === 0 ? 8 : 8;
        },
        paddingRight: function (i, node) {
          //return i === node.table.widths.length - 1 ? 0 : 8;
          return 3;
        },
        paddingTop: function (i, node) {
          return 3;
        },
        paddingBottom: function (i, node) {
          return 3;
        },
      },
    };
    // -- Set the report date for display only.
    let reportDate = new Date().toDateString();
    var docDefinition = {
      pageSize: pageSize,
      pageOrientation: pageOrientation,
      watermark: {
        text: watermark.text,
        color: backgroundColor,
        opacity: Number(watermark.opacity),
        bold: watermark.bold,
        italics: watermark.italics,
      },
      info: {
        title: "Invoice No#" + obj.invoiceNo,
        author: "Bhaumik Patel",
        subject: "Invoice No#" + obj.invoiceNo,
        keywords: "Invoice No#" + obj.invoiceNo,
      },
      footer: function (currentPage, pageCount, pageSize) {
        return {
          text: `${reportDate} : Page ${currentPage.toString()} of ${pageCount.toString()}`,
          alignment: "center",
          fontSize: 7,
        };
      },
      header: function (currentPage, pageCount, pageSize) {
        return [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 10,
                w: pageSize.width,
                h: 3,
                color: backgroundColor,
              },
            ],
          },
        ];
      },
      content: [
        {
          columns: [
            {
              width: "*",
              text: [
                {
                  text: obj.invoiceFrom,
                },
              ],
            },
            {
              width: "auto",
              columns: [
                {
                  image: obj.imgSrc
                    ? obj.imgSrc
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                  width: 100,
                  height: 100,
                },
              ],
            },

            {
              width: "*",
              text: [
                {
                  text: "Invoice No: #" + obj.invoiceNo,
                  fontSize: 15,
                  bold: true,
                  alignment: "right",
                  lineHeight: 1.2,
                },
                "\n",
                {
                  text: "Invoice Date: " + obj.invoiceDate,
                  alignment: "right",
                },
                "\n",
                {
                  text: "Due Date: " + obj.dueDate,
                  alignment: "right",
                },
              ],
            },
          ],
        },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*"],

            body: [
              [{ text: "Bill To", bold: true, fillColor: "#F9F9F9" }],
              [{ text: obj.invoiceTo, fillColor: "#F9F9F9" }],
            ],
          },
        },
        "\n",
        {
          margin: [0, 0, 0, 0],
          layout: "exampleLayout",
          dontBreakRows: true,
          table: {
            headerRows: 1,
            widths: ["auto", "*", 50, 60, 30, 80],
            // keepWithHeaderRows: 1,
            body: itemBody,
          },
        },

        {
          columns: [
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              columns: [
                {
                  layout: "totalLayout",
                  table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 0,
                    widths: ["*", 80],

                    body: [
                      [
                        { text: "Subtotal", bold: true, alignment: "right" },
                        {
                          text: this.getSubtotal(obj.items),
                          bold: false,
                          alignment: "right",
                        },
                      ],
                      [
                        { text: "Discounts", bold: true, alignment: "right" },
                        {
                          text:
                            obj.discounts > 0
                              ? "-" + obj.discounts
                              : obj.discounts,
                          bold: false,
                          alignment: "right",
                        },
                      ],
                      [
                        { text: "Shipping", bold: true, alignment: "right" },
                        {
                          text: obj.shipping,
                          bold: false,
                          alignment: "right",
                        },
                      ],
                      [
                        { text: "Total", bold: true, alignment: "right" },
                        {
                          text: this.getTotal(
                            obj.items,
                            obj.discounts,
                            obj.shipping
                          ),
                          bold: false,
                          alignment: "right",
                        },
                      ],
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          stack: [
            {
              text: obj.terms !== "" ? "\nTerms\n" + obj.terms : "",
              fontSize: 10,
            },
            "\n\n\n\n\n",
            { text: "Signature / Stamp", color: backgroundColor },
            { text: "Place: " },
            { text: "Date: " },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        columnGap: 15,
      },
    };

    return docDefinition;
  };

  // Template 4
  static generateDocDefTemplate4 = (obj) => {
    const {
      backgroundColor,
      watermark,
      pageSize,
      pageOrientation,
    } = this.docDefinition;
    let itemBody = [
      [
        { text: "#", style: "tableHeader", alignment: "right", color: "white" },
        { text: "Item", style: "tableHeader", color: "white" },
        {
          text: "Qty",
          style: "tableHeader",
          alignment: "center",
          color: "white",
        },
        {
          text: "Rate",
          style: "tableHeader",
          alignment: "right",
          color: "white",
        },
        {
          text: "GST",
          style: "tableHeader",
          alignment: "center",
          color: "white",
        },
        {
          text: "Amount",
          style: "tableHeader",
          alignment: "right",
          color: "white",
        },
      ],
    ];
    let itemArr = ["", "", "", "", "", ""];
    if (obj.items.length === 0) itemBody.push(itemArr);
    for (let index = 0; index < obj.items.length; index++) {
      const element = obj.items[index];
      itemBody.push([
        { text: index + 1, alignment: "right" },
        element.title,
        { text: element.quantity, alignment: "center" },
        { text: element.rate, alignment: "right" },
        { text: element.gst, alignment: "center" },
        { text: element.amount, alignment: "right" },
      ]);
    }
    pdfMake.tableLayouts = {
      totalLayout: {
        hLineWidth: function (i, node) {
          return 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i, node) {
          return "#aaa";
        },
        fillColor: function (i, node) {
          return i === 0 ? "#e8e8e8" : i % 2 === 0 ? "#e8e8e8" : null;
        },
        paddingLeft: function (i) {
          return i === 0 ? 8 : 8;
        },
        paddingRight: function (i, node) {
          //return i === node.table.widths.length - 1 ? 0 : 8;
          return 3;
        },
        paddingTop: function (i, node) {
          return 3;
        },
        paddingBottom: function (i, node) {
          return 3;
        },
      },
      exampleLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 1;
          }
          return i === node.table.headerRows ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 1;
        },
        hLineColor: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return "black";
          }
          return i === 1 ? "black" : "#aaa";
        },
        fillColor: function (i, node) {
          return i === 0 ? backgroundColor : i % 2 === 0 ? "#e8e8e8" : null;
        },
        paddingLeft: function (i) {
          return i === 0 ? 8 : 8;
        },
        paddingRight: function (i, node) {
          //return i === node.table.widths.length - 1 ? 0 : 8;
          return 3;
        },
        paddingTop: function (i, node) {
          return 3;
        },
        paddingBottom: function (i, node) {
          return 3;
        },
      },
    };
    // -- Set the report date for display only.
    let reportDate = new Date().toDateString();
    var docDefinition = {
      pageSize: pageSize,
      pageOrientation: pageOrientation,
      watermark: {
        text: watermark.text,
        color: backgroundColor,
        opacity: Number(watermark.opacity),
        bold: watermark.bold,
        italics: watermark.italics,
      },
      info: {
        title: "Invoice No#" + obj.invoiceNo,
        author: "Bhaumik Patel",
        subject: "Invoice No#" + obj.invoiceNo,
        keywords: "Invoice No#" + obj.invoiceNo,
      },
      footer: function (currentPage, pageCount, pageSize) {
        return {
          text: `${reportDate} : Page ${currentPage.toString()} of ${pageCount.toString()}`,
          alignment: "center",
          fontSize: 8,
        };
      },
      header: function (currentPage, pageCount, pageSize) {
        return [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 10,
                w: pageSize.width,
                h: 3,
                color: backgroundColor,
              },
            ],
          },
        ];
      },
      content: [
        {
          columns: [
            {
              width: "*",
              text: [
                {
                  text: obj.invoiceFrom,
                },
              ],
            },
            {
              width: "auto",
              columns: [
                {
                  image: obj.imgSrc
                    ? obj.imgSrc
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                  width: 100,
                  height: 100,
                },
              ],
            },
            {
              text: [
                {
                  text: obj.invoiceTo,
                  alignment: "right",
                },
              ],
            },
          ],
        },

        {
          columns: [
            {
              width: "*",
              text: [
                {
                  text: "Invoice No: #" + obj.invoiceNo,
                  fontSize: 15,
                  bold: true,
                  lineHeight: 1.2,
                },
              ],
            },
            {
              text: "Invoice Date: " + obj.invoiceDate,
              alignment: "right",
            },
            {
              text: "Due Date: " + obj.dueDate,
              alignment: "right",
            },
          ],
        },

        "\n",
        {
          margin: [0, 0, 0, 0],
          layout: "exampleLayout",
          dontBreakRows: true,
          table: {
            headerRows: 1,
            widths: ["auto", "*", 50, 60, 30, 80],
            // keepWithHeaderRows: 1,
            body: itemBody,
          },
        },

        {
          columns: [
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              columns: [
                {
                  layout: "totalLayout",
                  table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 0,
                    widths: ["*", 80],

                    body: [
                      [
                        { text: "Subtotal", bold: true, alignment: "right" },
                        {
                          text: this.getSubtotal(obj.items),
                          bold: false,
                          alignment: "right",
                        },
                      ],
                      [
                        { text: "Discounts", bold: true, alignment: "right" },
                        {
                          text:
                            obj.discounts > 0
                              ? "-" + obj.discounts
                              : obj.discounts,
                          bold: false,
                          alignment: "right",
                        },
                      ],
                      [
                        { text: "Shipping", bold: true, alignment: "right" },
                        {
                          text: obj.shipping,
                          bold: false,
                          alignment: "right",
                        },
                      ],
                      [
                        { text: "Total", bold: true, alignment: "right" },
                        {
                          text: this.getTotal(
                            obj.items,
                            obj.discounts,
                            obj.shipping
                          ),
                          bold: false,
                          alignment: "right",
                        },
                      ],
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          stack: [
            {
              text: obj.terms !== "" ? "\nTerms\n" + obj.terms : "",
              fontSize: 10,
            },
            "\n\n\n\n",
            {
              canvas: [
                {
                  type: "line",
                  x1: 0,
                  y1: 5,
                  x2: 250,
                  y2: 5,
                  lineWidth: 1,
                },
              ],
            },
            { text: "Signature / Stamp", color: backgroundColor },
            { text: "Place: " },
            { text: "Date: " },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        columnGap: 15,
      },
    };

    return docDefinition;
  };
}

export default pdfExport;
