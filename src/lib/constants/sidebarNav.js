import { ICONS } from "./assets/icons";
import { DASHBOARD_ROUTES } from "./routes/dashboardRoutes";

export const SIDEBAR = [
    {id: 1, title: "Dashboard", href: DASHBOARD_ROUTES.DASHBOARD.uri, icon: ICONS.navdashboard.src, alt: ICONS.navdashboard.alt },
    {id: 2, title: "User", href: DASHBOARD_ROUTES.USER.uri, icon: ICONS.navuser.src, alt: ICONS.navuser.alt,
      
    },
    {id: 3, title: "Role & Permission", href: DASHBOARD_ROUTES.ROLES_AND_PER.uri, icon: ICONS.role_per.src, alt: ICONS.role_per.alt},
    {id: 4, title: "Payroll", href: DASHBOARD_ROUTES.PAYROLL.uri, icon: ICONS.payroll.src, alt: ICONS.payroll.alt, 
      subItems: [
        {
          title: "Spinpool Balance",
          href: DASHBOARD_ROUTES.PAYROLL.subRoutes.SPINPOOL_BALANCE.uri,
          color: "bg-[#6D78FF]",
          shadow: "shadow-[0_0_0_3px_rgba(109,120,255,0.2)]"
        },
        {
          title: "Ewages Import",
          href: DASHBOARD_ROUTES.PAYROLL.subRoutes.EWAGES_IMPORT.uri,
          color: "bg-[#FFAF1A]",
          shadow: "shadow-[0_0_0_3px_rgba(255,175,26,0.2)]"
        },
        {
          title: "Ewages Receipt",
          href: DASHBOARD_ROUTES.PAYROLL.subRoutes.EWAGES_RECEIPT.uri,
          color: "bg-[#FE6442]",
          shadow: "shadow-[0_0_0_3px_rgba(254,100,66,0.2)]"
        }
      ] 
    },
]