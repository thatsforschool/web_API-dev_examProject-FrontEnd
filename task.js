const config = require("config");
const con = config.get("dbConfig_UCN");
const sql = require("mssql");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { resolve } = require("path");
const { reject } = require("lodash");
const { stringify } = require("querystring");

class Task {
  //constructor
  constructor(taskObj) {//specify mandatory/non-mandatory
    if (taskObj.taskId) { //if the taskObj has a taskId:
      this.taskId = taskObj.taskId;
    }
    if (taskObj.labelId) {
      this.labelId = taskObj.labelId;
    }
    if (taskObj.userId) {
      this.userId = taskObj.userId;
    }
    if (taskObj.taskdueDate) {
      this.taskDueDate = taskObj.taskDueDate;
    }
    if (taskObj.tasksubject) {
      this.tasksubject = taskObj.tasksubject;
    }

  }


  //validate - task object:
  static validationSchema() {
    const schema = Joi.object({
      taskId: Joi.number()
        .integer()
        .min(1),
      label: Joi.object({
        labelId: Joi.number()
          .integer()
          .min(1)
          .required(),
        labelName: Joi.string()
          .max(50)
      }),
      taskdueDate: Joi.number()
        .integer(),
      tasksubject: Joi.string()
        .max(255)
        .min(1),
    });
    return schema;
  }

  static validate(taskObj) {
    const schema = Task.validationSchema();

    return schema.validate(taskObj);
  }

  //   //read by taskId
  //   static readById(taskId) {
  //     return new Promise((resolve, reject) => {   
  //         (async () => {  
  //             try {
  //                 // open connection to DB
  //                 const pool = await sql.connect(con);

  //                 // query DB (SELECT all columns FROM author table WHERE authorid)
  //                 const result = await pool.request()
  //                     .input('taskId', sql.Int(), taskId)
  //                     .query(`
  //                         SELECT *
  //                         FROM stuorgTask st
  //                         WHERE st.sturgTask = @taskId
  //                     `)

  //                 // check if exactly one result: authorid is primary key in the stuorgTask table, we expect to see exactly one result
  //                 if (result.recordset.length > 1) throw { statusCode: 500, errorMessage: `Corrupt DB, mulitple tasks with taskId: ${taskId}`, errorObj: {} };
  //                 if (result.recordset.length == 0) throw { statusCode: 404, errorMessage: `task not found by taskId: ${taskId}`, errorObj: {} };

  //                  // restructure taskWannabe
  //                  const taskWannabe = {
  //                   taskId: result.recordset[0].taskId,
  //                   labelId: result.recordset[0].labelId,
  //                   userId: result.recordset[0].userId,
  //                   taskdueDate: result.recordset[0].taskdueDate,
  //                   tasksubject: result.recordset[0].tasksubject
  //               }

  //                 // valdiate taskWannabe
  //                 const { error } = Task.validate(taskWannabe);
  //                 if (error) throw { statusCode: 500, errorMessage: `Corrupt DB, task does not validate: ${taskWannabe.taskId}`, errorObj: error };

  //                 // resolve with author
  //                 resolve(new Task(taskWannabe));

  //             } catch (err) {
  //                 reject(err) // reject with error
  //             }

  //             sql.close();    // CLOSE DB CONNECTION

  //         })();   // *** IIFE
  //     })
  // }
  //   //read task by subject
  //   static readBySubject(tasksubject) {
  //     return new Promise((resolve, reject) => {   
  //         (async () => {  
  //             try {
  //                 // open connection to DB
  //                 const pool = await sql.connect(con);

  //                 // query DB (SELECT all columns FROM author table WHERE authorid)
  //                 const result = await pool.request()
  //                     .input('tasksubject', sql.NVarChar(), tasksubject)
  //                     .query(`
  //                         SELECT *
  //                         FROM stuorgTask st
  //                         WHERE st.tasksubject = @tasksubject
  //                     `)

  //                 // check if exactly one result
  //                 if (result.recordset.length > 1) throw { statusCode: 500, errorMessage: `Corrupt DB, mulitple tasks with subject: ${tasksubject}`, errorObj: {} };
  //                 if (result.recordset.length == 0) throw { statusCode: 404, errorMessage: `task not found by subject: ${tasksubject}`, errorObj: {} };

  //                 // restructure taskWannabe
  //                 const taskWannabe = {
  //                     taskId: result.recordset[0].taskId,
  //                     labelId: result.recordset[0].labelId,
  //                     userId: result.recordset[0].userId,
  //                     taskdueDate: result.recordset[0].taskdueDate,
  //                     tasksubject: result.recordset[0].tasksubject
  //                 }

  //                 // valdiate taskWannabe
  //                 const { error } = Task.validate(taskWannabe);
  //                 if (error) throw { statusCode: 500, errorMessage: `Corrupt DB, task does not validate: ${taskWannabe.taskId}`, errorObj: error };

