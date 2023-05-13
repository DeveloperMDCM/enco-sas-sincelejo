
import React, { useState, useCallback} from "react";
import { Calendar , momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
import Alerta from '../components/Alerta';
import { useFetchOrdebes } from "../useFetchOrdenes";
import axios from "axios";
import moment from 'moment';
import momentPTBR from 'moment/src/locale/es';
import { useFetch } from "../useFetch";
import { show_alerta } from "../functions";
moment.updateLocale('es', momentPTBR)

const localizer = momentLocalizer(moment) // or globalizeLocalizer
const cumpleanos = new Date;
console.log(cumpleanos.getFullYear());
  const events = [
   
    {
      className: 'bg-indigo-600',
        title: "Cumpleaños Moises Canaria",
        start: new Date(`${cumpleanos.getFullYear()}-10-13 00:00` ),
        end: new Date(`${cumpleanos.getFullYear()}-10-13 23:59`),
    },
    {
      className: 'bg-indigo-600',
        title: "Cumpleaños Jesus Pineda",
        start: new Date(`${cumpleanos.getFullYear()}-03-11 00:00` ),
        end: new Date(`${cumpleanos.getFullYear()}-03-11 23:59`),
    },
  
  ];
// console.log(events);
const CalendarioAgendas = () => {


  const url = `${import.meta.env.VITE_BACKEND_URL}eventosAgenda.php`;
  const urlOrden = `${import.meta.env.VITE_BACKEND_URL}agendaOrdenes.php`;
  const { response, error, loading, fetchData } = useFetch(url);
  const { responseOrdenes, errorOrden, loadingOrden, fetchDataOrden } = useFetchOrdebes(urlOrden);
  const { Eventos_Agenda } = response;
  const { Eventos_Ordenes } = responseOrdenes;
  const [alerta, setAlerta] = useState({});
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [titulo, setTitulo] = useState('')
  const [inicio, setInicio] = useState('')
  const [finaliza, setFinaliza] = useState('')
  const eventos2 = Eventos_Agenda?.map((item, i) =>
  {
   
    return {
      title: item.titulo,
      start: new Date(item.inicio),
      end: new Date(item.finaliza)
    };
   
  })
  const eventosOrdenes = Eventos_Ordenes?.map((item, i) =>
  {
   
    return {
      title: item.titulo,
      start: new Date(item.inicio),
      end: new Date(item.finaliza)
    };
   
  })


  const newArray = allEvents.concat(eventos2)
  const ordenesNuevas = newArray.concat(eventosOrdenes)
  const todos = ordenesNuevas.concat(events)
  // console.log(newArray);

    // console.log(allEvents);
    const handleSubmit =  e => {
      e.preventDefault();
    }
    const handleResultados = () => {
        fetchData();
        fetchDataOrden()
      }

    // var nuevoArray = [ ... events , ... eventos2 ] ;
    function handleAddEvent() {
     
        if(titulo === '' || inicio === '' || finaliza === '' || inicio > finaliza   ){
          show_alerta('Complete todos los campos correctamente', 'error')
          return;
        } else {

          const nuevoEvento = async (titulos, inicios, fins) => {
            try {
              await axios.post(url, { titulo: titulos + ' Evento', inicio: inicios, finaliza: fins  })
              // console.log(res.data)
              show_alerta('Nuevo Evento Creado', 'success')
              setInicio('');
              setTitulo('');
              setFinaliza('');
              fetchData();
              // fetchDataOrden()
              // setAllEvents([...allEvents, newEvent]);
            } catch (e) {
              alert('Ah ocurrido un error')
            }
          }
          nuevoEvento(titulo, inicio, finaliza)
        }
       
        // setAlerta({})
        // document.querySelector("#titulo").value = '';
      }
      const { msg } = alerta;
      const slotPropGetter = useCallback(
        (date) => ({
          className: 'slotDefault ',
          ...(moment(date).hour() > 7  &&  moment(date).hour() < 13 && {
            style: {
              backgroundColor: '#4fa887',
              color: 'white',
            },
          }),
          ...(moment(date).hour() > 13 && moment(date).hour() <=18  && {
            style: {
              backgroundColor: '#4fa887',
              color: 'white',
            },
          }),
          ...(moment(date).hour() === 13 && moment(date).hour() <=14  && {
            style: {
              backgroundColor: '#333',
              color: 'white',
            },
          }),
        }),
        []
      )
      const handleSelectEvent = useCallback(
        (event) =>  {

          show_alerta('', '', '', `
         <div  class="flex justify-center items-center">
         <img src="Logo.png" width="130" />
         </div> 
          <h4 class="font-bold">${(event.title)}</h4> 
         <span>${moment(event.start).format("HH:mm") > '12:00' ? 'Empieza despues de medio dia' : 'Inicia en la mañana'}</span>
         <br>
          <span class="font-bold">Inicio:<span class="text-red-600"> ${moment(event.start).format('LLLL')}</span></span> 
          <br>
          <span class="font-bold">Finaliza:<span class="text-green-600"> ${moment(event.end).format('LLLL')}</span></span> 
          `)

        } ,
        
        []
      )

      
        const eventPropGetter = useCallback(
          
          (event, start, end, isSelected) => ({
           
            ...(isSelected && {
              
              style: {
                backgroundColor: '#020069',
                color: "white"
              },
            }),
            ...(moment(start).format("HH:mm") > '12:00' && {
              className: 'bg-lime-500 text-white',
              
            }),
            ...((moment(start).format("HH:mm") <= '12:00') && {
              className: 'bg-gray-600 text-white',
              
            }),
            ...(event.title.includes('Cumpleaños') && {
              className: 'bg-indigo-600 text-white',
            }),
            ...(event.title.includes('Evento') && {
              className: 'bg-red-600 text-white',
            }),
  
          }
          ),
          []
    
        )
      // const handleSelectSlot = useCallback(
      //   ({ start, end }) => {
      //     const title = window.prompt('Nueva agenda')
      //     if (title) {
      //       setNewEvent({ ...newEvent, title, start, end })}
            
      //       document.querySelector("#inicio").value = '2023';
      //     },
        
      //   [setNewEvent]
      // )
     
    //  const diasM = document.querySelectorAll("[role=columnheader]");
    // const diaHoy = document.querySelector("#root > div > div.App.mx-5.text-center > div > div.rbc-month-view > div:nth-child(6) > div.rbc-row-bg > div.rbc-day-bg.rbc-today");
 
    // function actualizarCalendario() {
    //    const dias = {days: "domingo_lunes_martes_miercoles_jueves_viernes_sabado".split("_")}
    //    const semana = document.querySelectorAll("[role=columnheader]");

    //    const meses = {months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_")}
    //     setTimeout(() => {
    //       for (let index = 0; index < semana.length; index++) {
    //        semana[index].textContent = dias.days[index]
    //       }
    //       // for (let index = 0; index < meses.length; index++) {
    //       //  semana[index].textContent = dias.days[index]
    //       // }
    //       diaHoy.classList.add("bg-indigo-400", "border-3")
    //     }, 100);
    //  }
   
  return (
    <>
        
        
        
         <div className="App mx-2 text-center "    >
          
<div className="flex justify-center gap-2">

                <form target="dummyframe" onSubmit={handleSubmit} className='calendario grid  justify-center items-center '  >
        <div>
            <label htmlFor="titulo" className=" mb-2 text-sm font-medium text-gray-900 ">Titulo de la agenda</label>
            <input type="text" placeholder="Titulo" id="titulo"  value={titulo} onChange={(e) => setTitulo(e.target.value)}   className="bg-gray-100 border border-gray-300 text-black text-center  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 " required />
        </div>
    <div className=" flex justify-center gap-5">
        <div>
            <label htmlFor="inicio" className=" mb-2 mt-1 text-sm font-medium text-gray-900 ">Inicia</label>
            <input type="datetime-local" id="inicio"     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full text-center p-2.5  dark:border-gray-600  " placeholder="Inicio" required  value={inicio} onChange={(e) => setInicio(e.target.value)}    />
        </div>
        <div>
            <label htmlFor="finaliza" className=" mb-2 mt-1 text-sm font-medium text-gray-900">Finaliza</label>
            <input  type="datetime-local" id="finaliza"   className="bg-gray-50 border  border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full text-center p-2.5  dark:border-gray-600  " placeholder="Finaliza" required  value={finaliza} onChange={(e) => setFinaliza(e.target.value)}  />
        </div>

     </div>
      <input type="submit" className='  bg-indigo-700 p-2 mt-2 font-bold  rounded-3 text-white'  onClick={handleAddEvent} value={'Añadir agenda'}  />
    </form>
    <button onClick={() => handleResultados()}  className="text-white font-bold  bg-sky-600 rounded-md mt-2 p-2 ">Recargar datos</button>
</div>

           
            <Calendar 
             messages={{
              next: "siguiente",
              previous: "anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              agenda: 'Agenda',
              work_week: 'Semana de trabajo',
              day: "Día",
              allDay: 'Todo el dia',
              date: 'Fecha',
              time: 'Hora',
              event: 'Descripcion de la agenda',
              noEventsInRange: 'No hay nuevos eventos en este rango',
              showMore: (total) => `+${total} más`,
            }}
      
            localizer={localizer}  eventPropGetter={eventPropGetter}  selectable onSelectEvent={handleSelectEvent}  titleAccessor={"title"} doShowMoreDrillDown={"Agenda"} slotPropGetter={slotPropGetter} popup="true" popupOffset={10} formats={"es"}  events={todos} className=' font-bold relative mt-2  shadow-lg  rounded-md' style={{ height: 500 , padding: 20, textAlign: 'center' }}/>
        </div>
        {
        msg &&  <Alerta 
          alerta={alerta}
        />
       }
    </>
  )
}

export default CalendarioAgendas