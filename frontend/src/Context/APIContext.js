import { useContext, createContext, useState } from "react";
import Axios from "../../src/api/Axios";
import * as APIComponents from "../component/APIComponents/APIComponents";

// Created APIContext for API using createContext()
const APIContext = createContext();

// Using APIContext
export const useAPIContext = () => useContext(APIContext);

export const APIProvider = ({ children }) => {
  const [components, setComponents] = useState(APIComponents);
  // const { employeeData, SetEmployeeData } = useState([]);

  const registerComponent = (name, component) => {
    setComponents((prev) => ({ ...prev, [name]: component }));
  };

  const EmployeeMasterDetailsAPI = async () => {
    try {
      const result = await Axios.get("./employeedetails");
      // console.log("result.data:- ", result.data);
      // SetEmployeeData(result.data);
      return result.data;
    } catch (err) {
      return err;
    }
  };

  return (
    <APIContext.Provider
      value={{
        components,
        registerComponent,
        EmployeeMasterDetailsAPI,
        // employeeData,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
