// src/bonita/bonita-utilities.ts
import { TaskDetails, BonitaContext, FormDataContract, VariableValue } from '../../interfaces/bonita.interface';

export class BonitaUtilities {
  #TASKINSTANCEID: string | null;
  #BONITATOKEN: string | null;
  #APIURL: string;
  #BONITAURL: string;

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.#TASKINSTANCEID = urlParams.get("id");
    this.#BONITATOKEN = this.getBonitaToken();
    this.#BONITAURL = "http://localhost:48615/bonita";
    this.#APIURL = `${this.#BONITAURL}/API/bpm`;
  }

  getBonitaToken(): string | null {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("X-Bonita-API-Token="))
      ?.split("=")[1] || null;
  }

  async #getCaseId(): Promise<string> {
    try {
      const url = `${this.#APIURL}/userTask/${this.#TASKINSTANCEID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Bonita-API-Token": this.#BONITATOKEN || '',
        },
      });

      const taskDetails = await this.#manageResponse(response) as TaskDetails;
      return taskDetails.caseId;
    } catch (error) {
      alert("Error en la solicitud.");
      console.error("Error al obtener el caseId:", error);
      throw error;
    }
  }

  async #manageResponse(response: Response): Promise<any> {
    const context =
      response.ok &&
      response.status !== 204 &&
      response.headers.get("Content-Length") !== "0"
        ? await response.json()
        : null;

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${
          context ? JSON.stringify(context) : response.statusText
        }`
      );
    }

    return context;
  }

  async changeTask({ formData = null }: { formData?: FormDataContract | null } = {}): Promise<void> {
    const body = formData ? JSON.stringify(formData) : "{}";

    try {
      const response = await fetch(
        `${this.#APIURL}/userTask/${this.#TASKINSTANCEID}/execution`,
        {
          method: "POST",
          headers: {
            "X-Bonita-API-Token": this.#BONITATOKEN || '',
            "Content-Type": "application/json",
          },
          body: body,
          credentials: "include",
        }
      );

      await this.#manageResponse(response);
      alert("Tarea completada exitosamente. Avanzando a la siguiente tarea. por favor recargue la pagina");
    } catch (err) {
      alert("Error en la solicitud.");
      console.error("Error en la solicitud:", err);
    }
  }

  async getDataFromContract(...businessVariableNames: string[]): Promise<any[]> {
    const context = await this.#fetchTaskContext();
    const result: any[] = [];
    for (const businessVariableName of businessVariableNames) {
      const data = await this.#loadData(context, businessVariableName);
      result.push(data);
    }
    return result;
  }

  async #loadData(context: BonitaContext, businessVariableName: string): Promise<any> {
    try {
      const ref = context[`${businessVariableName}_ref`];

      if (!ref || !ref.link) {
        throw new Error("No se encontró la referencia al solicitante.");
      }

      const response = await fetch(`/bonita/${ref.link}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Bonita-API-Token": this.#BONITATOKEN || '',
        },
      });

      const data = await this.#manageResponse(response);
      return data;
    } catch (error) {
      alert("No se encontró la referencia al solicitante.");
      console.error("Error al cargar datos del solicitante: " + error);
      throw error;
    }
  }

  async #fetchTaskContext(): Promise<BonitaContext> {
    try {
      const response = await fetch(
        `${this.#APIURL}/userTask/${this.#TASKINSTANCEID}/context`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": this.#BONITATOKEN || '',
          },
        }
      );

      const context = await this.#manageResponse(response);
      return context;
    } catch (err) {
      alert("Error en la solicitud");
      console.error("Error en la solicitud:", err);
      throw err;
    }
  }

  async setValueVariable(variableName: string, value: any): Promise<any> {
    // Mapeo de tipos de JavaScript a tipos de Java
    const javaTypeMap: Record<string, string> = {
      string: "java.lang.String",
      number: "java.lang.Integer", // O "java.lang.Double" si necesitas decimales
      boolean: "java.lang.Boolean",
      object: "java.lang.Object",
    };
  
    // Obtener el tipo de Java correspondiente
    const type = typeof value;
    const javaType = javaTypeMap[type] || "java.lang.Object";
  
    try {
      const response = await fetch(
        `${this.#APIURL}/caseVariable/${await this.#getCaseId()}/${variableName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": this.#BONITATOKEN || '',
          },
          body: JSON.stringify({ value: value, type: javaType } as VariableValue),
        }
      );
  
      const context = await this.#manageResponse(response);
      return context;
    } catch (err) {
      alert("Error en la solicitud");
      console.error("Error en la solicitud:", err);
      throw err;
    }
  }
}

export default BonitaUtilities;