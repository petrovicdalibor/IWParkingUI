import { Grid, Typography } from "@mui/material";
import UserCard from "../features/Users/components/UserCard";
import { useEffect, useState } from "react";
import useAuth from "../common/hooks/useAuth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { fetchAllUsers, deactivateUser } = useAuth();

  useEffect(() => {
    fetchAllUsers().then((res) => setUsers(res.data.users));
  }, []);

  const handleDeactivateUser = (userId) => {
    deactivateUser(userId);
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
