import services from "../../data/services.json"

export const getServices = () => services.tipos;

export const getMonedas = () => services.monedas;

    // not my fault que esto no tenga sentido
export const getHorario = () => services.dias_semana;

export const getCheckout = () => services.salida_personal;

export const getPaymentFreq = () => services.remuneracion_frecuencia;