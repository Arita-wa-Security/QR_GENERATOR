
const form = document.querySelector("#form")
const qr_code = document.querySelector("#qr-code")


const generateSubmit = (e) => {
    e.preventDefault()
    clearQR
    const url = document.getElementById("exampleInputEmail1").value
    console.log(url)
    if (url===""){
        alert("Please enter valid url")
    }else {
       return generateQR(url, function(qrCodeDataURL) {
        embedQRCodeInPDF(qrCodeDataURL);
      })
    }
}


const generateQR = (url, callback) => {

    const qr = new QRCode(qr_code,{
        text:url,
        height:305,
        width:305
    })
    // return qr
    setTimeout(function() {
      const img = qr_code.querySelector('img');
      if (img) {
        callback(img.src);
      } else {
        alert('QR Code generation failed');
      }
    }, 500);
}



const clearQR = () => {
    qr_code.innerHTML==="";
    };

// form.addEventListener('submit', generateSubmit, addQRCodeToPDF)


// document.getElementById("exampleInputEmail1").style.backgroundColor = "yellow";

function embedQRCodeInPDF(qrCodeDataURL) {
    const fileInput = document.getElementById('exampleInputPassword1');
    if (fileInput.files.length === 0) {
      alert('Please select a PDF file first.');
      return;
    }
    // generateSubmit()
    const file = fileInput.files[0];
    console.log(file)
    const reader = new FileReader();
  
    reader.onload = function(event) {
      // event.preventDefault()
      const arrayBuffer = event.target.result;
      PDFLib.PDFDocument.load(arrayBuffer).then(function(pdfDoc) {
        // generateQRCode("www.google.com",
            // const embedQRCodeInPDF= (qrCodeDataURL) => {
              
              
              const firstPage = pdfDoc.getPage(0)
              // .then(function (firstPage) {
                pdfDoc.embedPng(qrCodeDataURL).then(function (pngImage) {
                  const { width, height } = pngImage.scale(0.25); // Adjust the scale as needed

                  const pageWidth = firstPage.getWidth();
                  const pageHeight = firstPage.getHeight();
                  const x = (pageWidth - width) / 2;
                  // Estimate content ends about 100 pts from bottom (change if needed)
                  const estimatedContentBottom = 290;

                  // Position QR code 1cm (28.35 pts) below content
                  const y = estimatedContentBottom - height - 28.35;
                  // const y = (pageHeight - height) / 2 - height;

                  firstPage.drawImage(pngImage, {
                    x,
                    y,
                    width,
                    height,
                  });

                  pdfDoc.save().then(function (pdfBytes) {
                    download(pdfBytes, "modified.pdf", "application/pdf");
                    console.log(
                      "QR code added to PDF successfully and the PDF has been downloaded."
                    );
                  });
                });
              // }
      });
            // }
        // );
      };
      reader.readAsArrayBuffer(file);
    };
   
    
    

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

  form.addEventListener('submit', generateSubmit)