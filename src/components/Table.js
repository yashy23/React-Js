import React,{Component} from "react";
import ReactTable from 'react-table';
import "react-table/react-table.css";  
import _ from 'lodash';


const columns = [
    {
      Header:'Customer',
      accessor: 'name',     
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },    
    {
      Header:'Month',
      accessor: 'month',
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Num of Transactions",
      accessor: 'numTransactions',
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header:'Reward Points',
      accessor: 'points',
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
        Header:'Total Rewards',
        accessor: 'totalPointsByCustomer',
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
      }
  ];

  const columns_sub = [
    {
        Header:'Transaction Date',
        accessor:'transactionDt',
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
        Header:'Amount',
        accessor:'amt',
        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
     },
     {
         Header:'Points',
         accessor:'points',
         Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
     }

];

export class Table extends Component{

    getUserTransactionInfo = (row) => {
        let byCustMonth = _.filter(this.props.data.pointsPerTransaction, (tRow)=>{    
          return row.original.custid === tRow.custid && row.original.monthNumber === tRow.month;
        });
        return byCustMonth;
      }
    render(){
        return(
            <div>
              <div>
                <h2>Points Rewarded To Customer By Each Month</h2>
                <br></br>
              </div>
            <ReactTable
              showPagination={false}
              data={this.props.data.summaryByCustomer}
              defaultPageSize={this.props.data.summaryByCustomer.length}
              columns={columns}
              SubComponent={row => {
                return (
                      <ReactTable
                      showPagination={false}
                      defaultPageSize={this.getUserTransactionInfo(row).length}
                      data={this.getUserTransactionInfo(row)}
                      columns={columns_sub}/>
                )
              }}
              />  
            </div> 
        )
    }
}
