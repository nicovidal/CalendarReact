import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

//para que se sobreponga ante todo
Modal.setAppElement('#root');



export const CalendarModal = () => {

    const {isDateModalOpen,closeDateModal}=useUiStore();

    const {activeEvent,startSavingEvent}=useCalendarStore();

    const [formSumbitted, setFormSumbitted] = useState(false)
   /*  const [isOpen, setIsOpen] = useState(true); */
 

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });


    const titleClass = useMemo(() => { 
        if(!formSumbitted)return '';
        return(formValues.title.length>0)
        ?''
        :'is-invalid';


    }, [formValues.title, formSumbitted]);


    useEffect(() => {
        if(activeEvent !== null){
            setFormValues({...activeEvent});
        }
        
    }, [activeEvent])
    

    const onInputChanged = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSumbitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start)
        /* console.log({difference}) */
        //validator if dates exist
        if (isNaN(difference) || difference <= 0) {
            /* console.log('Error en fechas') */
            Swal.fire('Fechas incorrectas', 'Revisar fechas ingresadas', 'Error')
            return;
        }

        if (formValues.title.length <= 0) return;

        console.log(formValues);
        //TODO:
        //cerrar modal , remover
        await startSavingEvent(formValues);
        closeDateModal();
        setFormSumbitted(false);

    }


    const onCloseModal = () => {
        /* console.log('cerrando modal') */
        closeDateModal();

        /* setIsOpen(false); */

    }

    const onDateChanged = (event, changing) => {

        setFormValues({
            ...formValues,
            [changing]: event,
        })


    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}

        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker selected={formValues.start}
                        minDate={formValues.start}
                        locale="es"
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        timeCaption="Hora"
                        onChange={(event) => onDateChanged(event, 'start')}

                    />


                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker selected={formValues.end}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        onChange={(event) => onDateChanged(event, 'end')}

                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input

                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
