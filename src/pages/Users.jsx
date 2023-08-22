import { Grid, Typography } from "@mui/material";
import UserCard from "../features/Users/components/UserCard";
import { useEffect, useState } from "react";
import useAuth from "../common/hooks/useAuth";
import { toastError, toastSuccess } from "../common/utils/toasts";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { fetchAllUsers, deactivateUserById } = useAuth();

  const fetchUsers = () => {
    fetchAllUsers().then((res) => setUsers(res.data.users));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivateUser = async (user) => {
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
  };

  return (
    <>
      <Grid item display="flex" flexDirection="row" gap={3}>
        <Grid item>
          <Typography variant="h2">Users</Typography>
        </Grid>
      </Grid>

      <Grid container>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleDeactivateUser={handleDeactivateUser}
          />
        ))}
      </Grid>
    </>
  );
};

export default Users;
