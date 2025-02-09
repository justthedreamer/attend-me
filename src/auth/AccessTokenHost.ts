import { AttendMeBackendClient } from "@/client/backend/AttendMebackendClient";
import { AttendMeBackendClientBase } from "@/client/backend/AttendMeBackendClientBase";

var backend = new AttendMeBackendClientBase()
const ticket = await backend.userAttendanceTicketGet();