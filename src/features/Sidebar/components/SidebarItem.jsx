import { Box, ButtonBase } from "@mui/material";
import PropTypes from "prop-types";

export const SidebarItem = ({
  active = false,
  external,
  icon,
  path,
  title,
}) => {
  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          // TODO: Change to Link when implementing react-router
          component: "a",
          href: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "10px",
          textAlign: "left",
          width: "100%",
          "&:hover": {
            color: "primary.main",
          },
          ...(active && {
            color: "primary.main",
          }),
          transition: (theme) =>
            theme.transitions.create(["color", "color"], {
              duration: theme.transitions.duration.shorter,
            }),
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "primary",
              display: "inline-flex",
              justifyContent: "center",
              mr: 3,
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "primary",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            // visibility: open ? "visible" : "hidden",
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SidebarItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
