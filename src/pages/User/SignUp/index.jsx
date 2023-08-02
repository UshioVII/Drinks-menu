import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from "./SignUp.module.css";



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const { register } = useAuth()


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white" className={styles.titleR}>
            Registrarse
          </Typography>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: ""
            }}
            validate={(values) => {
              const errors = {};
              const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
              if (!values.name) {
                errors.name = "Se requiere el nombre";
              }
              if (!values.email) {
                errors.email = "Se requiere el correo electrónico";
              } else if (!regexEmail.test(values.email)) {
                errors.email = "Dirección de correo electrónico inválida";
              }
              if (!values.password) {
                errors.password = "Se requiere la contraseña";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              register(values);

              setSubmitting(false);
            }}
          >

            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }} className={styles.formSignUp}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      name="name"
                      label="Nombre"
                      type="text"
                      id="name"

                      className={styles.name}

                      autoFocus
                      fullWidth
                      value={values.name}

                      error={errors.name && touched.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      name="email"
                      label="Email"
                      type="email"
                      id="email"

                      className={styles.email}

                      fullWidth
                      value={values.email}
                      error={errors.email && touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"

                      className={styles.password}

                      fullWidth
                      value={values.password}
                      
                      error={errors.password && touched.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.password && touched.password && errors.password}

                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={styles.signUpButton}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Registrarse
                </Button>
                <Grid container justifyContent="flex-end" className={styles.linkLogin}>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}