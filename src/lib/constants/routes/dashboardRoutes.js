export const DASHBOARD_ROUTES = {
    DASHBOARD: {
        uri:"/"
    },
    USER: {
        uri:"/user"
    },
    ROLES_AND_PER: {
        uri:"/roles-and-permissions"
    },
    PAYROLL: {
        uri:"/payroll",
        subRoutes: {
            SPINPOOL_BALANCE: {
                uri:"/payroll/spinpool-balance"
            },
            EWAGES_IMPORT: {
                uri:"/payroll/ewages-import"
            },
            EWAGES_RECEIPT: {
                uri:"/payroll/ewages-receipt"
            }
        }
    },

}