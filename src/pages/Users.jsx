import { CircularProgress, Grid, Typography } from "@mui/material";
import UserCard from "../features/Users/components/UserCard";
import { useEffect, useState } from "react";
import useAuth from "../common/hooks/useAuth";
import { toastError, toastSuccess } from "../common/utils/toasts";
import useConfirm from "../common/hooks/useConfirm";
import ConfirmDialog from "../features/ConfirmDialog/components/ConfirmDialog";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchAllUsers, deactivateUserById } = useAuth();
  const [ConfirmDialogModal, open] = useConfirm(ConfirmDialog);

  const fetchUsers = () => {
    fetchAllUsers().then((res) => {
      setUsers(res.data.users);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivateUser = async (user) => {
    const confirmDialog = await open(
      `Are you sure you want to deactivate ${user.name}?`
    );

    if (confirmDialog) {
      const userIndex = users.indexOf(user);
      const array = [...users];

      array[userIndex] = {
        ...array[userIndex],
        isDeactivated: true,
      };
      setUsers(array);

      await deactivateUserById(user.id)
        .then((res) => {
          const toastId = "deactivate-user";

          toastSuccess(res.data.message, { toastId });
        })
        .catch((err) => {
          const toastId = "deactivate-user";

          toastError(err, { toastId });
        });
      fetchUsers();
    }
  };

  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Users</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={isLoading && "center"}
        alignItems={isLoading && "center"}
        height={isLoading && "60vh"}
      >
        {isLoading && (
          <Grid
            item
            alignContent={"center"}
            justifyContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
          >
            <CircularProgress />
          </Grid>
        )}
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleDeactivateUser={handleDeactivateUser}
          />
        ))}
      </Grid>
      <ConfirmDialogModal />
    </>
  );
};

export default Users;
