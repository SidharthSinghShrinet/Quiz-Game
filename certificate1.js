const generatePDF = async (name)=>{
    const {PDFDocument, rgb} = PDFLib;

    // Retrieve the quiz name from local storage
    let quizName = localStorage.getItem("quizName")
    // Retrieve the quiz score from local storage
    let percent = localStorage.getItem("quizScore")

    const exBytes = await fetch("./cert.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./GreatVibes-Regular.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes)

    pdfDoc.registerFontkit(fontkit);

    const myfont  = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    // Draw Name
    firstPg.drawText(name,{
        x: 290,
        y:293,
        size:45,
        font:myfont
    });

    // Draw the Quiz Name
    firstPg.drawText(`${quizName}`,{
        x:317,
        y:260,
        size:19,
        color:rgb(0.0078,0.1647,0.3765)
    })

    // Draw the Score
    firstPg.drawText(`${percent}`,{
        x:374,
        y:229,
        size:21,
        color:rgb(0.0078,0.1647,0.3765)
    })
    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    window.open(uri);
    saveAs(uri,"Quiz-Game Certificate.pdf")
};

const submitBtn = document.querySelector("#downloaddata");
let inputVal = document.querySelector("#name");

submitBtn.addEventListener("click",()=>{
    let val=inputVal.value
    generatePDF(val);
})

