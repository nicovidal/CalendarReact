import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from '../../helpers';
import { NavBar } from "../components/NavBar"
import { addHours } from 'date-fns';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useCalendarStore, useUiStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';



/* const events = [{
  title: 'Cumple del xd',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Nico'
  }
}]
 */
export const CalendarPage = () => {

  const {openDateModal}=useUiStore();
  
  const {events,setActiveEvent}=useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'week')


  const eventStyleGetter = (event, start, end, isSelected) => {

    /* console.log({event,start,end,isSelected}) */

    const style = {
      backGroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'

    }

    return {
      style
    }


  }

  const onDoubleClick = (event) => {
    /* console.log({ doubleClick: event }) */
    openDateModal();
  }
  const onSelect = (event) => {
    /* console.log({ click: event }) */
    setActiveEvent(event);
  }
  const onViewChanged = (event) => {
    /* console.log({ viewChanged: event }) */
    localStorage.setItem('lastView',event)
    /* setLastView(event); */
  }

  return (
    <>
      <NavBar />
      <Calendar
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        defaultView={lastView}
        eventPropGetter={eventStyleGetter}
        messages={getMessagesEs()}
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
      />
    <CalendarModal/>
    <FabAddNew/>
    <FabDelete/>

    </>
  )
}
