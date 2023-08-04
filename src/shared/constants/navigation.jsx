import { LuParkingCircle } from "react-icons/lu";
import { BsCalendarEvent, BsStar } from "react-icons/bs";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Parking Lots",
    path: "/",
    icon: (
      <SvgIcon sx={{ fontSize: 23 }}>
        <LuParkingCircle />
      </SvgIcon>
    ),
  },
  {
    title: "Reservations",
    path: "/reservations",
    icon: (
      <SvgIcon sx={{ fontSize: 23 }}>
        <BsCalendarEvent />
      </SvgIcon>
    ),
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: (
      <SvgIcon sx={{ fontSize: 23 }}>
        <BsStar />
      </SvgIcon>
    ),
  },
];
