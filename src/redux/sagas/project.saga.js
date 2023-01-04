import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

/* 
project saga needs to handle:
  - GET all of a user's projects
  - POST a new project (from createProject)
  - PUT edit certain project
  - DELETE selected project
*/

function* projectsSaga() {
  yield takeEvery('GET_PROJECTS', getProjects)
  yield takeEvery('ADD_PROJECT', addProject)
  yield takeEvery('EDIT_PROJECT', editProject)
  yield takeEvery('DELETE_PROJECT', deleteProject)
};

function* getProjects(action) {
  try {
    console.log('getting projects in project reducer')
    const projects = yield axios.get('/api/project')
    console.log('projects from server;', projects)
    yield put({ type: 'SET_PROJECTS', payload: projects.data })
  }
  catch (err) {
    console.log('could not get projects!', err)
  }
};

// add a new project. triggered in createReview. payload is the newProject object. 

// should talk to '/api/project'
function* addProject(action) {
  try {
    console.log('adding a project')
    yield axios.post('/api/project', action.payload)

    // at the end, empty out newProject
    yield put({ type: 'SET_NEW_PROJECT', payload: { name: '', ensemble_name: '', description: '', repertoire: [], dates: [], collaborators: [] } })
  }
  catch (err) {
    console.log('could not add project', err)
  }
}

function* editProject(action) {
  try {
    console.log('editing project with id', action.payload.id)
    yield axios.put(`/api/project/${action.payload.id}`, action.payload)

    // empty out newProject
    yield put({ type: 'SET_NEW_PROJECT', payload: { name: '', ensemble_name: '', description: '', repertoire: [], dates: [], collaborators: [] } })
  }
  catch(err) {
    console.log('could not edit project', err)
  }
};

function* deleteProject(action) {
  try{
    console.log('deleting project with id ', action.payload);
    yield axios.delete(`/api/project/${action.payload}`);

  }
  catch(err) {
    console.log('could not delete project', err)
  }
}

export default projectsSaga;