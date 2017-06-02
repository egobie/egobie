import { put, takeLatest } from 'redux-saga/effects';

import * as WorkflowAction from '../Actions/WorkflowAction';
import * as ServiceAction from '../Actions/ServiceAction';
import * as VehicleAction from '../Actions/VehicleAction';
import * as CalendarAction from '../Actions/CalendarAction';


function* resetOrderTask() {
  yield put({ type: WorkflowAction.WORK_FLOW_LOCATION });
  yield put({ type: ServiceAction.SERVICE_DESELECT_ALL });
  yield put({ type: VehicleAction.VEHICLE_DESELECT });
  yield put({ type: CalendarAction.CALENDAR_DESELECT });
}

export default function* workflowSaga() {
  yield takeLatest(WorkflowAction.WORK_FLOW_RESET_ORDER, resetOrderTask);
}