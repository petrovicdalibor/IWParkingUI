import { LuParkingCircle } from "react-icons/lu";
import {
  BsCalendarEvent,
  BsStar,
  BsCardText,
  BsPersonGear,
} from "react-icons/bs";

export const userItems = [
  {
    title: "Parking Lots",
    path: "/",
    icon: <LuParkingCircle size={23} />,
  },
  {
    title: "Reservations",
    path: "/reservations",
    icon: <BsCalendarEvent size={23} />,
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: <BsStar size={23} />,
  },
];

export const adminItems = [
  {
    title: "Parking Lots",
    path: "/",
    icon: <LuParkingCircle size={23} />,
  },
  {
    title: "Requests",
    path: "/requests",
    icon: <BsCardText size={23} />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <BsPersonGear size={23} />,
  },
];

export const ownerItems = [
  {
    title: "Parking Lots",
    path: "/",
    icon: <LuParkingCircle size={23} />,
  },
  {
    title: "Requests",
    path: "/requests",
    icon: <BsCardText size={23} />,
  },
];
