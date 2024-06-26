
const form = document.querySelector("#form")
const qr_code = document.querySelector("#qr-code")


const generateSubmit = () => {
    // e.preventDefault()
    clearQR
    const url = document.getElementById("exampleInputEmail1").value
    console.log(url)
    if (url===""){
        alert("Please enter valid url")
    }else {
       return generateQR(url)
    }
}


const generateQR = (url) => {

    const qr = new QRCode(qr_code,{
        text:url,
        height:85,
        width:85
    })
    return qr
}



const clearQR = () => {
    qr_code.innerHTML==="";
    };

// form.addEventListener('submit', generateSubmit, addQRCodeToPDF)


// document.getElementById("exampleInputEmail1").style.backgroundColor = "yellow";

function addQRCodeToPDF(event) {
    event.preventDefault()
    const fileInput = document.getElementById('exampleInputPassword1');
    if (fileInput.files.length === 0) {
      alert('Please select a PDF file first.');
      return;
    }
    generateSubmit()
    const file = fileInput.files[0];
    console.log(file)
    const reader = new FileReader();
  
    reader.onload = function(event) {
      // event.preventDefault()
      const arrayBuffer = event.target.result;
      PDFLib.PDFDocument.load(arrayBuffer).then(function(pdfDoc) {
        // generateQRCode("www.google.com",
            (qrCodeDataURL) => {
              
              
              pdfDoc.getPage(0).then(function (firstPage) {
                pdfDoc.embedPng(qrCodeDataURL).then(function (pngImage) {
                  const { width, height } = pngImage.scale(0.25); // Adjust the scale as needed

                  firstPage.drawImage(pngImage, {
                    x: firstPage.getWidth() - width - 10,
                    y: firstPage.getHeight() - height - 10,
                    width,
                    height,
                  });

                  pdfDoc.save().then(function (pdfBytes) {
                    download(pdfBytes, "modified.pdf", "application/pdf");
                    console.log("QR code added to PDF successfully and the PDF has been downloaded.");
                  });
                });
              });
            }
        // );
      });
    };
   
    reader.readAsArrayBuffer(file);
  }   

  function download(data, filename, type) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  form.addEventListener('submit', addQRCodeToPDF)