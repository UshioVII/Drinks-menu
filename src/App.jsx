import { CategoriesProvider } from "./context/CategoriesProvider"
import MainLayout from "./layout"
import AppRoutes from "./routes"

function App() {
  return (
    <CategoriesProvider>
        <MainLayout>
          <AppRoutes/>
        </MainLayout>
    </CategoriesProvider>
  )
}

export default App
