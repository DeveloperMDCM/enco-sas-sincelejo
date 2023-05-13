
const CategoriasProductos = () => {
  return (
    <>

    <div className=" flex  flex-wrap gap-2 justify-center" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio11" value={1}   />
            <label className="btn btn-outline-success" htmlFor="btnradio11">Herramientas</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio22" value={2}  />
            <label className="btn btn-outline-success" htmlFor="btnradio22">Cintas</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio33"  value={3}  />
            <label className="btn btn-outline-success" htmlFor="btnradio33">Lamparas y bombillos</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio44" value={4}  />
            <label className="btn btn-outline-success" htmlFor="btnradio44">Tuberia</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio55" value={5}  />
            <label className="btn btn-outline-success" htmlFor="btnradio55">Tornillos y Chazos</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio66" value={6}  />
            <label className="btn btn-outline-success" htmlFor="btnradio66">Cables</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio77" value={7}  />
            <label className="btn btn-outline-success" htmlFor="btnradio77">Materiales Electricos</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio88" value={8}  />
            <label className="btn btn-outline-success" htmlFor="btnradio88">Materiales Aire Acondicionado</label>
        </div>
        
   </>
  )
}

export default CategoriasProductos