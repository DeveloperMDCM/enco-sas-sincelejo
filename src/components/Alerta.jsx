
function Alerta({alerta}) {
    return (
      <div
      className={`${alerta.error ? 'mx-auto btn btn-danger' : 'mx-auto btn btn-success'}
        text-center p-3 rounded-xl uppercase text-white font-bold mb-2
      `}
      >
          {alerta.msg}
          
      </div>
    )
  }
  
  export default Alerta