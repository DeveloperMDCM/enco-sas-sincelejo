
const ListaResultados = () => {
  return (
   <>

    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradioo" id="btnradio1" value={1}   />
            <label className="btn btn-outline-success" htmlFor="btnradio1">1</label>
            <input type="radio" className="btn-check" name="btnradioo" id="btnradio2" value={3}  />
            <label className="btn btn-outline-success" htmlFor="btnradio2">3</label>
            <input type="radio" className="btn-check" name="btnradioo" id="btnradio3"  value={6}  />
            <label className="btn btn-outline-success" htmlFor="btnradio3">6</label>
            <input type="radio" className="btn-check" name="btnradioo" id="btnradio4" value={8}  />
            <label className="btn btn-outline-success" htmlFor="btnradio4">8</label>
            <input type="radio" className="btn-check" name="btnradioo" id="btnradio5" value={''} />
            <label className="btn btn-outline-success" htmlFor="btnradio5">Todos</label>
        </div>
        
   </>
  )
}

export default ListaResultados