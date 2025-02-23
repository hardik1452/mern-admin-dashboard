import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.jpg";
import FlexBetween from "./FlexBetween";

const navItems = [
  { id: 1, text: "Dashboard", icon: <HomeOutlined /> },
  { id: 2, text: "Client Facing", icon: null },
  { id: 3, text: "Products", icon: <ShoppingCartOutlined /> },
  { id: 4, text: "Customers", icon: <Groups2Outlined /> },
  { id: 5, text: "Transactions", icon: <ReceiptLongOutlined /> },
  { id: 6, text: "Geography", icon: <PublicOutlined /> },
  { id: 7, text: "Sales", icon: null },
  { id: 8, text: "Overview", icon: <PointOfSaleOutlined /> },
  { id: 9, text: "Daily", icon: <TodayOutlined /> },
  { id: 10, text: "Monthly", icon: <CalendarMonthOutlined /> },
  { id: 11, text: "Breakdown", icon: <PieChartOutlined /> },
  { id: 12, text: "Management", icon: null },
  { id: 13, text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { id: 14, text: "Performance", icon: <TrendingUpOutlined /> },
];

const Sidebar = ({
  user,
  isNonMobile,
  drawerWidth,
  setIsSideBarOpen,
  isSideBarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ id, text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={id} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lctext = text.toLowerCase();
                return (
                  <ListItem key={id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`${lctext}`);
                        setActive(lctext);
                      }}
                      sx={{
                        backgroundColor:
                          active === lctext
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lctext
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lctext
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lctext && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" m="1.5rem 2rem 0 3rem" gap="1rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                width="40px"
                height="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
