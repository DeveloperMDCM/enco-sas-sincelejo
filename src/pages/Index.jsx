import Header from "../components/Header"
import Footer from '../components/Footer';

const Index = () => {
  return (
    <>
    <Header />
    <div>
      
    </div>
    
    <div className="d-flex justify-content-center flex-wrap">

    <div className="text-left bg-dark col-md-2 rounded-1 m-2 text-center">
                <small className="text-success">Administradores <i className="fa-solid fa-screwdriver-wrench"></i></small>
                <h5 className="text-info">3,458</h5>
            </div>
    <div className="text-left bg-dark col-md-2 rounded-1 m-2 text-center">
                <small className="text-success">Administrativos <i className="feather icon-user text-warning"></i></small>
                <h5 className="text-danger">3,458</h5>
            </div>
    <div className="text-left bg-dark col-md-2 rounded-1 m-2 text-center">
                <small className="text-success">Tecnicos <i className="feather icon-user text-warning"></i></small>
                <h5 className="text-warning">3,458</h5>
                
            </div>
    <div className="text-left bg-dark col-md-2 rounded-1 m-2 text-center">
                <small className="text-success">Herramientas <i className="fa-solid fa-lightbulb"></i></small>
                <h5 className="text-warning">3,458</h5>
            </div>
    <div className="text-left bg-dark col-md-2 rounded-1 m-2 text-center">
                <small className="text-success">Tuberias <i className="fa-solid fa-water"></i></small>
                <h5 className="text-warning">3,458</h5>
            </div>
 
   


    </div>
    {/* seccion de cartas ejempl  */}

    <div className="row m-3">
 
 <div className="col-sm-12 col-lg-4">
     <div className="card card-hover">
         <div className="card-body">
             <div className="d-flex">
                 <div className="mr-4">
                     <small>Balance</small>
                     <h4 className="mb-0">$3,567.53</h4>
                 </div>
                 <div className="chart ml-auto">
                     asdfadf
                 </div>
             </div>
         </div>
     </div>
 </div>

 <div className="col-sm-12 col-lg-4">
     <div className="card card-hover bg-red">
         <div className="card-body">
             <div className="d-flex">
                 <div className="mr-4">
                     <small>Balance</small>
                     <h4 className="mb-0">$3,567.53</h4>
                 </div>
                 <div className="chart ml-auto">
                     asdfadf
                 </div>
             </div>
         </div>
     </div>
 </div>

 <div className="col-sm-12 col-lg-4">
     <div className="card card-hover bg-green">
         <div className="card-body">
             <div className="d-flex">
                 <div className="mr-4">
                     <small>Balance</small>
                     <h4 className="mb-0">$3,567.53</h4>
                 </div>
                 <div className="chart ml-auto">
                     asdfadf
                 </div>
             </div>
         </div>
     </div>
 </div>
</div>

  
   {/* seccion de fotos de productos ejemplo */}



    <div className="text-center">

    <img src="Logo.png" width={300} className="img-fluid" alt="..." />
    </div>

  
    <Footer />
    </>
  )
}

export default Index