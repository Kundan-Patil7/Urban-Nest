import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { Navbar, ProtectedRoute, ErrorFallback, Login } from "./components/index";

// Pages
import { Dashboard, List, Add, Update, Appointments } from "./pages/index";

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <>
                    <Navbar />
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <Dashboard />
                    </motion.div>
                  </>
                }
              />
              <Route
                path="/list"
                element={
                  <>
                    <Navbar />
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <List />
                    </motion.div>
                  </>
                }
              />
              <Route
                path="/add"
                element={
                  <>
                    <Navbar />
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <Add />
                    </motion.div>
                  </>
                }
              />
              <Route
                path="/update/:id"
                element={
                  <>
                    <Navbar />
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <Update />
                    </motion.div>
                  </>
                }
              />
              <Route
                path="/appointments"
                element={
                  <>
                    <Navbar />
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                      transition={{ duration: 0.3 }}
                    >
                      <Appointments />
                    </motion.div>
                  </>
                }
              />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnimatePresence>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,   // 3 seconds
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
