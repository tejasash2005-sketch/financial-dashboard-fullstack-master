import { useSelector } from "react-redux";
import {
  Dashboard,
  ZoomMoney,
  ChartBar,
  Settings,
  Cash,
  Lock,
  MessageDots,
  Bulb,
  ChartLine,
  PremiumRights,
} from "tabler-icons-react";

import { RootState } from "../Redux/store";

export function NavigationLinkData() {
  const user = useSelector((state: RootState) => state.user.user) || {};
  const username = user.username || "user";
  const isAdmin = user.isAdmin;

  const navLinkData = [
    { link: `/dashboard/${username}`, label: "Dashboard", icon: Dashboard },
    { link: `/expense/${username}`, label: "Expense", icon: ZoomMoney },
    { link: `/portfolio/${username}`, label: "Portfolio", icon: ChartBar },
    { link: `/budget/${username}`, label: "Budget", icon: Cash },
    { link: `/ai-hub/${username}`, label: "AI Finance Hub", icon: Bulb },
    { link: `/settings/${username}`, label: "Settings", icon: Settings },
  ];

  if (isAdmin) {
    navLinkData.push({
      link: `/admin/${username}`,
      label: "Admin Panel",
      icon: Lock,
    });
  }

  return {
    navLinkData,
  };
}
