import { SnackbarProvider } from "notistack";

const SnackbarApp = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      autoHideDuration={3200}
      preventDuplicate
      dense
      anchorOrigin={{
        vertical: "top",

        horizontal: "right",
      }}
      style={{
        fontWeight: 600,

        borderRadius: "14px",
      }}
      classes={{
        variantSuccess: "snackbar-success",

        variantError: "snackbar-error",

        variantWarning: "snackbar-warning",

        variantInfo: "snackbar-info",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarApp;
