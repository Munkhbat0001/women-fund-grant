// Customer
export const CUSTOMER_LOGIN = "/auth/customer/login";
export const CUSTOMER_INFO = "/auth/customer/info";
export const CUSTOMER_REGISTER = "/auth/customer/register";

export const CUSTOMER_GRANT = "/grant";

export const CUSTOMER_PROJECT_BY_GRANT = "/project/by";
export const CUSTOMER_PROJECT_MEMBER = "/project/member/by-project";

export const CUSTOMER_PROJECT_POST = "/project";
export const CUSTOMER_PROJECT_PUT = "/project";

export const CUSTOMER_PROJECT_GOAL_ALL_POST = "/project/{0}/goal-all";
export const CUSTOMER_PROJECT_GOAL = "/project/goal/by-project";
export const CUSTOMER_PROJECT_GOAL_DELETE = "/project/goal/{0}";
export const CUSTOMER_PROJECT_OBJECT = "/project/goal/by-goal";
export const CUSTOMER_PROJECT_OBJECT_DELETE = "/project/goal/object/{0}";

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

// Core
export const CONST_PROJECT_RESULT = "/v2/const?begin=300&end=302";
export const CONST_PROJECT_GROUP = "/v2/const?begin=400&end=402";
export const CONST_PROJECT_BUDGET_MEASURE = "/v2/const?begin=500&end=502";

export const FILE_UPLOAD = "/api/upload/file/{0}";
export const FILE_DOWNLOAD = "/file";
export const FILE_REMOVE = "/file";
