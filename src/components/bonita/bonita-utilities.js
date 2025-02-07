export default class BonitaUtilities {
  //   #URLPARAMS;
  #TASKINSTANCEID;
  #BONITATOKEN;
  #APIURL;
  #BONITAURL;

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.#TASKINSTANCEID = urlParams.get("id");

    this.#BONITATOKEN = this.#getBonitaToken();
    this.#BONITAURL = "http://localhost:8080/bonita";
    this.#APIURL = `${this.#BONITAURL}/API/bpm`;
  }

  #getBonitaToken() {
    const match = document.cookie.match(/X-Bonita-API-Token=([^;]+)/);
    if (match) {
        console.log("Bonita Token:", match[1]);
        return match[1];
    } else {
        console.error("No se encontró el token de Bonita en las cookies.");
        return null;
    }
}


  async #getCaseId() {
    try {
      const url = `${this.#APIURL}/userTask/${this.#TASKINSTANCEID}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Bonita-API-Token": this.#BONITATOKEN,
        },
      });

      const taskDetails = await this.#manageResponse(response);

      return taskDetails.caseId;
    } catch (error) {
      alert("Error en la solicitud.");
      console.error("Error al obtener el caseId:", error);
    }
  }

  async #manageResponse(response) {
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

  /**
   * @param {Object<string, Object<string, string>>} formData - Datos que se van a enviar al contratos
   */
  async changeTask({ formData = null} = {}) {
    const body = formData ? JSON.stringify(formData) : "{}";

    try {
      const response = await fetch(
        `${this.#APIURL}/userTask/${this.#TASKINSTANCEID}/execution`,
        {
          method: "POST",
          headers: {
            "X-Bonita-API-Token": this.#BONITATOKEN,
            "Content-Type": "application/json",
          },
          body: body,
          credentials: "include",
        }
      );

      // ! DEFINIR SI ES NECESARIO MANEJAR LA RESPUESTA PUESTO QUE NO RETORNA NADA
      const taskDetails = await this.#manageResponse(response);

      alert("Tarea completada exitosamente. Avanzando a la siguiente tarea. por favor recargue la pagina ");
      // this.#refreshList();
    } catch (err) {
      alert("Error en la solicitud.");
      console.error("Error en la solicitud:", err);
      // ! DEFINIR SI AQUÍ ES NECESARIO UNA FUNCIÓN
    }
  }
  
  // #refreshList() {
  //   const taskList = parent.document.querySelector(
  //     "button.TaskList-refresh"
  //   );
  //   if (taskList) {
  //     taskList.click();
  //   } 
  // }
  

  /**
   * @param {...string} businessVariableName - Cadenas de texto que tienen el nombre de cada una de las variables de negocio a ser invocadas
   */
  async getDataFromContract(...businessVariableNames) {
    // ! TOMAR EN CUENTA QUE SI SE QUIERE QUE ESTOS DATOS SEAN MÁS PRIVADOS, DEBERÍA UN MÉTODO PASARSE POR AQUÍ (DEBERÍA HABER UN MÉTODO INTERMEDIO)
    const context = await this.#fetchTaskContext();
    const result = [];
    for (const businessVariableName of businessVariableNames) {
      const data = await this.#loadData(context, businessVariableName);
      result.push(data);      
    }

    return result;
  }

  async #loadData(context, businessVariableName) {
    try { 
      const ref = context[`${businessVariableName}_ref`];

      if (!ref || !ref.link) {
        throw new Error("No se encontró la referencia al solicitante.");
      }

      const response = await fetch(`/bonita/${ref.link}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Bonita-API-Token": this.#BONITATOKEN,
        },
      });

      const data = await this.#manageResponse(response); 
      return data;
    } catch (error) {
      alert("No se encontró la referencia al solicitante.");
      console.error("Error al cargar datos del solicitante: " + error);
    }
  }

  async #fetchTaskContext() {
    try {
      const response = await fetch(
        `${this.#APIURL}/userTask/${this.#TASKINSTANCEID}/context`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": this.#BONITATOKEN,
          },
        }
      );

      const context = await this.#manageResponse(response);
      return context;
    } catch (err) {
      alert("Error en la solicitud");
      console.error("Error en la solicitud:", err);
    }
  }

   /**
    * Esto solo funciona para variables de negocio, y no para contract (tomar en cuenta que las variables de negocio son temporales por lo que su comportamiento varía)
   * @param {...string} businessVariableName - Cadenas de texto que tienen el nombre de cada una de las variables de negocio a ser invocadas
   */
  async setValueVariable(variableName, value) {
    let type = typeof value;
    type = `java.lang.${
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    }`;

    try {
      const response = await fetch(
        `${
          this.#APIURL
        }/caseVariable/${await this.#getCaseId()}/${variableName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Bonita-API-Token": this.#BONITATOKEN,
          },
          body: JSON.stringify({ value: value, type: type }),
        }
      );

      const context =  this.#manageResponse(response);

      return context;
      // ! DEFINIR EN CASO DE QUE SEA NECESARIO UNA FUNCIÓN
    } catch (err) {
      alert("Error en la solicitud");
      console.error("Error en la solicitud:", err);
    }
  }
}
