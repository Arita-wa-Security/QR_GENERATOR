const form = document.querySelector("#form")
const qr_code = document.querySelector("#qr-code")
let code

const generateSubmit = (e) => {
    e.preventDefault()
    clearQR
    const url = document.getElementById("exampleInputEmail1").value
    console.log(url)
    if (url===""){
        alert("Please enter valid url")
    }else {
        generateQR(url)
    }
}


const generateQR = (url) => {

    const qr = new QRCode(qr_code,{
        text:url,
        height:85,
        width:85
    })
    code = qr
}



const clearQR = () => {
    qr_code.innerHTML==="";
    };

form.addEventListener('submit', generateSubmit)


// document.getElementById("exampleInputEmail1").style.backgroundColor = "yellow";

function addQRCodeToPDF() {
    const fileInput = document.getElementById('pdfFile');
    if (fileInput.files.length === 0) {
      alert('Please select a PDF file first.');
      return;
    }
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const arrayBuffer = event.target.result;
      PDFLib.PDFDocument.load(arrayBuffer).then(function(pdfDoc) {
        // generateQRCode(
            function generatee(qrCodeDataURL) {
                code = qrCodeDataURL
          pdfDoc.getPage(0).then(function(firstPage) {
            pdfDoc.embedPng(qrCodeDataURL).then(function(pngImage) {
              const { width, height } = pngImage.scale(0.25); // Adjust the scale as needed
  
              firstPage.drawImage(pngImage, {
                x: firstPage.getWidth() - width - 10,
                y: firstPage.getHeight() - height - 10,
                width,
                height,
              });
  
              pdfDoc.save().then(function(pdfBytes) {
                download(pdfBytes, "modified.pdf", "application/pdf");
              });
            });
          });
        }
        // );
      });
    };
  
    reader.readAsArrayBuffer(file);
  }