  //                 // resolve with author
  //                 resolve(new Task(taskWannabe))

  //             } catch (err) {
  //                 reject(err) // reject with error
  //             }

  //             sql.close();    // CLOSE DB CONNECTION

  //         })();   // *** IIFE
  //     })
  // }

  //create a new task
  static createTask(userId, labelId, taskdueDate, tasksubject) {
    return new Promise((resolve, reject) => {
      (async () => {
        console.log("started 1 try block on create task");
        console.log("userId");
        console.log(userId);
        console.log("labelId");
        console.log(labelId);
        console.log("taskdueDate");
        console.log(taskdueDate);
        console.log("tasksubject");
        console.log(tasksubject);
        // const subject = JSON.stringify(tasksubject)
        // console.log(subject)
        try {
          const pool = await sql.connect(con);
          console.log("connected to the database");
          const result = await pool
            .request()
            .input("userId", sql.Int(), userId)
            .input("labelId", sql.Int(), labelId)
            .input("taskdueDate", sql.BigInt(), taskdueDate)
            .input("tasksubject", sql.NVarChar(), tasksubject).query(`
          INSERT INTO stuorgTask 
          ([FK_userId], [FK_labelId], [taskdueDate], [tasksubject])
          VALUES
          (@userId, @labelId, @taskdueDate, @tasksubject)
          SELECT *
          FROM stuorgTask
          WHERE taskId = SCOPE_IDENTITY()
          `);
          console.log("send query");

          if (result.recordset.length == 0)
            throw {
              statusCode: 404,
              errorMessage: `task not found`,
              errorObj: {},
            };

          if (result.recordset.length > 1)
            throw {
              statusCode: 500,
              errorMessage: `corrupted data in the database`,
              errorObj: {},
            };
          console.log("1 result recieved");

          const task = result.recordset[0];
          console.log(task);

          resolve(task);
        } catch (err) {
          console.log("we are at the error");
          reject(err);
        }
        sql.close();

      })();
    });
  }


  //getting ALL tasks. Would probably only be for the admin of the application
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {

          const pool = await sql.connect(con);
          const response = await pool.request().query(`
                  SELECT *
                  FROM stuorgTask
                  `);
          if (response.recordset.length == 0)
            throw {
              statusCode: 404,
              errorMessage: `no task found in the database`,
              errorObj: {},
            };
          //   console.log("there is at least 1 task in the database");

          //   console.log(response);
          //   console.log("tasks in the DB");

          let taskArray = [];

          response.recordset.forEach((task) => {
            console.log("this is each task");
            this.validate(task);
            // console.log("validating task");
            taskArray.push(task);
            // console.log("pushed into the taskArray");
          });

          console.log(taskArray);
          resolve(taskArray);
        } catch (err) {
          reject(err);
        }
        sql.close();
      })();
    });
  }

  //get OWN tasks
  static getOwnTasks(userId) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {

          const pool = await sql.connect(con);
          const response = await pool
            .request()
            .input("userId", sql.Int(), userId).query(`
              SELECT *
              FROM stuorgTask
              WHERE FK_userId = @userId
              `);
          if (response.recordset.length == 0)
            throw {
              statusCode: 404,
              errorMessage: `no task found in the database`,
              errorObj: {},
            };
          console.log("there is at least 1 task in the database");

          console.log(response);
          console.log("tasks in the DB");

          let taskArray = [];
          console.log("created empty array");

          response.recordset.forEach((task) => {
            console.log("this is each task");
            this.validate(task);
            console.log("validating task");
            taskArray.push(task);
            console.log("pushed into the taskArray");
          });

          console.log(taskArray);
          resolve(taskArray);
        } catch (err) {
          console.log("we are at the error");
          reject(err);
        }
        sql.close();
      })();
    });
  }
  //get OWN tasks by labelId
  static getOwnTasksByLabelId(userId, labelId) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const pool = await sql.connect(con);
          const response = await pool
            .request()
            .input("userId", sql.Int(), userId)
            .input("labelId", sql.Int(), labelId)
            .query(`
              SELECT *
              FROM stuorgTask
              WHERE FK_userId = @userId
              AND FK_labelId = @labelId
              `);
          if (response.recordset.length == 0)
            throw {
              statusCode: 404,
              errorMessage: `no task found in the database`,
              errorObj: {},
            };
          console.log("there is at least 1 task in the database");

          console.log(response);
          console.log("tasks in the DB");

          let taskArray = [];
          console.log("created empty array");

          response.recordset.forEach((task) => {
            console.log("this is each task");
            this.validate(task);
            console.log("validating task");
            taskArray.push(task);
            console.log("pushed into the taskArray");
          });

          console.log(taskArray);
          resolve(taskArray);
        } catch (err) {
          console.log("we are at the error");
          reject(err);
        }
        sql.close();
      })();
    });
  }

}

module.exports = Task;