
const CambioPaginas = () => {
    const url = document.baseURI.split('/')[3];
  return (
    <>
    <h5 className=" text-danger">
     <span className="text-dark">Pagina</span>  / {url}
    </h5>
    </>
  )
}

export default CambioPaginas