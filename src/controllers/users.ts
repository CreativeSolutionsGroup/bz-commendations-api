import axios from "axios";
import { Request, Response } from "express"
import jwtDecode from "jwt-decode";
import User from "../models/user";
import getGoogleSheetJSON from "../utils/sheets";

const getEmployees = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Members");
  let employeeData = [];

  let rows = json.rows;
  rows.shift();//Remove top row
  rows.forEach((row) => {
    let email = row.c[0].v;
    let name = row.c[1].v;
    let team = row.c[2].v;
    let phone = row.c[3] === null || row.c[3] === undefined || row.c[3] === "" ? undefined : row.c[3].v;
    employeeData.push({ email: email, name: name, team: team, phone: phone })
  });

  employeeData.sort((a, b) => ('' + a.name).localeCompare(b.name));

  return employeeData;
}

const getEmployeesRet = async (req: Request, res: Response) => {
  const emp = await getEmployees();

  res.json({
    message: emp
  });
}


const getAdminUsers = async () => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Admins");
  let adminList = [];

  let rows = json.rows;
  rows.forEach((row) => {
    let email = row.c[0].v;
    adminList.push(email)
  });

  return adminList;
}

export const getSuggestionTeam = async (team: String) => {
  let json = await getGoogleSheetJSON("1zt-TIdmnloixDiXmDWSPKgGcpI8ABaHfouT_jBu-wBI", "Suggestion Team");
  let suggestionTeam = [];

  let rows = json.rows;
  
  if (Object.keys(rows.c).length > 1) {
    console.log("DANGER. Not using the right sheet for emails.");
    return;
  }

  rows.forEach((row) => {
    let email = row.c[0].v;
    suggestionTeam.push(email)
  });

  return suggestionTeam;
}

export const existsInSheet = async (user: string) => {
  let employees = await getEmployees();
  return employees.find(employee => employee.email === user) !== undefined;
}

export const isAdmin = async (user: string) => {
  let adminList = await getAdminUsers();
  return adminList.find(admin => admin === user) !== undefined;
}

const getEmployeeName = async (user: string) => {
  let employees = await getEmployees();

  let foundEmployee = employees.find(employee => employee.email === user);
  if (typeof foundEmployee !== "undefined") {
    return foundEmployee.name;
  }
  return user;
}

const login = (req: Request, res: Response) => {
  let user = req.body as User;
  let decodedUser = jwtDecode(user.token) as any;
  let username = decodedUser.email;

  if (existsInSheet(username)) {
    res.json({
      message: "Successfully logged in."
    })
  } else {
    res.status(403).json({
      message: "Did not verify."
    })
  }
}

export { login, getEmployeeName, getEmployeesRet }
