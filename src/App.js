import React, { useState, createRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

// import "./styles.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"

export  default function DemoApp() {
  const calendarComponentRef = createRef()

  const [calendarWeekends, setCalendarWeekends] = useState(true)
  const [calendarEvents, setCalendarEvents] = useState([])

  const toggleWeekends = () => {
    setCalendarWeekends(!calendarWeekends)
  }

  const gotoPast = () => {
    let calendarApi = calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2019-11-11')
  }

  const handleDateClick = arg => {
    if (window.confirm('Would you like to add an event to' + arg.dateStr + '?')) {
      let copyCalendarEvents = calendarEvents
      const newEvent = {
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      }
      
      copyCalendarEvents.push(newEvent)

      console.log(copyCalendarEvents)
    }
  }

  console.log(setCalendarEvents)

  return (
    <div className="demo-app">
      <div className="demo-app-top">
        <button onClick={toggleWeekends}>Toggle weekends</button>
        <button onClick={gotoPast}>Go to a date in the past</button>
        <p>Also, click a date/time to add an event</p>
      </div>
      <div className="demo-app-calendar">
        <FullCalendar 
          defaultView="dayGridMonth"
          header={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth, timeGridWeek, timeGridDay, listWeek"
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          weekends={calendarWeekends}
          events={calendarEvents}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  )
}


// export default class DemoApp extends React.Component {
//   calendarComponentRef = React.createRef();

//   state = {
//     calendarWeekends: true,
//     calendarEvents: [
//       // initial event data
//       { title: "Event Now", start: new Date() }
//     ]
//   };

//   render() {
//     return (
//       <div className="demo-app">
//         <div className="demo-app-top">
//           <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
//           <button onClick={this.gotoPast}>go to a date in the past</button>
//           &nbsp; (also, click a date/time to add an event)
//         </div>
//         <div className="demo-app-calendar">
//           <FullCalendar
//             defaultView="dayGridMonth"
//             header={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
//             }}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             ref={this.calendarComponentRef}
//             weekends={this.state.calendarWeekends}
//             events={this.state.calendarEvents}
//             dateClick={this.handleDateClick}
//           />
//         </div>
//       </div>
//     );
//   }

//   toggleWeekends = () => {
//     this.setState({
//       // update a property
//       calendarWeekends: !this.state.calendarWeekends
//     });
//   };

//   gotoPast = () => {
//     let calendarApi = this.calendarComponentRef.current.getApi();
//     calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
//   };

//   handleDateClick = arg => {
//     if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
//       this.setState({
//         // add new event data
//         calendarEvents: this.state.calendarEvents.concat({
//           // creates a new array
//           title: "New Event",
//           start: arg.date,
//           allDay: arg.allDay
//         })
//       });
//     }
//   };
// }
