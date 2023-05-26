import services from "../../data/services.json"

export const getServices = () => services.tipos;

export const getMonedas = () => services.monedas;

    // not my fault que esto no tenga sentido
export const getHorario = () => services.dias_semana;

export const getCheckout = () => services.salida_personal;

export const getPaymentFreq = () => services.remuneracion_frecuencia;

export const getAvailability = () => services.disponibilidad;

export const getSortBy = () => services.ordenar_por;

export const getBenefits = () => services.beneficios;

export const getPayment = () => services.remuneracion;