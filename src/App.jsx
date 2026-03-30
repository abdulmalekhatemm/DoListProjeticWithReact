import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./context/ToastContext";
import TodosProvider from "./context/todosContexts";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria", "Roboto", "Arial"].join(","),
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              direction: "rtl",
              padding: "20px 0",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;