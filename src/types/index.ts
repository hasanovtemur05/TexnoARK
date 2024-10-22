export interface ParamsType {
    search: string;
    page: number;
    limit: number;
}

export interface ModalPropType {
    open: boolean
    handleClose: ()=> void
    update?: any
    onSubmit?: (values: any) => void;
    
}