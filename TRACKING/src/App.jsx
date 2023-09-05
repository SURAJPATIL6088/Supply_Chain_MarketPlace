import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";

// INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "./Components/index";

import { TrackingContext } from "./Context/Tracking";

const App = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  // state variable
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);

  // data state
  const [allShipmentsdata, setAllShipentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setAllShipentsdata(allData);
    };
  }, []);

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModel={setCompleteModel}
        setGetModel={setGetModel}
        setStartModel={setStartModel}
      />

      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />

      <Form 
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile 
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />

      <CompleteShipment 
        completeModel={completeModel}
        setCompleteModel={setCompleteModel}
        completeShipment={completeShipment}
      />

      <GetShipment 
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />

      <StartShipment 
        startModel={startModel}
        setStartModel={setStartModel}
        startShipment={startShipment}
      />

    </>
  );
};

export default App;
