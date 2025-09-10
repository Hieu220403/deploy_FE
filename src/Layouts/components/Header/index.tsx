import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import logo from "~/assets/images/logo.png";

import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { pages, settings } from "~/constants";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import { clearAuth } from "~/redux/features/auth/actions";
import { RoleType } from "~/types/common";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleClickMenu = (link: string | undefined) => () => {
    if (!link) {
      dispatch(clearAuth());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
    navigate(link!);
    handleCloseUserMenu();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const SearchBox = (
    <Box
      sx={(theme) => ({
        position: "relative",
        borderRadius: "8px",
        backgroundColor: theme.palette.common.white,
        border: "1px solid #d1d5db",
        width: "100%",
        maxWidth: { xs: "100%", md: "400px" },
      })}
    >
      <Box
        sx={(theme) => ({
          padding: theme.spacing(0, 2),
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <SearchIcon color="action" />
      </Box>
      <InputBase
        placeholder="Tìm kiếm nhà hàng..."
        inputProps={{ "aria-label": "search" }}
        sx={(theme) => ({
          "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
          },
        })}
      />
    </Box>
  );

  const drawer = (
    <Box
      sx={{ width: 250, zIndex: 2 }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <img src={logo} alt="Logo" className="mx-auto h-10 w-10" />
      </Box>
      <List>
        {pages
          .filter((item) => {
            if (user?.role.role_id === RoleType.Admin) return item;
            return item.link !== "/admin/restaurants";
          })
          .map((page) => {
            const isActive = currentPath === page.link;
            return (
              <ListItem key={page.link} disablePadding>
                <Link
                  to={page.link}
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <ListItemButton selected={isActive}>
                    <ListItemText
                      primary={page.name}
                      primaryTypographyProps={{
                        fontWeight: isActive ? "bold" : "normal",
                        color: isActive ? "primary.main" : "inherit",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        {!user && (
          <>
            <ListItem>
              <Link
                to={"/sign-in"}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: "bold", width: "100%" }}
                >
                  Đăng nhập
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/sign-up"}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontWeight: "bold", width: "100%" }}
                >
                  Đăng ký
                </Button>
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        top: 0,
        zIndex: 1,
        boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
        borderBottom: "1px solid #e5e7eb",
        color: "black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Mobile layout */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Menu icon (open Drawer) */}
            <IconButton
              size="large"
              aria-label="open nav drawer"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Link to={"/"}>
              <img src={logo} alt="Logo" className="h-10 w-10 cursor-pointer" />
            </Link>

            {/* Avatar */}
            {user ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Đăng ký
                  </Button>
                </Link>
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={handleClickMenu(setting?.link)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop layout */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="h-10 w-10 cursor-pointer" />
            </Link>

            {/* Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                ml: 3,
                justifyContent: "center",
                gap: 2,
              }}
            >
              {pages.map((page) => {
                const isActive = currentPath === page.link;
                return (
                  <Link
                    to={page.link}
                    key={page.link}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{
                        my: 2,
                        display: "block",
                        fontWeight: "bold",
                        color: isActive ? "primary.main" : "black",
                        borderBottom: isActive ? "2px solid" : "none",
                        borderRadius: 0,
                        borderColor: "primary.main",
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                );
              })}
            </Box>

            {/* Search box */}
            {SearchBox}

            {/* Avatar */}
            {user ? (
              <Box sx={{ flexGrow: 0, ml: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Đăng ký
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>

        {/* Mobile search bar dưới AppBar */}
        <Box sx={{ display: { xs: "block", md: "none" }, py: 1 }}>
          {SearchBox}
        </Box>
      </Container>

      {/* Drawer for mobile sidebar */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
