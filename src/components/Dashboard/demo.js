import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import logo from '../Images/logo.png'
import { Trans, useTranslation } from "react-i18next";
import Flag from 'react-flagkit'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#009dff',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#009dff'
  },
  toolbarInner: {
    backgroundColor: '#fff',
    marginLeft: '5%',
    marginRight: '5%',
    barginBottom: '10%',
    paddingBottom: '10%',
    borderRadius: '25px',

  },
  content: {
    flexGrow: 1,
    backgroundColor: '#009dff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',

  },
  logo: {
    width: 150,
    height: 80,
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  logOut: {
    position: 'absolute',
    bottom: '0',
    marginBottom: '5%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  dataCard: {
    marginTop: '10%',
    height: '60vh'
  },
  topText: {
  },
  mainContentWrapper: {
    height: '200',
    width: '200',
    backgroundColor: '#fff',
    borderRadius: '25px 25px 0 0',
    flex: '1',
  },
  mainContent: {
    margin: '5%'
  },
  Languages: {
    textAlign: 'center',

  },
  Language: {
    marginLeft: '2%',
    marginRight: '2%'
  },
}));


function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List className={classes.toolbarInner}>
        <div className={classes.Languages}>
          <Flag className={classes.Language} onClick={() => changeLanguage("de")} country="DE" />
          <Flag className={classes.Language} onClick={() => changeLanguage("hu")} country="HU" />
          <Flag className={classes.Language} onClick={() => changeLanguage("en")} country="US" />
        </div>
        {props.gridSelector}
        <ListItem>
          <ListItemText primary={t('Telephelyek')} />
        </ListItem>
        {props.locationItems}
        <ListItem className={classes.logOut} button onClick={props.handleLogout} >
          <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
          <ListItemText primary={t('Kijelentkezés')} />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>

            {t('Telephely')}:{props.SelectedLocationName}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            <img src={logo} alt="logo" className={classes.logo} />
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor='false'
            variant="permanent"
            open
          >
            <img src={logo} alt="logo" className={classes.logo} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.mainContentWrapper}>
          <div className={classes.mainContent}>
            <h1>{t('ATM')}</h1>
            {props.displayedData}
          </div>
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
