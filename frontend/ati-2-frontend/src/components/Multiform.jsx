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
        }
        else if(currentStage == 3){
            const email = registerFormState.phase[3].correo
            const password = registerFormState.phase[3].clave

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
                        registerFormState.errors[3].invalid_stage = true
                        registerFormState.errors[3].invalid_mail = true
                        return false
                    } else{
                        registerFormState.errors[3].invalid_mail = false
                    }
                } catch (error) {
                    registerFormState.errors[3].invalid_stage = true
                    registerFormState.errors[3].invalid_mail = true
                    return false
                }
            } else {
                registerFormState.errors[3].invalid_stage = true
                registerFormState.errors[3].invalid_mail = true
                return false
            }

            if(!validPassword(password)){
                registerFormState.errors[3].invalid_stage = true
                registerFormState.errors[3].invalid_password = true
                return false
            } else {
                registerFormState.errors[3].invalid_password = false
            }
            return true
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
                        console.log(registerFormState.errors[3].invalid_stage)
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