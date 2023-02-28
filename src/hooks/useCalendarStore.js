import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

  const dispatch=useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent=(calendarEvent)=>{
    dispatch(onSetActiveEvent(calendarEvent))

  }

  //algo parecido a un thunk
  const startSavingEvent=async(calendarEvent)=>{
    //TODO:LLEGAR AL BACKEND
    //todo ok!


    try{

      if(calendarEvent.id){

        //actualizando endpoint
        await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent);
  
  
        dispatch(onUpdateEvent({...calendarEvent,user}))
        return;
      }
        //creando
        const {data}=await calendarApi.post('/events',calendarEvent);
         console.log({data}) 
          /* dispatch(onAddNewEvent({...calendarEvent,id:new Date().getItem})); */
        
        dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id ,user}));
  


    }catch(error){

      console.log(error);
      Swal.fire('Error al guardar',error.response.data.msg,'error')

    }



     
    
  }

  const startDeletingEvent=async()=>{
    //TODO:LLEGAR AL BACK END
    try{

      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());

    }catch(error){
      console.log(error);
      Swal.fire('Error al eliminar',error.response.data.msg,'error')



    }
    



   
  }


  const startLoadingEvents=async ()=>{
    try{

      const {data}=await calendarApi.get('/events')
      /* console.log({data}) */
      const events=convertEventsToDateEvents(data.eventos);
      /* console.log(events); */
      dispatch(onLoadEvents(events));

    }catch(error){
      console.log('Error cargando eventos')
      console.log(error)

    }
  }

  return {
    //propertis
    events,
    activeEvent,
    hasEventSelected:!!activeEvent,

    //metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
