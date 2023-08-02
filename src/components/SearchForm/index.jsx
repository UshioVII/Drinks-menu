import { Form, Row, Col, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCategories } from "../../hooks/useCategories";
import { useDrinks } from "../../hooks/useDrinks";
import styles from "./SarchForm.module.css"
import Button from '@mui/material/Button';




export default function SearchForm() {
  const { categories } = useCategories();
  const { getDrink, loading } = useDrinks();


  const initialValues = {
    name: "",
    category: "",
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("El campo nombre es obligatorio"),
    category: Yup.string().required("Selecciona una categoria")
  })

  const handleSubmit = (values) => {
    getDrink(values)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >

      {
        (formik) => (
          <Form className={styles.formDrinks} onSubmit={formik.handleSubmit}>
            {
              formik.status && (
                <Alert variant="danger" className="text-danger">
                  {formik.status}
                </Alert>
              )
            }
            <Row>
              <Col md={6} className={styles.drinkNameSection}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name" className={styles.drinkName}>Nombre Bebebida</Form.Label>

                  <Field
                    id="name"
                    name="name"
                    type="text"
                    as={Form.Control}
                    placeholder="Ej: Tequila, Vodka, etc."
                  />
                  <ErrorMessage
                    name="name"
                    component={Form.Text}
                    className={styles.error}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className={styles.drinkCategoriesSection}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="category" className={styles.drinkCategories}>Categorías Bebidas</Form.Label>
                  <Field
                    id="category"
                    name="category"
                    as={Form.Select}
                    placeholder="Seleccione una bebida."
                  >
                    <option value="" disabled>Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option
                        key={category.strCategory}
                        value={category.strCategory}
                      >
                        {category.strCategory}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component={Form.Text}
                    className={styles.error}
                  />
                </Form.Group>

              </Col>
            </Row>
            <Row className="mt-3 mb-3 justify-content-end">
              <Col md="3">
                <Button
                  className={`${styles.searchingDrinkButton} btn bg-success text-light w-100`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar Bebidas"}
                </Button>
              </Col>  
            </Row>
          </Form>
        )
      }

    </Formik>
  )
}
