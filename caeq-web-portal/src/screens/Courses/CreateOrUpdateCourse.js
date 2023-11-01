import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FireError, FireSucess, FireLoading } from "../../utils/alertHandler";
import CourseCard from "../../components/cards/CourseCard";
import TextInput from "../../components/inputs/TextInput/TextInput";
import NumberInput from "../../components/inputs/NumberInput/NumberInput";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import FileInput from "../../components/inputs/FileInput/FileInput";
import DateInput from "../../components/inputs/DateInput/DateInput";
import BaseButton from "../../components/buttons/BaseButton";
import { getCourse } from "../../client/Course/Course.GET";
import createCourse from "../../client/Course/Course.POST";
import updateCourse from "../../client/Course/Course.PATCH";
import { getAllSessions } from "../../client/Course/Session.GET";
import { createSession } from "../../client/Course/Session.POST";
import { updateSession } from "../../client/Course/Session.PATCH";
import { deleteSession } from "../../client/Course/Session.DELETE";
import "./createCourse.scss";

/**
 * Page that if it receives a course id it will display an "Edit" mode
 * and if not, it display a "Create" mode for a course.
 */
const CreateOrUpdateCourse = () => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [sessionSelected, setSessionSelected] = useState({ _id: 1, date: '', time: ''});
    const [sessions, setSessions] = useState([{ _id: 1, date: '', time: ''}]);
    const [data, setData] = useState({
        courseName: '',
        modality: 'Presencial',
        numberHours: 2,
        startDate: '',
        endDate: '',
        schedule: '',
        daysOfSession: '',
        description: '',
        temario: '',
        objective: '',
        place: '',
        includes: '',
        price: 0,
        pricing: 'Gratuito',
        capacity: 10,
        teacherName: '',
        teacherReview: '',
        paymentInfo: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (searchParams.id) {
            getCourse(searchParams.id)
                .then((response) => {
                    if (response.startDate)
                        response.startDate = response.startDate.slice(0, 10);
                    else response.startDate = '';
                    if (response.endDate)
                        response.endDate = response.endDate.slice(0, 10);
                    else response.endDate = '';

                setData(response);
            })
            .catch(() => navigate('/404'));

            getAllSessions(searchParams.id)
            .then(response => {
                setSessions(response);
                if (response.length > 0)
                    setSessionSelected(response[0]);
            });
        }
    }, []);

    /**
     * Updates the state with the given value for the given key
     *
     * @param {string} key - the name of the field to be updated
     * @param {string} value - the new value of the field
     */
    const updateData = (key, value) => {
        setData({ ...data, [key]: value });
    };

    /**
     * Creates or updates whatever is in the data state to the Course model in the backend
     *
     * @param {Event} event - event sent by the triggered element
     */
    const onSubmitCourse = async (event) => {
        event.preventDefault();

        // Validations
        if (data.pricing === 'Gratuito') data.price = 0;
        else if (!data.pricing) {
            FireError('Es necesario declarar si el cursos es gratuito o de paga');
            return;
        }

        if (!data.modality) {
            FireError('Es necesario una modalidad');
            return;
        }

        if (!data.courseName) {
            FireError('Es necesario un nombre para el curso');
            return;
        }

        if (data.courseName.length > 70) {
            FireError('Se acepta un máximo de 70 caracteres para el nombre del curso');
            return;
        }

        if (data.startDate && data.endDate) {
            const startD = new Date(data.startDate);
            const endD = new Date(data.endDate);
            if (endD < startD) {
                FireError('La fecha fin debe de ir después de la fecha de inicio');
                return;
            }
        }

        // Build FormData
        const formData = new FormData();
        Object.entries(data).forEach((entry) => formData.append(entry[0], entry[1]));

        if (image) formData.set('imageUrl', image);

        let response = null;
        const swal = FireLoading('Guardando...');
        try {
            if (searchParams.id) response = await updateCourse(searchParams.id, formData);
            else response = await createCourse(formData);

            if (!response._id) throw 'Error: ' + response;

            swal.close();
            FireSucess('Curso guardado');
            navigate(`/Cursos/Curso/${response._id}`);
        } catch (error) {
            swal.close();
            FireError(error.response.data.message);
        }
    };

    /**
     * Creates a new session or updates an existing one for the course
     * @param {Event} event - event sent by the triggered element
     * @returns
     */
    const onSubmitSession = async (event) => {
        event.preventDefault();
        if (!sessionSelected.date) {
            FireError('Es necesario una fecha válida para la sesión');
            return;
        }
        if (!sessionSelected.time) {
            FireError('Es necesario asignar una hora de inicio para la sesión');
            return;
        }
        if (!sessionSelected._id) {
            console.log('Session doesnt have _id', sessionSelected);
            FireError('Ha ocurrido un error, por favor intente de nuevo');
            return;
        }

        const swal = FireLoading('Guardando...');
        try {
            const courseId = searchParams.id;
            const mode = Number.isInteger(sessionSelected._id) ? 'create' : 'update';
            if (mode === 'create') {
                sessionSelected.course = courseId;
                delete sessionSelected._id;
                const newSession = await createSession(sessionSelected);
                setSessionSelected(newSession);
                setSessions([...sessions.slice(0, sessions.length-1), newSession]);
            }
            else {
                await updateSession(sessionSelected._id, sessionSelected);
            }
            swal.close();
            FireSucess('Sesión guardada');
        } catch (error) {
            swal.close();
            console.log(error);
            FireError(error?.response?.data?.message || error?.message);
        }
    };

    /**
     * Deletes the session selected
     * @param {Event} event - event sent by the triggered element
     * @returns
     */
    const onSubmitDeleteSession = async (event) => {
        event.preventDefault();
        if (!sessionSelected._id) {
            console.log('Session doesnt have _id', sessionSelected);
            FireError('Ha ocurrido un error, por favor intente de nuevo');
            return;
        }

        const swal = FireLoading('Eliminando...');
        try {
            await deleteSession(sessionSelected._id);
            setSessions(sessions.filter(session => session._id !== sessionSelected._id));
            setSessionSelected(sessions[0]);
            swal.close();
            FireSucess('Sesión eliminada');
        } catch (error) {
            swal.close();
            console.log(error);
            FireError(error?.response?.data?.message || error?.message);
        }
    };

    /**
     * 
     * @param {string} key - the name of the field to be updated
     * @param {string} value - the new value of the field
     * @returns
     */
    const onUpdateSession = (key, value) => {
        setSessionSelected({...sessionSelected, [key]: value});
    };

    /**
     * Formats a date string to a more readable format
     * @param {string} dateStr - the date string to be formatted
     * @returns {string} - the formatted date string
     */
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        const formattedMonth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 
                                'Oct', 'Nov', 'Dic'][Number(month)-1];
        return `${day} ${formattedMonth} ${year}`;
    };

    return (
        <div className='create-course'>
            <div className='create-course--row'>
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} curso</h1>
            </div>

            <div className='create-course--row'>
                <div className='create-course--col create-course--mr-3'>
                    <CourseCard showMoreBtn={false} {...data} />
                    <NumberInput
                        label='Capacidad de la sesión'
                        getVal={data.capacity}
                        setVal={(value) => updateData('capacity', value)}
                    />
                    <TextInput
                        label='Nombre del instructor'
                        getVal={data.teacherName}
                        setVal={(value) => updateData('teacherName', value)}
                    />

                    <div className='create-course--form-group'>
                        <label htmlFor='review' className='create-course__label-input'>
                            Reseña del instructor
                        </label>
                        <textarea
                            className='box-input'
                            name='review'
                            value={data.teacherReview}
                            onChange={(e) => updateData('teacherReview', e.target.value)}
                            placeholder='Una breve reseña que describa el contexto del profesor'></textarea>
                    </div>
                    <DropdownInput
                        label='Curso gratuito o pagado'
                        options={['Gratuito', 'Pagado']}
                        getVal={data.pricing}
                        setVal={(value) => updateData('pricing', value)}
                    />
                    {data.pricing === 'Pagado' && (
                        <Fragment>
                            <NumberInput
                                label='Costo del curso'
                                getVal={data.price}
                                setVal={(value) => updateData('price', value)}
                            />
                            <TextInput
                                label='Datos de pago'
                                getVal={data.paymentInfo}
                                setVal={(value) => updateData('paymentInfo', value)}
                                placeholder='Cuenta a dónde hay que hacer el depósito'
                            />
                        </Fragment>
                    )}
                    <div className='create-course--form-group'>
                        <label htmlFor='includes' className='create-course__label-input'>
                            Incluye
                        </label>
                        <textarea
                            className='box-input'
                            name='includes'
                            value={data.includes}
                            onChange={(e) => updateData('includes', e.target.value)}
                            placeholder='Una lista de cosas que incluye el curso'></textarea>
                    </div>
                    <div className='create-course--form-group'>
                        <label htmlFor='temario' className='create-course__label-input'>
                            Temario del curso
                        </label>
                        <textarea
                            className='box-input'
                            name='temario'
                            value={data.temario}
                            onChange={(e) => updateData('temario', e.target.value)}
                            placeholder='El que incluye el curso'></textarea>
                    </div>
                </div>

                <div className='create-course--col'>
                    <TextInput
                        label='Título del curso'
                        getVal={data.courseName}
                        setVal={(value) => updateData('courseName', value)}
                        require
                    />
                    <div className='create-course--form-group'>
                        <label htmlFor='includes' className='create-course__label-input'>
                            Descripción general del curso
                        </label>
                        <textarea
                            className='box-input'
                            name='description'
                            value={data.description}
                            onChange={(e) =>
                                updateData('description', e.target.value)
                            }></textarea>
                    </div>
                    <DropdownInput
                        label='Modalidad'
                        options={['Presencial', 'Remoto']}
                        getVal={data.modality}
                        setVal={(value) => updateData('modality', value)}
                    />
                    <TextInput
                        label='Lugar de la clase'
                        getVal={data.place}
                        setVal={(value) => updateData('place', value)}
                        placeholder='Edificio y salón o link de Zoom'
                    />
                    <NumberInput
                        label='Horas que se acreditan'
                        getVal={data.numberHours}
                        setVal={(value) => updateData('numberHours', value)}
                    />
                    <div className='create-course--form-group'>
                        <label htmlFor='startDate' className='create-course__label-input'>
                            Fecha de inicio
                        </label>
                        <input
                            name='startDate'
                            className='date-input'
                            value={data.startDate}
                            type='date'
                            onChange={(e) => updateData('startDate', e.target.value)}
                        />
                    </div>
                    <div className='create-course--form-group'>
                        <label htmlFor='endDate' className='create-course__label-input'>
                            Fecha de finalización
                        </label>
                        <input
                            name='endDate'
                            className='date-input'
                            value={data.endDate}
                            type='date'
                            onChange={(e) => updateData('endDate', e.target.value)}
                        />
                    </div>
                    <TextInput
                        label='Días de la sesión'
                        getVal={data.daysOfSession}
                        setVal={(value) => updateData('daysOfSession', value)}
                        placeholder='LU-MI-VI'
                    />
                    <TextInput
                        label='Horario'
                        getVal={data.schedule}
                        setVal={(value) => updateData('schedule', value)}
                        placeholder='5:00PM a 6:00pm'
                    />
                    <div className='create-course--form-group'>
                        <label htmlFor='objective' className='create-course__label-input'>
                            Objetivos del curso
                        </label>
                        <textarea
                            className='box-input'
                            name='objective'
                            value={data.objective}
                            onChange={(e) => updateData('objective', e.target.value)}
                            placeholder='Una lista de objectivos que incluye el curso'></textarea>
                    </div>
                    <FileInput
                        label='Portada del curso (en formato vertical)'
                        accept='.png'
                        getVal={image}
                        setVal={setImage}
                    />

                    <BaseButton type="primary" onClick={e => onSubmitCourse(e)}>
                        {searchParams.id ? 'Guardar curso' : 'Crear curso'}
                    </BaseButton>
                </div>
            </div>

            <div className="create-course--row">
                <div className="create-course--col">
                    <h1>Sesiones</h1>
                    <div className="create-course--col create-course__sessions-table">
                        <ul className="create-course__sessions-table__header">
                            { sessions.map((session, i) => (
                                <li className={sessionSelected._id === session._id && 'session--selected'} 
                                    onClick={() => setSessionSelected(session)}
                                    key={i}>
                                    {session.date
                                        ? formatDate(session.date.slice(0, 10))
                                        : `Sesión ${i+1} (sin guardar)`
                                    }
                                </li>
                            ))}
                            { sessions.length === 0 && 
                                <li className="session--selected">Sessión 1 (no guardada)</li>
                            }
                            { sessions.length > 0 &&
                                <li className="create-course__sessions__add"
                                    onClick={() => {
                                        setSessions([...sessions, 
                                            { 
                                                _id: sessions.length, 
                                                date: '', 
                                                time: data.schedule 
                                            }]);
                                    }}
                                    ><div>+</div>
                                </li>
                            }
                        </ul>
                        <div className="create-course--row create-course__sessions-table__body">
                            <DateInput 
                                label="Fecha de la sesión" 
                                getVal={sessionSelected?.date?.slice(0, 10)}
                                setVal={val => onUpdateSession('date', val)} />
                            <TextInput 
                                label="Hora de incio" 
                                getVal={sessionSelected.time}
                                setVal={val => onUpdateSession('time', val)} 
                                placeholder="14:00 hrs"/>
                            <BaseButton type="primary" onClick={onSubmitSession}>Guardar</BaseButton>
                            <BaseButton type="fail" onClick={onSubmitDeleteSession}>Eliminar</BaseButton>
                        </div>
                        <div className="create-course__sessions-table__content">
                            <span>Lista de asistencia de los inscritos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrUpdateCourse;
