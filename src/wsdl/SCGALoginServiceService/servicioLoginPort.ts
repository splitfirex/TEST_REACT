/* tslint:disable:max-line-length no-empty-interface */
export interface ILoginInput {
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:string(undefined) */
    nombreUsuario: string;
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:string(undefined) */
    contrasenha: string;
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:int(undefined) */
    idSalaFormacion: number;
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:string(undefined) */
    nombrePuesto: string;
}

export interface ILoginOutput {
    login: servicioLoginPortTypes.Ilogin;
}

export interface ISalirSesionInput {
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:int(undefined) */
    nombreUsuario: number;
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:int(undefined) */
    idSalaFormacion: number;
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:string(undefined) */
    nombrePuesto: string;
}

export interface ISalirSesionOutput {}

export interface IPingInput {}

export interface IPingOutput {
    /** http://login.servicios.wsproxies.sct.adif.es/#xs:boolean(undefined) */
    ping: boolean;
}

export interface IservicioLoginPortSoap {
    Login: (input: ILoginInput, cb: (err: any | null, result: ILoginOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    SalirSesion: (input: ISalirSesionInput, cb: (err: any | null, result: ISalirSesionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    Ping: (input: IPingInput, cb: (err: any | null, result: IPingOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace servicioLoginPortTypes {
    export interface IrolesUsuario {}
    export interface Ilogin {
        rolesUsuario: servicioLoginPortTypes.IrolesUsuario[];
    }
}
