import { useContext, useEffect, useState } from "react";
import { RegisterFormContext } from "../context/RegisterFormContext";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import validator from "validator";
import { getAllCountries, getCitiesInCountry} from "../components/dataFetchers/PaisDataFetcher";

import "../styles/Multiform.scss"

export const Multiform = ({stages, SubmitButton, cancelEvent, stagesNames }) => {
    
    // hook para la internacionalizacion
    const { t } = useTranslation();

    // indice del stage que se muestra actualmente
    const [currentStage, setCurrentStage] = useState(0);
    // stages por los que ya ha pasado el usuario
    const [stagesDone, setStagesDone] = useState(0);

    // pointer al stage que se muestra actualmente
    const RenderStage = stages[currentStage];

    const {registerFormState, setRegisterFormState} = useContext(RegisterFormContext);

    useEffect(() => {
        const fetchCountries = async () => {
            const [names, codes] = await getAllCountries();
            const pairs = names.map((name, index) => {
                return {
                    "name": name, 
                    "code": codes[index]
                }
            })
            registerFormState.countries = pairs;
        };

        const fetchBanks= async () => {
            const { data } = await axios.get('http://127.0.0.1:8000/banks/'); 
            registerFormState.banks = data; 
        }

        fetchCountries()
        
        fetchBanks()
    }, [])

    const stageIsValid = async () => {
        const uniqueEmail = async (email) => {
            const data = await axios.post(
                'http://127.0.0.1:8000/users/unique_email/',
                {"email": email }
            ); 
            console.log(data)
            return true
        }

        const stringIsValid = (string) => {
            if(string.length < 2){
                return false
            }
            const regex = new RegExp('^[a-zA-Z]')    
            return regex.test(string);
        }

        const idIsValid = (string) => {
            if(string.length < 5){
                return false
            }
            const regex = new RegExp('^[0-9a-zA-Z]')    
            return regex.test(string);
        }

        if(currentStage == 0){
            const selection = registerFormState.phase[0]

            if(!selection.website && !selection.social_network && !selection.friends && !selection.other){
                // No se seleccionó nada
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].option_required = true;
                return false
            } else if((selection.social_network_other && ! selection.social_network_other_spec) 
                    || (selection.other_other && !selection.other_other_spec) || (selection.radio && !selection.radio_spec) || (selection.press && !selection.press_spec)){
                // Se seleccionó un campo a especificar, pero no se escribió nada
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].other_empty = true
                return false
            } else if (selection.social_network && !selection.facebook 
                && !selection.twitter && !selection.instagram && !selection.social_network_other ){
                // Se seleccionó "Redes sociales", pero no se selecciono una red social
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].social_required = true 
                return false 
            } else if (selection.other && !selection.radio && !selection.press && !selection.other_other){
                // Se seleccionó un "Otro", pero no se selecciono una opcion
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                registerFormState.errors[0].other_required = true 
                return false 
            }
             else {
                registerFormState.errors[0] = Object.values(registerFormState.errors[0]).map(() => false)
                return true
            }
        } else if(currentStage == 1){
            const selection = registerFormState.phase[1]
            const type = selection.tipo_usuario
            let valid = true
            
            if(type === "natural"){
                const user = selection.natural

                // Validar nombre
                if(!user.nombre){
                    registerFormState.errors[1].name_required = true
                    registerFormState.errors[1].name_invalid = false
                    valid = false
                } else if (!stringIsValid(user.nombre)) {
                    registerFormState.errors[1].name_required = false
                    registerFormState.errors[1].name_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].name_required = false
                    registerFormState.errors[1].name_invalid = false
                }

                // Validar apellido
                if(!user.apellido){
                    registerFormState.errors[1].last_name_required = true
                    registerFormState.errors[1].last_name_invalid = false
                    valid = false
                } else if (!stringIsValid(user.apellido)) {
                    registerFormState.errors[1].last_name_required = false
                    registerFormState.errors[1].last_name_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].last_name_required = false
                    registerFormState.errors[1].last_name_invalid = false
                }
                
                //Validar id
                if(!user.identificacion){
                    registerFormState.errors[1].id_required = true
                    registerFormState.errors[1].id_invalid = false
                    valid = false
                } else if (!idIsValid(user.identificacion)) {
                    registerFormState.errors[1].id_required = false
                    registerFormState.errors[1].id_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].id_required = false
                    registerFormState.errors[1].id_invalid = false
                }

                // Validar email
                if(!user.correo){
                    registerFormState.errors[1].email_required = true
                    registerFormState.errors[1].email_invalid = false
                    valid = false
                } else if(!validator.isEmail(user.correo)){
                    registerFormState.errors[1].email_required = false
                    registerFormState.errors[1].email_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].email_required = false
                    registerFormState.errors[1].email_invalid = false
                }
            }
            
            else if(type === "enterprise"){
                const user = selection.empresa

                // Validar nombre de empresa
                if(!user.nombre_empresa){
                    registerFormState.errors[1].business_required = true
                    registerFormState.errors[1].business_invalid = false
                    valid = false
                } else if (!stringIsValid(user.nombre_empresa)) {
                    registerFormState.errors[1].business_required = false
                    registerFormState.errors[1].business_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].business_required = false
                    registerFormState.errors[1].business_invalid = false
                }

                // Validar rif
                if(!user.razon_rif){
                    registerFormState.errors[1].rif_required = true
                    registerFormState.errors[1].rif_invalid = false
                    valid = false
                } else if (!stringIsValid(user.razon_rif)) {
                    registerFormState.errors[1].rif_required= false
                    registerFormState.errors[1].rif_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].rif_required = false
                    registerFormState.errors[1].rif_invalid = false
                }
                
                //Validar address
                if(!user.direccion){
                    registerFormState.errors[1].address_required = true
                    valid = false
                } else {
                    registerFormState.errors[1].address_required = false
                }

                // Validar nombre representante
                if(!user.nombre_representante){
                    registerFormState.errors[1].rep_name_required = true
                    registerFormState.errors[1].rep_name_invalid= false
                    valid = false
                } else if(!stringIsValid(user.nombre_representante)){
                    registerFormState.errors[1].rep_name_required = false
                    registerFormState.errors[1].rep_name_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].rep_name_required = false
                    registerFormState.errors[1].rep_name_invalid = false
                }

                // Validar email representante
                if(!user.correo){
                    registerFormState.errors[1].rep_email_required = true
                    registerFormState.errors[1].rep_email_invalid= false
                    valid = false
                } else if(!validator.isEmail(user.correo)){
                    registerFormState.errors[1].rep_email_required = false
                    registerFormState.errors[1].rep_email_invalid = true
                    valid = false
                } else {
                    registerFormState.errors[1].rep_email_required = false
                    registerFormState.errors[1].rep_email_invalid = false
                }
            }
        
            return valid 
        } else if(currentStage == 2){
            const selection = registerFormState.phase[2]
            if(!selection.idioma){
                registerFormState.errors[2].option_required = true
                return false
            }
            registerFormState.errors[2].option_required = false
            return true
        }
        else if(currentStage == 3){
            const email = registerFormState.phase[3].correo
            const password = registerFormState.phase[3].clave
            let valid = true

            const validPassword = (password) =>{
                if(password.length > 5)
                    return true
                else 
                    return false
            }

            if(validator.isEmail(email)){
                try{
                    const unique = await uniqueEmail(email)
                    if(!unique){
                        registerFormState.errors[3].invalid_mail = true
                        valid = false
                    } else{
                        registerFormState.errors[3].invalid_mail = false
                    }
                } catch (error) {
                    registerFormState.errors[3].invalid_mail = true
                    valid = false
                }
            } else {
                registerFormState.errors[3].invalid_mail = true
                valid = false
            }

            if(!validPassword(password)){
                registerFormState.errors[3].invalid_password = true
                valid = false
            } else {
                registerFormState.errors[3].invalid_password = false
            }
            return valid
        }
    }

    return (
        <div className="multiform">

            <div className="fases-grid">
                {
                    // listar todos los stages (los botones verdes y grises)
                    stages.map((stage, i) => {
                        return(
                            <button
                                key={'boton_form_stage_'+i}

                                // checkear el color de la fase listada (verde o gris)
                                className={`fase ${i>stagesDone? "inactive":""} ${i==currentStage? "current":""}`}
                                
                                // dar click en cada boton me lleva al respectivo stage (si ya pasé por ahí)
                                onClick={() => {
                                    if( i<=stagesDone )
                                        setCurrentStage((prev) => i);
                                }}
                            >
                                {(i+1)+"- "+stagesNames[i]}
                            </button>
                        );
                    })
                }
            </div>

            {/* stage actual */}
            <div className="fase-actual">

                {/* Devolverse al stage anterior */}
                <button 
                    className={`${currentStage <= 0?"ghost":""}`}
                    onClick={() => {
                        if(currentStage > 0)
                            setCurrentStage((prev) => prev-1);
                    }}
                >
                    ← {t('multiform.atras')}
                </button>
                
                {/* nombre del stage actual */}
                <span>
                    {stagesNames[currentStage]}
                </span>

                {/* ir al siguiente stage */}
                <button 
                    className={`${currentStage === stages.length-1?"ghost":""}`}
                    onClick={async () => {
                        const valid = await stageIsValid()
                        if(valid){
                            setRegisterFormState( prev => {
                                const newState = {... prev};
                                newState.errors[currentStage].invalid_stage = false;
                                return newState;
                            } );

                            if(currentStage+1 < stages.length){
                                setCurrentStage((prev) => prev+1);
                                if( currentStage >= stagesDone )
                                    setStagesDone((prev) => prev+1);
                            }
                        } else {
                            setRegisterFormState( prev => {
                                const newState = {... prev};
                                newState.errors[currentStage].invalid_stage = true;
                                return newState;
                            } );
                        }
                    }}
                >
                    {t('multiform.continuar')} →
                </button>
            
            </div>
            
            {/* renderizar stage actual */}
            <form>
                <RenderStage/>
            </form>

            <div id="botones">

                {/* boton de cancelar */}
                <button
                    id="boton_cancelar"
                    onClick={ cancelEvent }
                    >
                    {t('multiform.cancelar')}
                </button>
                
                {/* boton de submit */}
                {
                    currentStage == stages.length-1?
                        <SubmitButton/>
                    :""
                }

            </div>

        </div>

    )

};