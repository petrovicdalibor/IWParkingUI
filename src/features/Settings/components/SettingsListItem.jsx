import PropTypes from "prop-types";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const SettingsListItem = ({ item, handleDeleteItem }) => {
  const handleDelete = async () => {
    handleDeleteItem(item.id);
  };

  return (
    <>
      <ListItem
        sx={{
          borderRadius: "10px",
          ":hover": {
            background: "#F1F1F1",
          },
        }}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={item.name} />
      </ListItem>
      <Divider />
    </>
  );
};

SettingsListItem.propTypes = {
  item: PropTypes.object,
  handleDeleteItem: PropTypes.func,
};

export default SettingsListItem;
