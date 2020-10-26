import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo from '../Images/logo.png'
import vtalogo from '../Images/vtalogo.png'
import { Trans, useTranslation } from "react-i18next";
import Flag from 'react-flagkit'


const useStyles = makeStyles((theme) => ({
  paper: {
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  },
  avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  },
  form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
  },
  submit: {
  margin: theme.spacing(3, 0, 2),
  },
  bg : {
    flexGrow: 1,
    background: 'linear-gradient(0deg, rgba(23,76,128,1) 0%, rgba(0,157,255,1) 51%)',
    height:'100vh',
  },
  formBg: {
    backgroundColor: '#fff',
    paddingTop: '2%',
    paddingBottom: '2%',
    borderRadius: '25px 25px 0px 0px',
    position: 'absolute',
    bottom:'0',
    width: '100%'
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '5%',
  },
  textInputStyle : {
    borderRadius: '50px'
  },
  topText : {
    textAlign: 'center'
  },
  Languages: {
    textAlign: 'center'
  },
  Language: {
    marginLeft: '2%',
    marginRight: '2%'   
  },
}))

function Login(props){
  const classes = useStyles()
  const theme = useTheme()
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

return (
<div className={classes.bg} >
<img src={logo} alt="logo" className={classes.logo} />
<img src={vtalogo} alt="logo" className={classes.logo} />
  <div className={classes.formBg}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <p className={classes.topText} >{t('TopText')}</p>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        {t('Bejelentkezés')}
        </Typography>
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="email"
            label={t('Felhasználónév')}
            name="username"
            value={props.username}
            onChange={props.handleChange}
            autoFocus
            InputProps={{ style: {
              borderRadius: '50px'
            } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            value={props.password}
            onChange={props.handleChange}
            label={t('Jelszó')}
            id="password"
            autoComplete="current-password"
            InputProps={{ style: {
              borderRadius: '50px',
            } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ borderRadius: 25 }}
          >
           {t('Bejelentkezés')}
          </Button>
        </form>
      </div>
      <Box mt={3}>
        <div className={classes.Languages}>
        <Flag className={classes.Language} onClick={() => changeLanguage("de")} country="DE" />
        <Flag className={classes.Language} onClick={() => changeLanguage("hu")} country="HU" />
        <Flag className={classes.Language} onClick={() => changeLanguage("en")} country="US" />
        </div>
      </Box>
    </Container>
  </div>
</div>
 
        )

}
export default Login;