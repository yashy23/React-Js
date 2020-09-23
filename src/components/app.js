import React, { useState, useEffect } from "react";
import fetch from '../api/dataService';
import {Table} from './Table'
import "./App.css";


function calulatePonits(amt){
    let points = 0;
    if (amt > 100) {    
      points = 2*(amt-100)+50;
    } else if (amt > 50 && amt<=100) {
      points = amt - 50;      
    }
    else{
      points = 0;
    }
    return points;
}



function App() {
  const [data, setData] = useState(null);
  useEffect(() => { 
    fetch().then((data)=> {             
      const info = buildInfo(data);      
      setData(info);
    });
  },[]);

  if (data == null) {
    return <div>Loading...</div>;   
  }

  return <div>   
      <div className="container">
        <div className="row">
          <div className="col-8">
            <br></br><br></br>
            <Table
              data={data}
               />             
            </div>
          </div>
        </div>     
    </div>
  ;
}

function buildInfo(data) {
  const pointsPerTransaction = data.map(transaction=> {
    let points = calulatePonits(transaction.amt);
    const month = new Date(transaction.transactionDt).getMonth();
    return {...transaction, points, month};
  });
  let byCustomer = {};
  let totalPointsByCustomer = {};
  pointsPerTransaction.forEach(pointsPerTransaction => {
    let {custid, name, month, points, transactionDt} = pointsPerTransaction;   
    if (!byCustomer[custid]) {
      byCustomer[custid] = [];      
    }    
    if (!totalPointsByCustomer[custid]) {
      totalPointsByCustomer[custid] = 0;
    }
   
    totalPointsByCustomer[custid] += points;
    
    if (byCustomer[custid][month]) {
      byCustomer[custid][month].points += points;
      byCustomer[custid][month].monthNumber = month;
      byCustomer[custid][month].numTransactions++;      
    } else {
      byCustomer[custid][month] = {
        custid,
        name,
        month:new Date(transactionDt).toLocaleString('en-us',{month:'long'}),
        numTransactions: 1,        
        points
      }
    }    
  });
  
  return {
    summaryByCustomer: buildSummaryInfo(byCustomer, totalPointsByCustomer),
    pointsPerTransaction
  };
}

function buildSummaryInfo(byCustomer, totalPointsByCustomer){
  let summary = [];
  for (var custKey in byCustomer) {    
    byCustomer[custKey].forEach(cRow=> {
      cRow.totalPointsByCustomer = totalPointsByCustomer[custKey];
      summary.push(cRow);
    });    
  }
  return summary;
}
export default App;
