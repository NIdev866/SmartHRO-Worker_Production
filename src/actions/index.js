import React from 'react';
import axios from 'axios';

import { SUBMIT_BANK_DETAILS } from './types.js';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  NESTED_JOB_SECTORS,
  COMPANIES,
  ALL_CAMPAIGNS,
  PERSONAL_DATA_OF_WORKER
} from './types.js';



const ROOT_URL = 'http://ec2-54-77-236-165.eu-west-1.compute.amazonaws.com:3000';

export function submitBankDetails(){
  return {
    type: SUBMIT_BANK_DETAILS
  }
}







export function fetchPersonalDataOfWorker(){
  const worker_id = localStorage.getItem('worker_id');

  return function(dispatch){
    axios.get(`http://localhost:3000/worker/personal/${worker_id}`)
      .then(response => {
        dispatch({ type: PERSONAL_DATA_OF_WORKER, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}





export function fetchNestedJobSectors(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/create-campaign/get-nested-job-sectors`)
      .then(response => {
        dispatch({ type: NESTED_JOB_SECTORS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}

export function fetchCompanies(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/admin/companies`)
      .then(response => {
        dispatch({ type: COMPANIES, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}




export function fetchAllCampaigns(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/campaigns/all`)
      .then(response => {
        dispatch({ type: ALL_CAMPAIGNS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}

export function signupUser({ email, password, jobseeker_id }) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/worker/addlogin-credentials`, { email, password,jobseeker_id })
      .then(response => {
        //window.location.replace('/');
        console.log(response);
        localStorage.setItem('worker_email', email);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('worker_id', response.data.id);
      })
      .catch((err) => {
        dispatch(authError('Bad Sign-Up Information'));
      });
  };
}
export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/worker/login`, { email, password })
      .then(response => {
        localStorage.setItem('worker_email', email);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('worker_id', response.data.id);
      })
      .catch((err) => {
        dispatch(authError('Bad Sign-in Information'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function authUser() {
  return {
    type: AUTH_USER
  };
}


export function signoutUser(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('admin_email');
  return {
    type: UNAUTH_USER
  };
}

export function clearAuthError(error) {
  return {
    type: CLEAR_AUTH_ERROR
  };
}
