import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { RoutesComponent } from "./router/Routes/index"

const App: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default App
