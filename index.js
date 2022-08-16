const mysql=require('mysql');
var mySqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sindhu123',
    database:'Employee_DB',
    multipleStatements:true
});
mySqlConnection.connect((err)=>{
    if(!err)
       console.log('DB connection succeded')
    else
       console.log('error in db connnection:'+JSON.stringify(err,undefined,2));
})
const express = require("express");
const e = require('express');
const app = express();
const port = 3000;
app.use(express.json())
//select all value 
app.get('/',(req,res)=>{mySqlConnection.query('SELECT * FROM employee;',(err,rows,fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
})
});
//get the record for specific user using id
app.get('/:id',(req,res)=>{mySqlConnection.query('SELECT * FROM employee where EmpID=?;',[req.params.id],(err,rows,fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
})
});

//delete an employee
app.delete('/:id',(req,res)=>{
    mySqlConnection.query('DELETE from employee where EmpID=?;',[req.params.id],(err,rows,fields)=>{
    if(!err)
    res.send("DELETED SUCCESSFULLY");
    else
    console.log(err);
})
});
//insert an record
app.post('/p',(req,res) => {
    let emp=req.body;
    var sql = "INSERT INTO employee (EmpID,Name,EmpCode,Salary)\
    Values(?,?,?,?);";
    mySqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(err)throw err;
        res.send("inserted successfully")
        res.end;    
    })
});
//update an employee
app.put('/put',(req,res) => {
    let emp=req.body;
    console.log("response",emp)
    var sql = "set @EmpID = ?;set @Name = ?;set @EmpCode = ?;set @Salary =?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mySqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
            res.send("updated successfully")
        else
            console.log(err);
    })
});
app.listen(port,()=>{
    console.log('server is at http://localhost:3000')
})
