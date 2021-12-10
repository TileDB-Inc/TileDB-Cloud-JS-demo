const saveArrayBufferAsFile = (fileName, buffer) => {
  try {
    const blob = new Blob([buffer], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (e) {
    console.error("BlobToSaveAs error", e);
  }
};

export default saveArrayBufferAsFile;
