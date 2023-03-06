import Header from "../components/Header"
import Footer from '../components/Footer';
const Index = () => {
  return (
    <>
    <Header />
    
    <div className="text-center">

    <img src="Logo.png" width={300} className="img-fluid" alt="..." />
    </div>

    <div className="card-group gap-2  text-center">
  <div className="card">
  <img src="enco2.jpg" className="card-img-top" alt="..." />
    {/* <div className="card-body">
    
    </div> */}
    <div className="card-footer bg-dark">
      <small className="text-white fw-bold">ENCO SAS</small>
    </div>
  </div>
  <div className="card">
  <img src="enco2.jpg" className="card-img-top" alt="..." />
    {/* <div className="card-body">
     
    </div> */}
    <div className="card-footer bg-dark">
      <small className="text-white fw-bold">ENCO SAS</small>
    </div>
  </div>
  <div className="card">
    <img src="enco2.jpg" className="card-img-top" alt="..." />
    {/* <div className="card-body">
    
    </div> */}
    <div className="card-footer bg-dark">
      <small className="text-white fw-bold">ENCO SAS</small>
    </div>
  </div>
  <div className="card">
    <img src="enco2.jpg" className="card-img-top" alt="..." />
    {/* <div className="card-body">
     
    </div> */}
    <div className="card-footer bg-dark">
      <small className="text-white fw-bold">ENCO SAS</small>
    </div>
  </div>
</div>
  
    <Footer />
    </>
  )
}

export default Index