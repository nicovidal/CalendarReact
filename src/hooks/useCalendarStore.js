import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

  const dispatch=useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent=(calendarEvent)=>{
    dispatch(onSetActiveEvent(calendarEvent))

  }

  //algo parecido a un thunk
  const startSavingEvent=async(calendarEvent)=>{
    //TODO:LLEGAR AL BACKEND


    //todo ok!
    if(calendarEvent._id){
      dispatch(onUpdateEvent({...calendarEvent}))
    }else{
      dispatch(onAddNewEvent({...calendarEvent,id:new Date().getItem}));
    }
  }

  const startDeletingEvent=()=>{
    //TODO:LLEGAR AL BACK END
    dispatch(onDeleteEvent());
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
  };
};
