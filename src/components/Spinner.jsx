import '../Spinner.css'
const Spinner = () => {
  return (
  <>
      <div className="d-flex justify-content-center ">
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
          </div>
          <h4 className="text-center">Espere un momento...</h4>
  </>
  )
}

export default Spinner