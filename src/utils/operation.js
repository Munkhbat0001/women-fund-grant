// Customer
export const CUSTOMER_LOGIN = "/auth/customer/login";
export const CUSTOMER_INFO = "/auth/customer/info";
export const CUSTOMER_REGISTER = "/auth/customer/register";
export const CUSTOMER_GET = "/customer/{0}";
export const CUSTOMER_PUT = "/customer/{0}";
export const CUSTOMER_CHANGE_PASSWORD = "/customer/password";

export const CUSTOMER_GRANT = "/grant";

export const CUSTOMER_PROJECT = "/customer/project";
export const CUSTOMER_PROJECT_GOAL_GET = "/project/goal/by-project/{0}";
export const CUSTOMER_PROJECT_PLAN_GET =
  "/project/goal/object/plan?projectId={0}";
export const CUSTOMER_PROJECT_BUDGET_GET =
  "/project/goal/object/budget?projectId={0}";
export const CUSTOMER_PROJECT_MEMBER_GET = "/project/member/by-project/{0}";
export const CUSTOMER_PROJECT_BY_GRANT = "/project/by";
export const CUSTOMER_PROJECT_MEMBER = "/project/member/by-project";
export const CUSTOMER_PROJECT_GRANT_GET = "/customer/project/grant/{0}";
export const CUSTOMER_PROJECT_GET = "/customer/project/{0}";
export const CUSTOMER_PROJECT_GOAL_PLAN = "/project/{0}";

export const CUSTOMER_PROJECT_POST = "/project";
export const CUSTOMER_PROJECT_PUT = "/project";

export const CUSTOMER_PROJECT_GOAL_ALL_POST = "/project/{0}/goal-all";
export const CUSTOMER_PROJECT_GOAL = "/project/goal/by-project";
export const CUSTOMER_PROJECT_GOAL_DELETE = "/project/goal/{0}";
export const CUSTOMER_PROJECT_OBJECT = "/project/goal/by-goal";
export const CUSTOMER_PROJECT_OBJECT_DELETE = "/project/goal/object/{0}";
export const CUSTOMER_PROJECT_SEND = "/customer/project/{0}/status";

export const CUSTOMER_PROJECT_PLAN_ALL_POST =
  "/project/{0}/goal/object/plan-all";

export const CUSTOMER_PROJECT_PLAN_DELETE = "/project/goal/object/plan/{0}";
export const CUSTOMER_PROJECT_PLAN_OBJECT_DELETE =
  "/project/{0}/goal/object/{1}/plan";

export const CUSTOMER_PROJECT_BUDGET_ALL_POST =
  "/project/{0}/goal/object/budget-all";

export const CUSTOMER_PROJECT_BUDGET_DELETE = "/project/goal/object/budget/{0}";
export const CUSTOMER_PROJECT_BUDGET_OBJECT_DELETE =
  "/project/{0}/goal/object/{1}/budget";

export const CUSTOMER_PROJECT_MEMBER_POST = "/project/member";
export const CUSTOMER_PROJECT_MEMBER_DELETE = "/project/member";

// Admin
export const ADMIN_LOGIN = "/auth/login";
export const ADMIN_INFO = "/auth/info";
export const ADMIN_MENU = "/menu";

// Core
export const CONST_PROJECT_RESULT = "/v2/const?begin=300&end=310";
export const CONST_PROJECT_GROUP = "/v2/const?begin=350&end=380";
export const CONST_PROJECT_BUDGET_MEASURE = "/v2/const?begin=500&end=502";
export const CONST_REPORT_DONE = "/v2/const?begin=110&end=112";
export const CONST_REPORT_INTEGRATED_RESULT = "/v2/const?begin=750&end=757";
export const CONST_CITY = "/address/city";
export const CONST_DISTRICT = "/address/district";
export const CONST_CUSTOMER_ROAD = "/v2/const?begin=811&end=816";
export const CONST_CUSTOMER_TARGET = "/v2/const?begin=851&end=858";
export const CONST_SURVEY_PROPERTY = "/v2/const?begin=520&end=522";

export const FILE_UPLOAD = "/api/upload/file/{0}";
export const FILE_DOWNLOAD = "/file";
export const FILE_REMOVE = "/file";

// Report
export const REPORT_PROJECT_STATUS_PROGRESS =
  "/report/customer/status/progress?statusIds=207";
export const REPORT_PROJECT_STATUS_INTEGRATED =
  "/report/customer/status/integrated?statusIds=207,209";
export const REPORT_IMPLEMENT =
  "/report/customer/implement?projectId={0}&typeId={1}";
export const REPORT_BUDGET = "/report/customer/plan?projectId={0}&typeId={1}";
export const REPORT_BUDGET_POST =
  "/report/customer/plan?projectId={0}&typeId={1}";
export const REPORT_DATA =
  "/report/customer/report-data?projectId={0}&typeId={1}";
export const REPORT_DATA_POST =
  "/report/customer/report-data?projectId={0}&typeId={1}";
export const REPORT_PROGRESS = "/report/customer/progress/{0}";
export const REPORT_PROGRESS_LIST = "/report/customer/progress";
export const REPORT_PROGRESS_POST = "/report/customer/progress";
export const REPORT_PROGRESS_SEND = "/report/customer/send-progress";

export const REPORT_MEASURE = "/report/customer/measure?projectId={0}";
export const REPORT_MEASURE_POST = "/report/customer/measure?projectId={0}";
export const REPORT_INTEGRATED = "/report/customer/integrated/{0}";
export const REPORT_INTEGRATED_LIST = "/report/customer/integrated";
export const REPORT_INTEGRATED_POST = "/report/customer/integrated";
export const REPORT_INTEGRATED_SEND = "/report/customer/send-integrated";

export const SURVEY_BEFORE_POST = "/survey/before";
export const SURVEY_BEFORE_PUT = "/survey/before/{id}";

export const SURVEY_AFTER_POST = "/survey/after";
export const SURVEY_AFTER_PUT = "/survey/after/{id}";
