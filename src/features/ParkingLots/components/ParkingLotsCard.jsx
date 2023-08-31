import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Hidden,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

import {
  BsGeoAltFill,
  BsClock,
  BsPlusCircleFill,
  BsStar,
  BsStarFill,
  BsTrashFill,
  BsInfoCircle,
  BsXCircle,
  BsPerson,
  BsPencilSquare,
} from "react-icons/bs";
import useParkingLots from "../../../common/hooks/useParkingLots";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authProvider";
import theme from "../../../theme/Theme";
import { Link, useNavigate } from "react-router-dom";
import {
  toastError,
  toastInfo,
  toastSuccess,
} from "../../../common/utils/toasts";
import useConfirm from "../../../common/hooks/useConfirm";
import ConfirmDialog from "../../ConfirmDialog/components/ConfirmDialog";
import RequestDetails from "../../RequestDetails/components/RequestDetails";

const FreeSpots = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: "#059669",
  fontWeight: 500,
  [theme.breakpoints.only("xs")]: {
    fontSize: "1.4rem",
  },
}));

const ParkingName = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 500,
  [theme.breakpoints.only("xs")]: {
    fontSize: "1.125rem",
  },
}));

const ParkingInfo = styled(Typography)(({ theme }) => ({
  fontSize: ".9rem",
  fontWeight: 400,
  [theme.breakpoints.only("xs")]: {
    fontSize: ".9",
  },
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "8px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ParkingLotsCard = ({
  parking,
  request,
  requestId,
  owner,
  isFavorite,
  handleDeactivateParking,
  type,
}) => {
  const userContext = useContext(AuthContext);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { addFavorite, removeFavorite, modifyRequest } = useParkingLots();
  const [ConfirmDialogModal, open] = useConfirm(ConfirmDialog);

  const [openDetails, setOpenDetails] = useState(false);

  const handleAddToFavorites = async () => {
    if (isFavorite) {
      await removeFavorite(parking.id)
        .then(() => {
          const toastId = `remove-favorite-${parking.id}`;

          toastInfo("Parking lot removed from favorites.", { toastId });
        })
        .catch((err) => {
          const toastId = `remove-favorite-${parking.id}`;

          toastError(err, { toastId });
        });
    } else {
      await addFavorite(parking.id)
        .then(() => {
          const toastId = `add-favorite-${parking.id}`;

          toastInfo("Parking lot added to favorites.", { toastId });
        })
        .catch((err) => {
          const toastId = `add-favorite-${parking.id}`;

          toastError(err, { toastId });
        });
    }
  };

  const deactivateParkingHandler = () => {
    handleDeactivateParking(parking);
  };

  const approveParkingHandler = async () => {
    const confirmDialog = await open(
      `Are you sure you want to approve ${parking.name}?`
    );

    if (confirmDialog) {
      await modifyRequest(requestId, "Approved")
        .then((res) => {
          const toastId = "modify-request";

          toastSuccess(res, { toastId });

          navigate("/");
        })
        .catch((err) => {
          const toastId = "modify-request";

          toastError(err, { toastId });
        });
    }
  };
  const declineParkingHandler = async () => {
    const confirmDialog = await open(
      `Are you sure you want to decline ${parking.name}?`
    );

    if (confirmDialog) {
      await modifyRequest(requestId, "Declined")
        .then((res) => {
          const toastId = "modify-request";

          toastSuccess(res, { toastId });

          navigate("/");
        })
        .catch((err) => {
          const toastId = "modify-request";

          toastError(err, { toastId });
        });
    }
  };

  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: "10px !important",
          border: isXs ? "none" : "1px solid #DCDCDC",
          boxShadow: "none",
          marginTop: 2,
        }}
      >
        <Grid
          container
          sx={{ display: "flex" }}
          p={isXs ? 2 : 4}
          width="100%"
          justifyContent="space-between"
        >
          <Grid item display="flex" gap={5} alignItems={"center"}>
            {userContext.role !== "SuperAdmin" ? (
              <Grid
                item
                display={"flex"}
                flexDirection={"column"}
                textAlign={"center"}
                justifyContent={"center"}
              >
                <FreeSpots variant="h5">150</FreeSpots>
                <Typography
                  variant="subtitle2"
                  minWidth={"69px"}
                  sx={{ color: "#424343" }}
                >
                  out of {parking?.capacityCar}
                </Typography>
              </Grid>
            ) : (
              ""
            )}

            <Grid item>
              <Grid
                item
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                columnGap={2}
              >
                <ParkingName variant="h6" fontSize="1.25rem">
                  {parking?.name}
                </ParkingName>
                <Typography
                  variant="subtitle2"
                  fontSize="1rem"
                  sx={{ background: "#E6E6E6", borderRadius: "5px" }}
                  px={1.5}
                >
                  {parking?.price}&euro;/hr
                </Typography>

                {userContext.role === "Owner" ||
                userContext.role === "SuperAdmin" ? (
                  <Badge
                    badgeContent={
                      parking.isDeactivated
                        ? "Deactivated"
                        : parking.status === 1
                        ? "Pending"
                        : parking.status === 2
                        ? "Active"
                        : "Declined"
                    }
                    color={
                      parking.isDeactivated
                        ? "primary"
                        : parking.status === 1
                        ? "warning"
                        : parking.status === 2
                        ? "success"
                        : "primary"
                    }
                    componentsProps={{
                      badge: {
                        style: {
                          position: "relative",
                          transform: "none",
                          WebkitTransform: "none",
                        },
                      },
                    }}
                  />
                ) : (
                  ""
                )}
              </Grid>

              <Hidden smDown>
                <Grid
                  item
                  display="flex"
                  flexDirection="column"
                  justifyContent={"center"}
                >
                  <ParkingInfo
                    variant="body2"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <BsGeoAltFill
                      size={17}
                      style={{ marginRight: "6px" }}
                      color="#CF0018"
                    />
                    {parking?.address} {bull} {parking?.city} {bull}{" "}
                    {parking?.zone}
                  </ParkingInfo>
                  <ParkingInfo
                    variant="body2"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <BsClock
                      size={17}
                      style={{ marginRight: "6px" }}
                      color="#CF0018"
                    />
                    {parking?.workingHourFrom?.slice(0, -3)} -{" "}
                    {parking?.workingHourTo?.slice(0, -3)}
                  </ParkingInfo>
                  {userContext.role === "SuperAdmin" && owner ? (
                    <ParkingInfo
                      variant="body2"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <BsPerson
                        size={17}
                        style={{ marginRight: "6px" }}
                        color="#CF0018"
                      />
                      {owner?.name} {owner?.surname}
                    </ParkingInfo>
                  ) : (
                    ""
                  )}
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Hidden smUp>
            <Grid
              item
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              mt={2}
            >
              <ParkingInfo
                variant="body2"
                display={"flex"}
                alignItems={"center"}
              >
                <BsGeoAltFill
                  size={17}
                  style={{ marginRight: "6px" }}
                  color="#CF0018"
                />
                {parking?.address} {bull} {parking?.zone} {bull} Car
              </ParkingInfo>
              <ParkingInfo
                variant="body2"
                display={"flex"}
                alignItems={"center"}
              >
                <BsClock
                  size={17}
                  style={{ marginRight: "6px" }}
                  color="#CF0018"
                />
                {parking?.workingHourFrom?.slice(0, -3)} -{" "}
                {parking?.workingHourTo?.slice(0, -3)}
              </ParkingInfo>
            </Grid>
          </Hidden>
          <Grid
            item
            width={mdDown ? "100%" : "auto"}
            display="flex"
            flexDirection={isXs ? "column" : "row"}
            gap={isXs ? 1 : 2}
            alignItems="center"
            justifyItems={"center"}
            mt={mdDown ? 3 : 0}
          >
            {userContext.role !== "SuperAdmin" &&
            userContext.role !== "Owner" ? (
              <Grid item width={mdDown ? "100%" : "auto"}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  disableElevation
                  fullWidth
                >
                  <BsPlusCircleFill size={17} style={{ marginRight: "6px" }} />
                  Reserve
                </Button>
              </Grid>
            ) : (
              ""
            )}
            {userContext.role !== "SuperAdmin" &&
            userContext.role !== "Owner" ? (
              <Grid item width={mdDown ? "100%" : "auto"}>
                <Button
                  variant="outlined"
                  color="favorite"
                  size="large"
                  onClick={handleAddToFavorites}
                  fullWidth
                >
                  {isFavorite ? (
                    <BsStarFill
                      size={17}
                      style={{
                        marginRight: "6px",
                        color: theme.palette.favorite.accent,
                      }}
                    />
                  ) : (
                    <BsStar size={17} style={{ marginRight: "6px" }} />
                  )}
                  Favorite
                </Button>
              </Grid>
            ) : (
              ""
            )}
            {userContext.role === "SuperAdmin" && parking.status === 2 ? (
              <Grid item width={mdDown ? "100%" : "auto"}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={deactivateParkingHandler}
                  disableElevation
                  disabled={parking.isDeactivated ? true : false}
                  fullWidth
                >
                  <BsTrashFill size={17} style={{ marginRight: "6px" }} />
                  Deactivate
                </Button>
              </Grid>
            ) : (
              ""
            )}

            {userContext.role === "SuperAdmin" && type ? (
              <Grid item width={mdDown ? "100%" : "auto"}>
                <Button
                  variant="outlined"
                  color="favorite"
                  size="large"
                  onClick={() => {
                    setOpenDetails(true);
                  }}
                  disableElevation
                  disabled={parking.isDeactivated ? true : false}
                  fullWidth
                >
                  <BsInfoCircle size={17} style={{ marginRight: "6px" }} />
                  Details
                </Button>
              </Grid>
            ) : (
              ""
            )}

            {userContext.role === "Owner" && parking.status === 2 ? (
              <Grid item width={mdDown ? "100%" : "auto"}>
                {parking.isDeactivated ? (
                  <Button
                    variant="outlined"
                    color="favorite"
                    size="large"
                    disableElevation
                    disabled={parking.isDeactivated ? true : false}
                    fullWidth
                  >
                    <BsPencilSquare size={17} style={{ marginRight: "6px" }} />
                    Edit
                  </Button>
                ) : (
                  <Link to={`/parkinglot/${parking.id}/edit`}>
                    <Button
                      variant="outlined"
                      color="favorite"
                      size="large"
                      disableElevation
                      disabled={parking.isDeactivated ? true : false}
                      fullWidth
                    >
                      <BsPencilSquare
                        size={17}
                        style={{ marginRight: "6px" }}
                      />
                      Edit
                    </Button>
                  </Link>
                )}
              </Grid>
            ) : (
              ""
            )}
            {userContext.role === "Owner" && parking.status === 2 && !type ? (
              <Grid item width={mdDown ? "100%" : "auto"}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={deactivateParkingHandler}
                  disableElevation
                  disabled={parking.isDeactivated ? true : false}
                  fullWidth
                >
                  <BsTrashFill size={17} style={{ marginRight: "6px" }} />
                  Deactivate
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Card>
      <Hidden smUp>
        <Divider
          sx={{
            width: "100%",
            marginTop: 2,
            borderColor: "rgba(57, 57, 57, 0.4)",
          }}
        />
      </Hidden>
      <ConfirmDialogModal />
      <RequestDetails
        open={openDetails}
        request={request}
        handleClose={handleClose}
        handleApprove={approveParkingHandler}
        handleDecline={declineParkingHandler}
      />
    </>
  );
};

ParkingLotsCard.propTypes = {
  parking: PropTypes.object,
  request: PropTypes.object,
  requestId: PropTypes.number,
  owner: PropTypes.object,
  isFavorite: PropTypes.bool,
  handleDeactivateParking: PropTypes.func,
  type: PropTypes.string,
};

export default ParkingLotsCard;
