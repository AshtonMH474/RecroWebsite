import { handleDownload } from "@/lib/auth_functions";



export async function downloadPdf(solution,isSolutionGrid,type){
    
    if (!solution) return;

    const pdfUrl = solution?.mainPdf || solution?.file;
    if (!pdfUrl) {
      console.error("No PDF URL found");
      return;
    }

    if(!isSolutionGrid){
        try{
          const data = await handleDownload(pdfUrl,type)
          if(data.error)return;
        }catch(e){
          return e;
        }
    }

    const filename = pdfUrl.split("/").pop();

    const link = document.createElement("a");
    link.href = `/api/s3/download?fileUrl=${encodeURIComponent(pdfUrl)}`;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    

}