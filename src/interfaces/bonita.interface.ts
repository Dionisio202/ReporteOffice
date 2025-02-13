export interface TaskDetails {
    caseId: string;
    [key: string]: any;
  }
  
  export interface BonitaContext {
    [key: string]: {
      link?: string;
      [key: string]: any;
    };
  }
  
  export interface FormDataContract {
    [key: string]: {
      [key: string]: string;
    };
  }
  
  export interface VariableValue {
    value: any;
    type: string;
  }