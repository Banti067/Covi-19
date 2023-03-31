import React, { useEffect, useState } from "react";
import "./Body.css";
import Navbar from "./Navbar";

const Body = () => {
  const [data, setData] = useState([]);
  const [dData, setDdata] = useState([]);
  const [cData, setCData] = useState("");
  const [center, setCenter] = useState([]);
  const [Date, setDate] = useState("");
  let [condition, setCondition] = useState("");

  const getState = async () => {
    const response = await fetch(
      "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    );
    const res = await response.json();
    setData(await res.states);
  };
  const getdist = async (e) => {
    const alldist = e.target.value;

    const dResponse = await fetch(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + alldist
    );
    const dRes = await dResponse.json();
    setDdata(await dRes.districts);
  };

  const getcenter = (s) => {
    setCData(s.target.value);
  };
  // console.log(cData);

  const getdate = (d) => {
    const zz = d.target.value;

    let q = zz[0];
    let w = zz[1];
    let e = zz[2];
    let r = zz[3];
    let t = zz[4];
    let y = zz[5];
    let u = zz[6];
    let i = zz[7];
    let p = zz[8];
    let a = zz[9];
    let final = p + a + i + y + u + t + q + w + e + r;
    setDate(final);

    // console.log(zz);
  };
  let conditionValue = (
    <h3 class="card shadow border-radius-4 text-center prime2 text-danger p-3 mt-5">
      Data not found
    </h3>
  );
  const handlesubmit = () => {
    const dist_id = cData;
    const date = Date;  

    const data = async () => {
      const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dist_id}&date=${date}`;
      const respons = await fetch(url);
      const res = await respons.json();
      setCenter(await res.centers);
      setCondition(conditionValue);
    };
    data();
  };

  console.log(center);

  useEffect(() => {
    getState();
    getdist();
    // handlesubmit();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-10">
            <div className="card card-border border-radius-5 shadow mt-3 ms-2 section-1">
              <form id="main"action="#" onSubmit={handlesubmit}>
                <div className="mt-3 ms-3 col-md-11 text-center mb-2 px-5  ">
                  <h5 className="allfont-1">Choose Your State</h5>
                  <select className="form-control" onChange={(e)=> getdist(e)}>
                    <option value="">Select your State..</option>
                    {
                      data.map((state) =>{
                        return(
                          <option value={state.state_id}>{state.state_name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mt-3 ms-3 col-md-11 text-center mb-2 px-5 ">
                  <h5 className="allfont-1">Choose Your District</h5>
                  <select className="form-control" onChange={(s)=>getcenter(s)}>
                    <option value="">Select your State..</option>
                    {dData.map((dfinal) => {
                    return (
                      <option value={dfinal.district_id}>
                        {dfinal.district_name}
                      </option>
                    );
                  })}
                  </select>
                </div>
                <div className="mt-3 ms-3 col-md-11 text-center mb-2 px-5 ">
                  <h5 className="allfont-1">Choose Date</h5>
                  <input type="date" className="form-control" onChange={(d)=>getdate(d)} />
                </div>
                <div className="mt-3 ms-3 col-md-11 text-center mb-4 px-5 ">
                  <button className="btn btn-warning allfont" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {
            center.map((final)=>{
              return(
                <div  id="item1"className="col-md-8 col-10">
                <div className="mt-3 ms-2 section-2">
                  <div class="container mt-1 mb-1 text-center data ">
                    <div class="row mt-1 first ">
                      <div class="col-md-3"></div>
                      <div class="col-md-6 card item prime">
                        <h4 class="pb- pt-2 allfont">Center Name : {final.name}</h4>
                        <h5 class=" allfont">Center Address : {final.address} </h5>
                        <h5 class="allfont">Start-Time : {final.from} AM </h5>
                        <h5 class="allfont ">End-Time : {final.to} PM </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid    mt-1 ">
                  <div className="row text-center">
                    {
                      final.sessions.map((session)=>{
                        return(
                          <div className="col-md-3 col-10">
                          <div class="card border shadow border-radius-5 section-1 mt-2 ml-1 ">
                            <h4 class="allfont text-danger">Date :{session.date}</h4>
                            <h5 class="allfont text-white border border-radius-5 shadow prime1 card">
                            Type : {session.vaccine}
                            </h5>
                            <h6>Min-Age : {session.min_age_limit}</h6>
                        <h6>Max-Age : {session.max_age_limit}</h6>
                        {session.slots.map((slot) => {
                          return (
                            <>
                              <h6>Slot Time : {slot.time}</h6>
                              <h5>Available :{slot.seats} </h5>
                            </>
                          );
                        })}
                          
                          </div>
                        </div>
                        )
                      })
                    }
                    
                  </div>
                </div>
              </div>
              )
            })
          } 
        </div>
      </div>
    </>
  );
};

export default Body;
